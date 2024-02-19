import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress';
import getRecordTypeId from '@salesforce/apex/addProduct.getRecordTypeId';
import getPartCosting from '@salesforce/apex/addProduct.getPartCosting';
import getQLI from '@salesforce/apex/addProduct.getQLI';


export default class SpacComponent extends LightningElement {

    @api recordId = '';
    @api quoteLineId = '';
    @api recordType = '';
    @api editSpac;
    varRecordType;
    getValue;
    value = '';
    data;
    error;
    customerPartReq = false;
    oem;
    sop;
    eop;
    customer;
    buyer;
    platform;
    report = 'No';
    automotiveValue;
    spacAnnualVol;
    piecesValue;
    spacElemetValue;
    disableFeasible = false;
    disableRBW = false;
    spinner = false;
    @track Feasible_Customer__c;
    @track RB_W_Alternative_Proposal__c;
    @track Not_Feasible__c;
    @track Feasible_Proposal__c;
    @track Same_as__c;
    @track Manufacture__c;
    @track Buy_In_Complete__c;
    @track Buy__c;
    @track Completely_New_Design__c;
    @track Partially_Close_to__c;
    proposalDrawing;
    proposalDrawingRev;
    proposalDrawingRevDate;
    proposalPart;
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

    oemRadioOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }

    ];
    // Handle oemradio option change event
    handleRadioChange(event) {
        console.log('radio ' + event.target.value);
        if (event.target.value == 'yes') {
            this.customerPartReq = true;
            this.disableFeasible = true;
            this.disableRBW = false;
        } else {
            this.customerPartReq = false;
            this.disableRBW = true;
            this.disableFeasible = false;
        }
    }

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log(currentPageReference);
            this.recordId = currentPageReference.state.recordId;
            if (this.recordId == null) {
                this.recordId = currentPageReference.attributes.recordId;
            }
        }
    }


    connectedCallback() {
        console.log('line 193==' + this.recordId);
        if (this.recordId != null) {
            getQuoteExpress({ recordId: this.recordId })
                .then(res => {
                    this.data = res;
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

        if (this.recordType != null) {
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
        if(this.quoteLineId != null){
             console.log('line 162 ' + this.quoteLineId)
            getQLI({recordId: this.quoteLineId})
            .then(res => {
                console.log('result '+ JSON.stringify(res));
                this.Feasible_Customer__c = res[0].Feasible_Customer__c;
                this.Feasible_Proposal__c = res[0].Feasible_Proposal__c;
                this.RB_W_Alternative_Proposal__c = res[0].RB_W_Alternative_Proposal__c;
                this.Not_Feasible__c = res[0].Not_Feasible__c;
                this.Same_as__c = res[0].Same_as__c;
                this.Manufacture__c = res[0].Manufacture__c;
                this.Buy_In_Complete__c = res[0].Buy_In_Complete__c;
                this.Buy__c = res[0].Buy__c;
            })
        }

    }

    handleManufac(event) {
        this.Manufacture__c = event.target.value;
        this.Buy_In_Complete__c = false;
        this.Buy__c = false;

    }
    handleBuy(event) {
        this.Buy_In_Complete__c = event.target.value;
        this.Manufacture__c = false;
        this.Buy__c = false;

    }
    handleBuypro(event) {
        this.Buy__c = event.target.value;
        this.Buy_In_Complete__c = false;
        this.Manufacture__c = false;

    }

    handlePartiallyChange(event) {
        this.Same_as__c = false;
        this.Completely_New_Design__c = false;
        this.Partially_Close_to__c = event.target.value;
    }
    handleCompletelyNewChange(event) {
        this.Same_as__c = false;
        this.Completely_New_Design__c = event.target.value;
        this.Partially_Close_to__c = false;
    }

    handlesame(event) {
        console.log('click same---', event.target.value);
        this.Same_as__c = event.target.value;
        this.Completely_New_Design__c = false;
        this.Partially_Close_to__c = false;
    }
    handleCustomer(event) {
        this.Feasible_Customer__c = event.target.value;
        this.RB_W_Alternative_Proposal__c = false;
        this.Not_Feasible__c = false;
        this.Feasible_Proposal__c = false;

        if (this.Feasible_Customer__c == true) {
            this.proposalDrawing = '';
            this.proposalDrawingRev = '';
            this.proposalDrawingRevDate = '';
            this.proposalPart = '';
            this.alternateProp = '';
            this.Rev = '';
            this.RevDate = '';
            this.partDesc = '';
            this.notes = '';
            this.reasons = '';
        }

    }

    handleProposal(event) {
        this.RB_W_Alternative_Proposal__c = event.target.value;
        this.Feasible_Customer__c = false;
        this.Not_Feasible__c = false;
        this.Feasible_Proposal__c = false;

        if (this.RB_W_Alternative_Proposal__c == true) {
            this.reasons = '';
            this.customerPart = '';
            this.customerDrawing = '';
            this.customerRev = '';
            this.customerDate = '';
            this.proposalDrawing = '';
            this.proposalDrawingRev = '';
            this.proposalDrawingRevDate = '';
            this.proposalPart = '';
        }


    }
    handleFeasible(event) {

        this.Not_Feasible__c = event.target.value;
        this.Feasible_Customer__c = false;
        this.RB_W_Alternative_Proposal__c = false;
        this.Feasible_Proposal__c = false;

        if (this.Not_Feasible__c == true) {
            this.customerPart = '';
            this.customerDrawing = '';
            this.customerRev = '';
            this.customerDate = '';
            this.proposalDrawing = '';
            this.proposalDrawingRev = '';
            this.proposalDrawingRevDate = '';
            this.proposalPart = '';
            this.alternateProp = '';
            this.Rev = '';
            this.RevDate = '';
            this.partDesc = '';
            this.notes = '';
        }





    }
    handleFeasibleProp(event) {
        this.Not_Feasible__c = false;
        this.Feasible_Customer__c = false;
        this.RB_W_Alternative_Proposal__c = false;
        this.Feasible_Proposal__c = event.target.value;

        if (this.Feasible_Proposal__c == true) {
            this.alternateProp = '';
            this.Rev = '';
            this.RevDate = '';
            this.partDesc = '';
            this.notes = '';
            this.reasons = '';
            this.customerPart = '';
            this.customerDrawing = '';
            this.customerRev = '';
            this.customerDate = '';
        }


    }
    handlePiecesValueChange(event) {
        this.piecesValue = event.target.value;

        if (this.piecesValue != null && this.spacElemetValue != null)
            this.spacAnnualVol = this.piecesValue * this.spacElemetValue;

    }
    handlePiecesPerYearChange(event) {
        console.log(event.target.value);
        if (event.target.value == 'Pieces Per Year') {
            this.report = 'Yes';
        } else {
            this.report = 'No';
        }
    }
    handleSpacElementChange(event) {
        this.spacElemetValue = event.target.value;

        if (this.piecesValue != null && this.spacElemetValue != null)
            this.spacAnnualVol = this.piecesValue * this.spacElemetValue;

    }
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm' + JSON.stringify(event.detail.fields));
        this.spinner = true;

    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
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
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleCancel() {
        window.location.replace('/' + this.recordId);
    }
    handleError(event) {
        console.log('OUTPUT => ', JSON.stringify(event.detail));
        this.spinner = false;
    }
}