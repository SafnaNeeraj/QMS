import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getQuoteExpressDetails from '@salesforce/apex/spacController.getQuoteExpressDetails';
import getProcessRouting from '@salesforce/apex/spacController.getProcessRouting';
import operationValue from '@salesforce/label/c.operationValue';
import suppliervalues from '@salesforce/label/c.suppliervalues';
import workCenter from '@salesforce/label/c.workCenter';
import updaterecords from '@salesforce/apex/spacController.updaterecordsProcessRouting';
import deleterecords from '@salesforce/apex/spacController.deleterecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
	
export default class routingprocess extends LightningElement {
 @api tempvalue;
 spinnerStatus;
 @track recordId;
 @track routeData=[];
 @api isModalOpen1=false;
 @track tdata=[];
 @track customer;
 @track buyer;
 @track platform;
 @track oem;
 @track sop;
 @track eop;
 @track operationlist=[];
 @track workCenterList=[];
 @track supplierList=[];
@track operationValueList = [];
@track supplervaluelist=[];
@track workCenterValueList=[];
@api quotelineitem = '';
 


    connectedCallback() {
          console.log('quotelineitem',this.quotelineitem);
this.isModalOpen1=true;
         console.log('l21==' + window.location);
         console.log('l21==operationValue' + operationValue);
this.operationlist = operationValue.split(",");
 console.log('this.operationlist ==' +this.operationlist );
 for(var i=0;i<this.operationlist.length;i++){
     this.operationValueList.push({label:this.operationlist[i],value:this.operationlist[i] });
 }

 this.workCenterList=workCenter.split(",");
  for(var i=0;i<this.workCenterList.length;i++){
     this.workCenterValueList.push({label:this.workCenterList[i],value:this.workCenterList[i] });
 }
this.supplierList=suppliervalues.split(",");
 for(var i=0;i<this.supplierList.length;i++){
     this.supplervaluelist.push({label:this.supplierList[i],value:this.supplierList[i] });
     console.log('tthis.supplervaluelist ==' +JSON.stringify(this.supplervaluelist));
 }



         var wUrl = window.location.href;
         console.log('wUrl---',wUrl);
         var urlStateParameters =wUrl.split('Quote_Express__c/');
          console.log('---this.urlStateParameters--',wUrl.split('Quote_Express__c/'));
         console.log('---this.urlStateParameters--',urlStateParameters);  
         var urlIDValue = urlStateParameters[1];
          console.log('---urlIDValues--',urlIDValue);  
          urlIDValue = urlIDValue.split('/');
          var urlId = urlIDValue[0];
          console.log('---this.urlId--', urlId);   
this.recordId= urlId;
        console.log('line 193==' + this.recordId);
         getQuoteExpressDetails({ recordId: this.recordId })
            .then(result => {
                this.data = result;
                console.log('result==>' + JSON.stringify(result));
                if (result[0].Customer__c) {
                    this.customer = result[0].Customer__c;
                }
                if (result[0].Platform__c) {
                    this.platform = result[0].Platform__c;
                }
                if (result[0].Buyer_POC__c) {
                    this.buyer = result[0].Buyer_POC__c;
                }
                if (result[0].EOP__c) {
                    this.eop = result[0].EOP__c;
                }
                if (result[0].SOP__c) {
                    this.sop = result[0].SOP__c;
                }
                if (result[0].OEM__c) {
                    this.oem = result[0].OEM__c;
                }
                if (result[0].Name) {
                    this.quoteExp = result[0].Name;
                }

            })
            .catch(error => {
                console.log('eror line 218' + JSON.stringify(error));
            })
           
    }
@track processdata = [];
  @track arraydata = [];
 @wire(getProcessRouting,{quotelineid: "$quotelineitem"})
    routeData(result) {
        //alert('Shubham');
  this.spinnerStatus = true;
        if (result.data) {
            this.spinnerStatus = false;
            this.tdata = result.data;
           console.log('@@@@@@ tdata.tdata'+ JSON.stringify(this.tdata));
           console.log('@@@@@@ this.tdata.length'+ this.tdata.length);
           if(this.tdata.length <=0){
               this.addRow();
           }
           for(let i = 0; i < this.tdata.length; i++) {
                let pr = {};
                pr={
                    Id : this.tdata[i].Id,
                    Operation__c : this.tdata[i].Operation__c,
                    Work_Center__c : this.tdata[i].Work_Center__c,
                    Supplier__c : this.tdata[i].Supplier__c,
                    Outside_Cost_CAD__c : this.tdata[i].Outside_Cost_CAD__c,
                   
                    Rate_Pcs_hr__c : this.tdata[i].Rate_Pcs_hr__c,
                    Direct_Labour_Cost__c : this.tdata[i].Direct_Labour_Cost__c,
                    Variable_Cost__c : this.tdata[i].Variable_Cost__c,
                    Overhead_Cost_CAD__c : this.tdata[i].Overhead_Cost_CAD__c
                }
                    this.processdata.push(pr);  
        }
         for(let i = 0; i < this.processdata.length; i++) {
             if(this.processdata[i].Operation__c != null && this.processdata[i].Supplier__c != null && this.processdata[i].Work_Center__c != null){
                 if(this.processdata[i].Outside_Cost_CAD__c == null)
                 this.processdata[i].Outside_Cost_CAD__c = 123;
                  if(this.processdata[i].Rate_Pcs_hr__c == null)
                 this.processdata[i].Rate_Pcs_hr__c = '123';
                  if(this.processdata[i].Direct_Labour_Cost__c == null)
                 this.processdata[i].Direct_Labour_Cost__c = '123';
                  if(this.processdata[i].Variable_Cost__c == null)
                 this.processdata[i].Variable_Cost__c = '123';
                 if(this.processdata[i].Overhead_Cost_CAD__c == null)
                 this.processdata[i].Overhead_Cost_CAD__c = '2347';
             }
                
        }
            
 
        } else if (result.error) {
            this.tdata = undefined;
        }
    };

handleDelete(event){
 console.log('@@@@@@itemIndex---'+event.currentTarget.dataset.id);
    console.log('@@@@@@selname---'+event.target.name);

     deleterecords({ processrecordid : event.target.name })
		.then(result => {
            console.log(' result------',result);
           
			let message = result;
             console.log(' message-----testing',message);
        const evt = new ShowToastEvent({
            title: 'Success!',
            message: 'Record deleted Successfully',
            variant: 'Success',
           
        });
        this.dispatchEvent(evt);
		this.isModalOpen1 = false;	
         const selectedEvent = new CustomEvent("modalchange", {
      detail: this.isModalOpen1
    });
 
    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
		})
		.catch(error => {
             console.log('-----error-------',error);
			this.error = error;
             console.log(' message-----testing',message);
        const evt = new ShowToastEvent({
            title: 'Error!',
            message: 'Record Not Deleted',
            variant: 'Error',
           
        });
        this.dispatchEvent(evt);
		
		})
        window.location.reload();
}

handleChange(event){
    console.log('@@@@@@ data before push 123---'+ JSON.stringify(this.processdata));
    console.log('@@@@@@selValue---'+event.detail.value);
    const itemIndex = event.currentTarget.dataset.id;
    console.log('@@@@@@itemIndex---'+event.currentTarget.dataset.id);
    console.log('@@@@@@selname---'+event.target.name);
    console.log('@@@@@@sellabel---'+event.target.label);
    let iddata = event.target.name;
   let labeldata = event.target.label;
    let valuedata= event.detail.value;
  if(this.processdata){
        this.processdata.forEach((row) =>{
            if(iddata == row.Id){
               if(labeldata == 'Operator'){
                    this.processdata[itemIndex].Operation__c = valuedata;
               }
                if(labeldata == 'Supplier'){
                 this.processdata[itemIndex].Supplier__c = valuedata;
               }
                if(labeldata == 'WorkCenter'){
                  this.processdata[itemIndex].Work_Center__c = valuedata;
               }
               if(labeldata == 'Outside'){
                  this.processdata[itemIndex].Outside_Cost_CAD__c = valuedata;
               }
               if(labeldata == 'Rate'){
                  this.processdata[itemIndex].Rate_Pcs_hr__c = valuedata;
               }
               if(labeldata == 'Direct'){
                  this.processdata[itemIndex].Direct_Labour_Cost__c = valuedata;
               }
               if(labeldata == 'Variable'){
                  this.processdata[itemIndex].Variable_Cost__c = valuedata;
               }
               if(labeldata == 'Overhead'){
                  this.processdata[itemIndex].Overhead_Cost_CAD__c = valuedata;
               }
               
      }
             
            
        })
    }

    for(let i = 0; i < this.processdata.length; i++) {
             if(this.processdata[i].Operation__c != null && this.processdata[i].Supplier__c != null && this.processdata[i].Work_Center__c != null){
                 if(this.processdata[i].Outside_Cost_CAD__c == null)
                 this.processdata[i].Outside_Cost_CAD__c = 123;
                  if(this.processdata[i].Rate_Pcs_hr__c == null)
                 this.processdata[i].Rate_Pcs_hr__c = '123';
                  if(this.processdata[i].Direct_Labour_Cost__c == null)
                 this.processdata[i].Direct_Labour_Cost__c = '123';
                  if(this.processdata[i].Variable_Cost__c == null)
                 this.processdata[i].Variable_Cost__c = '123';
                 if(this.processdata[i].Overhead_Cost_CAD__c == null)
                 this.processdata[i].Overhead_Cost_CAD__c = '123';
             }
                
        }
 
console.log('@@@@@@ data after push 130---'+ JSON.stringify(this.processdata));
}
 
handleupdate(){
    console.log(' this.processdata-----testingbefoeupdate',JSON.stringify(this.processdata));
    console.log(' this.processdata-----testing',this.processdata.length);
   
    updaterecords({ recordtablelist: this.processdata, quoteid: this.recordId, quotelineid: this.quotelineitem})
		.then(result => {
			this.processdata = result;
             console.log(' this.processdata-----testing',this.processdata.length);
         console.log(' this.processdata-----testafterupdate',JSON.stringify(this.processdata));
           const evt = new ShowToastEvent({
            title: 'Success!',
            message: 'Record updated Successfully',
            variant: 'Success',
           
        });
        this.dispatchEvent(evt);
		this.isModalOpen1 = false;	
         const selectedEvent = new CustomEvent("modalchange", {
      detail: this.isModalOpen1
    });
 
    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
		})
		.catch(error => {
			this.error = error;
              const evt = new ShowToastEvent({
            title: 'Error!',
            message: 'Record Not Updated',
            variant: 'Error',
           
        });
        this.dispatchEvent(evt);
		
		})

}

 closeModal1() {
        this.isModalOpen1 = false;
 // Creates the event with the data.
    const selectedEvent = new CustomEvent("modalchange", {
      detail: this.isModalOpen1
    });
 
    // Dispatches the event.
    this.dispatchEvent(selectedEvent);

    }
    submitDetails1() {
        this.handleupdate();
       // this.isModalOpen1 = false;
        //const selectedEvent = new CustomEvent("modalchange", {
      //detail: this.isModalOpen1
    //});
 
    // Dispatches the event.
   // this.dispatchEvent(selectedEvent);
   window.location.reload();
    }
addRow(){
    console.log('@@@@@@ processdata----'+ this.processdata.length);
    console.log('@@@@@@ data before push'+ JSON.stringify(this.processdata));
      let newsObject = { 'Id' : '' };
   this.processdata = [ ...this.processdata, newsObject ];



console.log('@@@@@@ processdata------'+ this.processdata.length);
           console.log('@@@@@@ processdata-------'+ JSON.stringify(this.processdata));
}


    

}