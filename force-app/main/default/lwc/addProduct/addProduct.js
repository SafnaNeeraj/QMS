import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress';
import getRecordTypeId from '@salesforce/apex/addProduct.getRecordTypeId'
import getPartCosting from '@salesforce/apex/addProduct.getPartCosting';
export default class AddProduct extends LightningElement {
    @api recordId;
    @track data;
    @track error;
    @track getValue;
    @api recordType;
    automotiveValue;
    varRecordType;
    spacComp = false;
    spinner = false;
    @api quoteLineId;
    feasibleProposalDisable = false;
    @api copy;
    customer;
    platform;
    buyer;
    eop;
    sop;
    oem;
    value = '';
    partsValue;
    annualValue;
    annualUsage;
    targetPrice;
    costValue;
    disabled = true;
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
        if (this.recordId) {
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
        if (this.recordType) {
            console.log('line 73 ' + this.recordType)
            if (this.recordType == 'Non SPAC') {
                this.varRecordType = 'Non_SPAC';
                this.feasibleProposalDisable = true;
            }
            else {
                this.varRecordType = 'SPAC';
                this.spacComp = true;
            }
            console.log(this.varRecordType)
            getRecordTypeId({ recordType: this.varRecordType })
                .then(res => {
                    this.getValue = res;
                    console.log('this.getValue ' + this.getValue)
                })
                .catch(err => {
                    console.log('error occured 73 ' + JSON.stringify(err));
                })
        }
    }
    handleAnnualUsage(event) {
        console.log(event.target.value);
        this.annualUsage = event.target.value;
        this.disabled = false;
        if (this.annualUsage == 'Est. Annual Usage (EAU)') {
            this.annualValue = this.value;
        }
        if (this.annualUsage == 'Pieces') {
            this.partsValue = this.value;
        }

    }

    handleManufac(event) {

        this.Manufacture__c = event.target.value;
        console.log(event.target.value)
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
        this.Partially_Close_to__c = true;
    }
    handleCompletelyNewChange(event) {
        this.Same_as__c = false;
        this.Completely_New_Design__c = true;
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
    }

    handleProposal(event) {
        this.RB_W_Alternative_Proposal__c = event.target.value;
        this.Feasible_Customer__c = false;
        this.Not_Feasible__c = false;
        this.Feasible_Proposal__c = false;

    }
    handleFeasible(event) {

        this.Not_Feasible__c = event.target.value;
        this.Feasible_Customer__c = false;
        this.RB_W_Alternative_Proposal__c = false;
        this.Feasible_Proposal__c = false;

    }
    handleFeasibleProp(event) {
        this.Not_Feasible__c = false;
        this.Feasible_Customer__c = false;
        this.RB_W_Alternative_Proposal__c = false;
        this.Feasible_Proposal__c = event.target.value;

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
        window.location.reload();
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