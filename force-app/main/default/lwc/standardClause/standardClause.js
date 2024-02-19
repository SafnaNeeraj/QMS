import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getStandardClause from '@salesforce/apex/addProduct.getStandardClause';
import updateStandardClause from '@salesforce/apex/addProduct.updateStandardClause';
export default class StandardClause extends LightningElement {
    @api recordId;
    data;
    err;
    recordList = [];
    close = false;
    //  this.ratingList["Patrick"] = this.comboValue1;
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log(currentPageReference);
            this.recordId = currentPageReference.state.recordId;
            console.log(this.recordId)
        }
    }
    connectedCallback() {
        if (this.recordId) {
            getStandardClause({ recordId: this.recordId })
                .then(res => {
                    this.data = res;
                    console.log(this.data);
                })
                .catch(err => {
                    this.err = err;
                })
        }
    }
    closeModal() {
        this.close = true;
        window.location.replace('/' + this.recordId);
    }
    handleCheckChange(event) {
        console.log(event.target.dataset.id);
        console.log(event.target.checked);
        let obj = { Id: event.target.dataset.id, checked: event.target.checked };
        let found = false;
        if (this.recordList.length > 0) {
            this.recordList.forEach(element => {
                if (element.Id == obj.Id) {
                    element.checked = event.target.checked;
                    found = true;
                }
            })
        }
        if (!found) {
            this.recordList.push(obj);
        }
    }
    handleUpdate() {
       
        if (this.recordList) {
            console.log('==>' + JSON.stringify(this.recordList));
            updateStandardClause({ recordList: JSON.stringify(this.recordList) })
                .then(res => {
                    const toast = new ShowToastEvent({
                        variant: 'success',
                        title: 'Success!',
                        message: 'Standard Clause updated successfully',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(toast);
                    this.close = true;
                    window.location.replace('/'+this.recordId);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}