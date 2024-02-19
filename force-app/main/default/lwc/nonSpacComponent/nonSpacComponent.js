import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress';
import getPartCosting from '@salesforce/apex/addProduct.getPartCosting';
import getRecordTypeId from '@salesforce/apex/addProduct.getRecordTypeId'
import getQLI from '@salesforce/apex/addProduct.getQLI';
export default class NonSpacComponent extends LightningElement {
    @api recordId;
    @track data;
    @track result;
    @track error;
    @track getValue;
    @api recordType;
    @api editNonSpac;
    varRecordType;
    spinner = false;
    @api quoteLineId;
    @api copy;
    customer;
    platform;
    buyer;
    eop;
    sop;
    oem;
    automotiveValue;
    value = '';
    partsValue;
    annualValue;
    annualUsage;
    targetPrice;
    costValue;
    disabled = true;
    alternateProp;
    RevDate;
    Rev;
    partDesc;
    notes;
    reasons;
    customerPart;
    customerDrawing;
    customerRev;
    customerDate;
    partDesc;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log(currentPageReference);
            this.recordId = currentPageReference.state.recordId;
            if (this.recordId == null) {
                this.recordId = currentPageReference.attributes.recordId;
                console.log('rec---', this.recordId);
            }
        }
    }


    connectedCallback() {
        if (this.recordId) {
            getQuoteExpress({ recordId: this.recordId })
                .then(res => {
                    this.data = res;
                    console.log('res ' + JSON.stringify(res))
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
                    if (res[0].Automotive_Programs__c) {
                        this.automotiveValue = res[0].Automotive_Programs__c;
                    }
                    this.error = undefined;
                })
                .catch(err => {
                    this.data = undefined;
                    this.error = err;
                    console.log(err);
                })


            getPartCosting({ recordId: this.recordId })
                .then(res => {
                    console.log('partCosting ' + JSON.stringify(res))
                    if (res[0].Sub_Total_Cost_USD__c) {
                        this.costValue = res[0].Sub_Total_Cost_USD__c;
                    }
                })
                .catch(err => {
                    this.data = undefined;
                    this.error = err;
                    console.log(err);
                })
        }
        if (this.recordType) {
            console.log('line 73 ' + this.recordType)

            if (this.recordType == 'Non SPAC') {
                this.varRecordType = 'Non_SPAC';
            }
            else {
                this.varRecordType = 'SPAC';
            }
            console.log(this.varRecordType)
            getRecordTypeId({ recordType: this.varRecordType })
                .then(res => {
                    this.getValue = res;
                    console.log('this.getValue ' + this.getValue)
                })
                .catch(err => {
                    console.log('error occured 73 ' + err);
                })
        }
        if (this.quoteLineId){
            console.log('this.quoteLineId '+this.quoteLineId)
            getQLI({ recordId: this.quoteLineId })
                .then(data =>{
                    this.result = data;
                    this.err = undefined
                    console.log('data ' + JSON.stringify(data));
                    console.log('piece--c '+data[0].Piece__c);
                    if(data[0].Piece__c){ 
                        this.value = data[0].Piece__c;
                    }
                    if(data[0].Est_Annual_Usage__c){
                        this.value = data[0].Est_Annual_Usage__c;
                    }
                })
                .catch(error => {
                    this.err = error;
                    console.log(this.error);
                })

        }
    }
        @track manufactrue;
        @track buytrue;
        @track buyprotrue;
        handleManufac(event) {
            console.log('click manu---', event.target.value);
            if (event.target.value == true) {
                this.manufactrue = true;
                this.buytrue = false;
                this.buyprotrue = false;
            }
            else {
                this.manufactrue = false;
            }
        }
        handleBuy(event) {
            console.log('click buy---', event.target.value);
            if (event.target.value == true) {
                this.buytrue = true;
                this.manufactrue = false;
                this.buyprotrue = false;
            }
            else {
                this.buytrue = false;
            }
        }
        handleBuypro(event) {
            console.log('click buypro---', event.target.value);
            if (event.target.value == true) {
                this.buyprotrue = true;
                this.buytrue = false;
                this.manufactrue = false;
            }
            else {
                this.buyprotrue = false;
            }
        }
        @track customertrue;
        @track proposaltrue;
        @track feasibletrue;
        @track Same_as__c;
        @track Completely_New_Design__c;
        @track Partially_Close_to__c;

        handleCompletely(event) {
            this.Same_as__c = false;
            this.Partially_Close_to__c = false;
            this.Completely_New_Design__c = event.target.value;
        }
        handlePartially(event) {
            this.Same_as__c = false;
            this.Partially_Close_to__c = event.target.value;
            this.Completely_New_Design__c = false;

        }
        handleSame(event) {
            this.Same_as__c = event.target.value;
            this.Partially_Close_to__c = false;
            this.Completely_New_Design__c = false;
        }

        handleCustomer(event) {
            console.log('click customer---', event.target.value);
            if (event.target.value == true) {
                this.customertrue = true;
                this.proposaltrue = false;
                this.feasibletrue = false;
                this.alternateProp = '';
                this.Rev = '';
                this.RevDate = '';
                this.partDesc = '';
                this.notes = '';
                this.reasons = '';
            }
            else {
                this.customertrue = false;
            }

        }

        handleProposal(event) {
            console.log('click Proposal---', event.target.value);
            if (event.target.value == true) {
                this.proposaltrue = true;
                this.customertrue = false;
                this.feasibletrue = false;
                this.reasons = '';
                this.customerPart = '';
                this.customerDrawing = '';
                this.customerRev = '';
                this.customerDate = '';
            }
            else {
                this.proposaltrue = false;
            }


        }
        handleFeasible(event) {
            console.log('click Feasible---', event.target.value);
            if (event.target.value == true) {
                this.feasibletrue = true;
                this.proposaltrue = false;
                this.customertrue = false;
                this.customerPart = '';
                this.customerDrawing = '';
                this.customerRev = '';
                this.customerDate = '';
                this.alternateProp = '';
                this.Rev = '';
                this.RevDate = '';
                this.partDesc = '';
                this.notes = '';
            }
            else {
                this.feasibletrue = false;
            }


        }
        handleAnnualUsage(event) {
            console.log(event.target.value);
            this.annualUsage = event.target.value;
            this.disabled = false;
            if (this.annualUsage == 'Est. Annual Usage (EAU)') {
                this.partsValue = '';
            }
            if (this.annualUsage == 'Pieces') {
                 this.annualValue = '';
            }

        }
        handleValue(event) {
            this.value = event.target.value;
            if (this.annualUsage == 'Est. Annual Usage (EAU)') {
                this.annualValue = this.value;
            }
            if (this.annualUsage == 'Pieces') {
                this.partsValue = this.value;
            }
        }

        handleTargetPrice(event) {
            this.targetPrice = event.target.value;
        }

        closeQuickAction() {
            this.dispatchEvent(new CloseActionScreenEvent());
        }
        handleCancel() {
            window.location.replace('/' + this.recordId);
        }
        handleSuccess(event) {
            console.log(event.detail.id);
            this.quoteLineId = event.detail.id;
            if (this.quoteLineId) {
                const toast = new ShowToastEvent({
                    variant: 'success',
                    title: 'Success!',
                    message: 'Quote Line Item added successfully',
                    mode: 'dismissable'
                });
                this.dispatchEvent(toast);
                this.spinner = false;
                window.location.replace('/' + this.recordId);
            }
        }
        handleSubmit(event) {
            this.spinner = true;
        }
        handleError(event) {
            console.log('OUTPUT => ', JSON.stringify(event.detail));
            this.spinner = false;
        }

    }