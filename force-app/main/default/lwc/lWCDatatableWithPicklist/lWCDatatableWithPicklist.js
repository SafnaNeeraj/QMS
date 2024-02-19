import { LightningElement, track, wire } from 'lwc';
import getProcessRouting from '@salesforce/apex/spacController.getProcessRouting';
import PROCESS_ROUTING from '@salesforce/schema/Process_Routing__c';
import SUPPLIER_FIELD from '@salesforce/schema/Process_Routing__c.Supplier__c';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
 
const columns = [
   { label: 'Id', fieldName: 'Id', editable: false },
        {
            label: 'Operation', fieldName: 'Operation__c', type: 'picklistColumn', wraptext: true, editable: true, typeAttributes: {
                options: { fieldName: 'picklistOptions' }, // Pass your picklist values here
                value: { fieldName: 'operation' },
                // Bind the selected value to a field in your data

            }
        },

        { label: 'Work Center', fieldName: 'Work_Center__c', type: 'picklistColumn', editable: true },
        {
            label: 'Supplier', fieldName: 'Supplier__c', type: 'picklistColumn',editable: true, typeAttributes: {
                options: { fieldName: 'picklistOptions' }, // Pass your picklist values here
                value: { fieldName: 'Supplier__c' },
                 context: { fieldName: 'Id' }
              

            }
        },
        { label: 'Outside Cost(CAD)', fieldName: 'Outside_Cost_CAD__c', type: 'text', editable: true },
        { label: 'Rate (Pcs/hr)', fieldName: 'Rate_Pcs_hr__c', type: 'text', editable: true },
        { label: 'Direct Labout Cost(CAD(', fieldName: 'Direct_Labour_Cost__c', type: 'text', editable: true },
        { label: 'Variable Cost(CAD(', fieldName: 'Variable_Cost__c', type: 'text', editable: true },
        {
            label: 'Delete',
            type: 'button-icon',
            initialWidth: 75,
            typeAttributes: {
                iconName: 'utility:delete',
                label: 'Delete',
                title: 'Delete',
                name: 'deleteRow',
                variant: 'Destructive',
                rowId: { fieldName: 'Id' },
            },
        }
    ];
 
export default class CustomDatatableDemo extends LightningElement {
    columns = columns;
    showSpinner = false;
    @track data = [];
    @track accountData;
    @track draftValues = [];
    lastSavedData = [];
    @track pickListOptions;
 
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
            console.log('@@@@@this.pickListOptions ----->'+JSON.stringify(this.pickListOptions) );
        } else if (error) {
            console.log(error);
        }
    }
 
    //here I pass picklist option so that this wire method call after above method
    @wire(getProcessRouting, { pickList: '$pickListOptions' })
    accountData(result) {
        this.accountData = result;
        if (result.data) {
            this.data = JSON.parse(JSON.stringify(result.data));
 
            this.data.forEach(ele => {
                ele.pickListOptions = this.pickListOptions;
            })
  console.log('@@@@@this.data ----->'+JSON.stringify(this.data) );
            this.lastSavedData = JSON.parse(JSON.stringify(this.data));
 
        } else if (result.error) {
            this.data = undefined;
        }
    };
 
    updateDataValues(updateItem) {
        let copyData = JSON.parse(JSON.stringify(this.data));
 
        copyData.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
            }
        });
 
        //write changes back to original data
        this.data = [...copyData];
    }
 
    updateDraftValues(updateItem) {
        let draftValueChanged = false;
        let copyDraftValues = [...this.draftValues];
        //store changed value to do operations
        //on save. This will enable inline editing &
        //show standard cancel & save button
        copyDraftValues.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
                draftValueChanged = true;
            }
        });
 
        if (draftValueChanged) {
            this.draftValues = [...copyDraftValues];
        } else {
            this.draftValues = [...copyDraftValues, updateItem];
        }
    }
 
    //handler to handle cell changes & update values in draft values
    handleCellChange(event) {
        alert('CellChange');
        //this.updateDraftValues(event.detail.draftValues[0]);
        let draftValues = event.detail.draftValues;
        draftValues.forEach(ele=>{
            this.updateDraftValues(ele);
        })
    }
 
    handleSave(event) {
        this.showSpinner = true;
        this.saveDraftValues = this.draftValues;
 
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.showToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
            this.draftValues = [];
            return this.refresh();
        }).catch(error => {
            console.log(error);
            this.showToast('Error', 'An Error Occured!!', 'error', 'dismissable');
        }).finally(() => {
            this.draftValues = [];
            this.showSpinner = false;
        });
    }
 
    handleCancel(event) {
        //remove draftValues & revert data changes
        this.data = JSON.parse(JSON.stringify(this.lastSavedData));
        this.draftValues = [];
    }
 
    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
 
    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.accountData);
    }
}