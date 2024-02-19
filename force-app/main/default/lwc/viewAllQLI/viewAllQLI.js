import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllQuoteLineItem from '@salesforce/apex/addProduct.getAllQuoteLineItem';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress'
import deleteQuoteLineItem from '@salesforce/apex/addProduct.deleteQuoteLineItem'
import getRecordType from '@salesforce/apex/addProduct.getRecordType'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RelatedListParts extends LightningElement {
    @api recordId;
    data;
    @track quoteLineId = '';
    res;
    customer;
    platform;
    buyer;
    eop;
    sop;
    oem;
    @track showEdit = false;
    @track showNonSpacCopy = false;
    @track showSpacCopy = false;
    @track isShowModal = false;
    deleteQLI = false;
    openProcessRouting = false;
    openPartCosting = false;
    Status;
    Probability;
    Start_Date;
    End_Date;
    Sample_Lead_Time;
    Production_Lead_Time;
    Report;
    Notes;
    Part_Type;
    Customer_Part;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log('currentPage ===>>' + JSON.stringify(currentPageReference));
            this.recordId = currentPageReference.attributes.recordId;
            console.log('recordId ' + this.recordId)
        }
    }
    connectedCallback() {
    
        if (this.recordId) {
            getAllQuoteLineItem({ recordId: this.recordId })
                .then(data => {
                    this.data = data;
                    this.error = undefined;
                    console.log('this.data' + JSON.stringify(this.data));


                })
                .catch(error => {
                    this.error = error;
                    console.log(this.error);
                })

            getQuoteExpress({ recordId: this.recordId })
                .then(res => {
                    this.res = res;
                    if (res[0].Customer__c) {
                        this.customer = res[0].Customer__c;
                    }
                    if (res[0].Platform__c) {
                        this.platform = res[0].Platform__c;
                    }
                    if (res[0].Buyer_POC__c) {
                        this.buyer = res[0].Buyer_POC__c;
                    }
                    if (res[0].EOP__c) {
                        this.eop = res[0].EOP__c;
                    }
                    if (res[0].SOP__c) {
                        this.sop = res[0].SOP__c;
                    }
                    if (res[0].OEM__c) {
                        this.oem = res[0].OEM__c;
                    }
                    this.error = undefined;
                })
                .catch(err => {
                    this.res = undefined;
                    this.error = err;
                    console.log(err);
                })
        }
    }
    handleStatusChange(event){
    this.Status = event.target.value;
    }
    handleProbabilityChange(event){
        this.Probability = event.target.value;
    }
    handleStartDateChange(event){
        this.Start_Date = event.target.value;
    }
    handleEndDateChange(event){
        this.End_Date = event.target.value;
    }
    handleSampleLeadChange(event){
        this.Sample_Lead_Time = event.target.value;
    }
    handleProductionTimeChange(event){
        this.Production_Lead_Time = event.target.value;
    }
    handleReportChange(event){
        this.Report = event.target.value;
    }
    handleNotesChange(event){
        this.Notes = event.target.value;
    }
    handleEdit(event) {
        this.showEdit = true;
        console.log('edit2 ' + event.target.dataset.id)
        this.quoteLineId = event.target.dataset.id;
    }
    closeModal() {
        this.showEdit = false;
        this.deleteQLI = false;
        this.showNonSpacCopy = false;
        this.showSpacCopy = false;
    }
  
    handleCopy(event) {
        console.log('inside copy')
       // this.showCopy = true;
        this.quoteLineId = event.target.dataset.id;
        getRecordType({qliId : this.quoteLineId})
        .then(res =>{
            console.log('res '+JSON.stringify(res));
            console.log('RecordType.Name '+res.RecordType.Name);
            if(res.RecordType.Name == 'Non SPAC'){
                this.showNonSpacCopy = true;
            }
            if(res.RecordType.Name == 'SPAC'){
                this.showSpacCopy = true;
            }
        })
        .catch(err=>{
            this.error = err;
        })

    }
    handleDelete(event) {
        this.deleteQLI = true;
        this.quoteLineId = event.target.dataset.id;
    }
    handleYes() {
        deleteQuoteLineItem({ qliId: this.quoteLineId })
            .then(res => {
                const toast = new ShowToastEvent({
                    variant: 'success',
                    title: 'Success!',
                    message: 'Quote Line Item deleted successfully',
                    mode: 'dismissable'
                });
                this.dispatchEvent(toast);
                window.location.replace('/' + this.recordId);
            })
            .catch(err => {
                console.log(err);
            })

    }
    handleReturn(){
        window.location.replace('/' + this.recordId);
    }
    handleProcessRouting() {
        console.log('process====');
        console.log('line 113==' + this.openProcessRouting);
        this.openProcessRouting = true;
        
        
    }

    handlePartCosting(){
        this.openPartCosting = true;
    }
    handleiconmodal(event){
    
        this.quoteLineId = event.target.dataset.id;
        this.isShowModal = true;
         
    }  
    hideModalBox(event){
        this.isShowModal = false;

    }
    handleSuccess(event) {
    console.log(event.detail.id);
    this.quoteLineId = event.detail.id;
    if(this.quoteLineId){
        const toast = new ShowToastEvent({
        variant: 'success',
        title: 'Success!',
       // message:'Quote Line Item added successfully',
        mode: 'dismissable'
    });
    this.dispatchEvent(toast);
    this.spinner = false;
    window.location.replace('/'+this.recordId);
    }
    }
handleSubmit(event){
    this.spinner = true; 
    }
handleError(event) {    
    console.log('OUTPUT => ', JSON.stringify(event.detail));
    this.spinner = false;
}
}