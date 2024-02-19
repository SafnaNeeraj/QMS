import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getQuoteExpressDetails from '@salesforce/apex/spacController.getQuoteExpressDetails';
import getCustomMetadataValues from '@salesforce/apex/spacController.getCustomMetadataValues';
import insertProcessRoutingRecords from '@salesforce/apex/spacController.insertProcessRoutingRecords';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import PROCESS_ROUTING from '@salesforce/schema/Process_Routing__c';
import OPERATION_FIELD from '@salesforce/schema/Process_Routing__c.Operation__c';
import WORKCENTER_FIELD from '@salesforce/schema/Process_Routing__c.Work_Center__c';
import SUPPLIER_FIELD from '@salesforce/schema/Process_Routing__c.Supplier__c';
import getProcessRouting from '@salesforce/apex/spacController.getProcessRouting';

export default class ProcessRouting extends LightningElement {
 columns = columns;
    isModalOpen = false;
    isModalOpen1 = true;
    @api recordId;
    customer;
    tdata=[];
    routeData=[];
    platform;
    buyer;
    eop;
    sop;
    oem;
    operation = '';
    supplier = '';
    workCenter = '';
    outsideCost = 0;
    ratePcs = '';
    variableCost = '';
    directLabour = '';

   

    operationValueList = [];
    supplierValueList = [];
    workCenterList = [];

   


    //connected callback

    connectedCallback() {
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
            }),

            this.operationValueList = [
                { label: 'Option 1', value: 'Option1' },
                { label: 'Option 2', value: 'Option2' },
                // Add more options as needed
            ];

        console.log('line 72==' + this.operationValueList);

    }


    // modal open and close

    handleSearchKeyword() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
    renderedCallback(){
       this.isModalOpen1 = true;
    }

    closeModal1() {
        this.isModalOpen1 = false;
    }
    submitDetails1() {
        this.isModalOpen1 = false;
    }

    // lightning datatable

    @track tableData = [];
    @track draftValues = [];
    nextRowId = 1;





    @wire(getObjectInfo, { objectApiName: PROCESS_ROUTING })
    objectInfo;

    //fetch picklist options
    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: SUPPLIER_FIELD
    })
    wirePickList({ error, data }) {
        if (data) {
            this.pickListOptions = data.values;
            console.log('line 274===' + JSON.stringify(this.pickListOptions));
          //  this.fetchRecords();
        } else if (error) {
            console.log('error line 278==' + JSON.stringify(error));
        }
    }
    

    processRouting = [];

  
 @wire(getProcessRouting, { pickList: '$pickListOptions' })
    routeData(result) {
        this.routeData = result;
        if (result.data) {
            this.tdata = result.data;
 
          
  console.log('@@@@@@ tdata.tdata'+ JSON.stringify(this.tdata));
        } else if (result.error) {
            this.Tdata = undefined;
        }
    };
   }