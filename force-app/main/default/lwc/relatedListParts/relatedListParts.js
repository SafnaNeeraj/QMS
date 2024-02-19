import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getQuoteLineItem from '@salesforce/apex/addProduct.getQuoteLineItem';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress'
import deleteQuoteLineItem from '@salesforce/apex/addProduct.deleteQuoteLineItem'
import getRecordType from '@salesforce/apex/addProduct.getRecordType'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import relatedListMessageChannel from '@salesforce/messageChannel/relatedListMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService'

export default class RelatedListParts extends LightningElement {

    @api recordId;
    data;
    @track quoteLineId = '';
    @track recordType = '';
    editSpac=false;
    editNonSpac = false;
    disableReport = false;
    res;
    customer;
    platform;
    buyer;
    eop;
    sop;
    oem;
    
    quotelineitemsid;
    @track isShowModal = false;
    @track showEdit = false;
    @track showNonSpacCopy = false;
    @track showSpacCopy = false;
    deleteQLI = false;
    viewAll = false;
    @api openProcessRouting = false;
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
            console.log('currentPage ' + JSON.stringify(currentPageReference));
            this.recordId = currentPageReference.attributes.recordId;
            console.log('recordId ' + this.recordId)
        }
    }
    @wire(MessageContext)
    messageContext;
    message;
    connectedCallback() {

        if (this.recordId) {
            getQuoteLineItem({ recordId: this.recordId })
                .then(data => {
                    this.data = data;
                    this.error = undefined;
                    console.log('oooo');
                    console.log('this.data' + JSON.stringify(this.data));
                    console.log('--hi this is---'+this.data[0].RecordType.Name);
                     if(this.data[0].RecordType.Name){
                      this.recordType = this.data[0].RecordType.Name;
                      this.Part_Type = this.data[0].RecordType.Name;
                     }
                      if(this.data[0].Status__c)
                      this.Status = this.data[0].Status__c;

                      if(this.data[0].Probability__c)
                      this.Probability = this.data[0].Probability__c;

                      if(this.data[0].Start_Date__c)
                      this.Start_Date = this.data[0].Start_Date__c;

                      if(this.data[0].End_Date__c)
                      this.End_Date = this.data[0].End_Date__c;

                      if(this.data[0].Sample_Lead_Time__c)
                      this.Sample_Lead_Time = this.data[0].Sample_Lead_Time__c;

                      if(this.data[0].Production_Lead_Time__c)
                      this.Production_Lead_Time = this.data[0].Production_Lead_Time__c;

                      if(this.data[0].Report__c)
                      this.Report = this.data[0].Report__c;
                      
                      if(this.Report == 'No')
                      this.disableReport = true;

                      if(this.data[0].Notes__c)
                      this.Notes = this.data[0].Notes__c;

                       if(this.data[0].Customer_Part__c)
                      this.Customer_Part = this.data[0].Customer_Part__c;


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
        this.quoteLineId = event.target.dataset.id;
        console.log("line 161 "+this.quoteLineId);
        getRecordType({ qliId: this.quoteLineId })
            .then(res => {
                console.log('res ' + JSON.stringify(res));
                console.log('RecordType.Name ' + res.RecordType.Name);
                this.recordType = res.RecordType.Name;
                this.showEdit = true;
                console.log('edit2 ' +  this.quoteLineId)
                if(res.RecordType.Name == 'SPAC'){
                    this.editSpac = true;
                    this.editNonSpac = false;
                    console.log("this.editSpac "+this.editSpac)
                }else{
                    this.editNonSpac = true;
                     this.editSpac = false;
                    console.log("this.editNonSpac "+this.editNonSpac);
                }

            })
            .catch(err => {
                this.error = err;
            })


    }
    closeModal() {
        this.showEdit = false;
        this.deleteQLI = false;
        this.viewAll = false;
        this.showNonSpacCopy = false;
        this.showSpacCopy = false;
    }
    handleiconmodal(event){
        console.log('hi----',this.isShowModal);
        this.quoteLineId = event.target.dataset.id;
        console.log( event.target.dataset.id); 
        this.isShowModal = true;
         console.log('bye---',this.isShowModal);
    }
    handleCopy(event) {
        console.log('inside copy')
        // this.showCopy = true;
        this.quoteLineId = event.target.dataset.id;
        getRecordType({ qliId: this.quoteLineId })
            .then(res => {
                console.log('res ' + JSON.stringify(res));
                console.log('RecordType.Name ' + res.RecordType.Name);
                if (res.RecordType.Name == 'Non SPAC') {
                    this.showNonSpacCopy = true;
                }
                if (res.RecordType.Name == 'SPAC') {
                    this.showSpacCopy = true;
                }
            })
            .catch(err => {
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
    handleViewAll(event) {
        this.viewAll = true;
    }
    hideModalBox(){
        this.isShowModal = false;
    }
    handleProcessRouting(event) {
        console.log('process====',event.currentTarget.dataset.id);
        this.quotelineitemsid = event.currentTarget.dataset.id;
        console.log('line 113==quotelineitemsid' + this.quotelineitemsid);
        this.openProcessRouting = true;


    }

    handlePartCosting() {
        this.openPartCosting = true;
    }

    hanldeModalchange(event) {
        console.log('@@@@+even' + event.detail);
        this.openProcessRouting = event.detail;

    }
    handleSuccess(event) {
    console.log(event.detail.id);
    this.quoteLineId = event.detail.id;
    if(this.quoteLineId){
        const toast = new ShowToastEvent({
        variant: 'success',
        title: 'Success!',
        message:'Quote Line Item added successfully',
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