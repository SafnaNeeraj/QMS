import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { loadStyle } from 'lightning/platformResourceLoader';
import ParentCss from '@salesforce/resourceUrl/ParentCss';

export default class ParentLWC extends LightningElement {
   selectedrecordtype = '';
   editPart = false;
    
    get options() {
        return [
            { label: 'Non SPAC', value: 'Non_SPAC' },
            { label: 'SPAC', value: 'SPAC' },
        ]
    }
    showmodal = true ;
    shownonspac = false;
    showspac = false;
    recordId='';

    connectedCallback() {
    
    Promise.all([
        loadStyle( this, ParentCss )
        ]).then(() => {
            console.log( 'Files loaded' );
        })
        .catch(error => {
            console.log( error.body.message );
    });

    console.log('hiiiii')

}
    handleRadioChange(event) {
        this.selectedrecordtype = event.detail.value;

        console.log(this.selectedrecordtype)
    }
    handleNext() {
        if (this.selectedrecordtype) {
            this.showmodal = false;
            if (this.selectedrecordtype == 'Non_SPAC')
                this.shownonspac = true;
        }
        if (this.selectedrecordtype) {
            this.showmodal = false;
            if (this.selectedrecordtype == 'SPAC')
                this.showspac = true;
        }
        console.log('clicked')
    }
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}