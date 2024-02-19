import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress';
import getProcessRouting from '@salesforce/apex/spacController.getProcessRouting';
import getPartCosting from '@salesforce/apex/spacController.getPartCosting';
import updatePartCosting from '@salesforce/apex/spacController.updatePartCosting';
export default class PartCosting extends LightningElement {

    @api recordId;
    partCostingId;
    openPartCosting = true;
    oem;
    sop;
    eop;
    customer;
    buyer;
    platform;
    extCost = 0;
    quantity;
    cost;
    extCost1 = 0;
    quantity1;
    cost1;
    extCost2 = 0;
    quantity2;
    cost2;
    extCost3 = 0;
    quantity3;
    cost3;
    totalPrice;
    localFreight;
    customs;
    customsPercent;
    oceanFreight;
    costPerKg;
    miscTotal;
    extCost5 = 0;
    extCost4 = 0;
    quantity4;
    quantity5;
    cost4;
    cost5;
    sellingPrice;
    grossMargin;
    subTotalCost;
    engTotal =0;
    markup =0;
    subTotalCost;
    processTotal = 0;
    markup1;
    markup2;
    extCostTotal;
    data;
    recordList = [];
    engcmp1;
    engcmp2;
    engItem1;
    engItem2;
    salesCmp1;
    salesCmp2;
    get otherComponentOptions() {
        return [
            { label: 'Component 1', value: 'Component 1' },
            { label: 'Component 2', value: 'Component 2' },
            { label: 'Component 3', value: 'Component 3' },
        ];
    }
    get otherItemOptions() {
        return [
            { label: 'Item Cost 1', value: 'Item Cost 1' },
            { label: 'Item Cost 2', value: 'Item Cost 2' },
            { label: 'Item Cost 3', value: 'Item Cost 3' },
        ];
    }

    get compNameOptions() {
        return [
            { label: 'Sales Cost 1', value: 'Sales Cost 1' },
            { label: 'Sales Cost 2', value: 'Sales Cost 2' },
            { label: 'Sales Cost 3', value: 'Sales Cost 3' },
        ];
    }

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log('currentPage ' + JSON.stringify(currentPageReference));
            this.recordId = currentPageReference.attributes.recordId;
            console.log('recordId ' + this.recordId)
        }
    }
    handleOtherCompChange(event) {
        console.log(event.target.dataset.id);
        if (event.target.dataset.id == 1);
        this.engcmp1 = event.target.value;
        if (event.target.dataset.id == 2);
        this.engcmp2 = event.target.value;
    }
    handleSalesOptions(event) {
        if (event.target.dataset.id == 1);
        this.salesCmp1 = event.target.value;
        if (event.target.dataset.id == 2);
        this.salesCmp2 = event.target.value;
    }
    handleItemCompChange(event) {
        if (event.target.dataset.id == 1);
        this.engItem1 = event.target.value;
        if (event.target.dataset.id == 2);
        this.engItem2 = event.target.value;
    }
    handleQuantityChange(event) {
        this.quantity = event.target.value;
        this.extCost = this.quantity * this.cost;

    }
    handleUnitCostChange(event) {
        this.cost = event.target.value;
        this.extCost = this.quantity * this.cost;

        if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
    }
    handleQuantity1Change(event) {
        this.quantity1 = event.target.value;
        this.extCost1 = this.quantity1 * this.cost1;


    }
    handleUnitCost1Change(event) {
        this.cost1 = event.target.value;
        this.extCost1 = this.quantity1 * this.cost1;
        console.log(this.extCost1);

        if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
    }
    handleQuantity2Change(event) {
        this.quantity2 = event.target.value;
        this.extCost2 = this.quantity2 * this.cost2;

    }
    handleUnitCost2Change(event) {
        this.cost2 = event.target.value;
        this.extCost2 = this.quantity2 * this.cost2;

        if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
    }
    handleQuantity3Change(event) {
        this.quantity3 = event.target.value;
        this.extCost3 = this.quantity3 * this.cost3;

    }
    handleUnitCost3Change(event) {
        this.cost3 = event.target.value;
        this.extCost3 = this.quantity3 * this.cost3;

        if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
    }
    handleQuantity4Change(event) {
        this.quantity4 = event.target.value;
        this.extCost4 = (this.quantity4 * this.cost4) + ((this.quantity4 * this.cost4) * this.markup1) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;

    }
    handleUnitCost4Change(event) {
        this.cost4 = event.target.value;
        this.extCost4 = (this.quantity4 * this.cost4) + ((this.quantity4 * this.cost4) * this.markup1) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;

    }
    handleQuantity5Change(event) {
        this.quantity5 = event.target.value;
        this.extCost5 = (this.quantity5 * this.cost5) + ((this.quantity5 * this.cost5) * this.markup2) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;


    }
    handleUnitCost5Change(event) {
        this.cost5 = event.target.value;
        this.extCost5 = (this.quantity5 * this.cost5) + ((this.quantity5 * this.cost5) * this.markup2) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;
    }
    handleMarkup(event) {
        this.markup = event.target.value;
         if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
    }
    handleGrossMargin(event) {
        this.grossMargin = event.target.value;
        this.sellingPrice = (this.subTotalCost / (1 - this.grossMargin / 100)).toFixed(5);
    }
    handleSellingPrice(event) {
        this.sellingPrice = event.target.value;
    }
    handleMarkup1(event) {
        this.markup1 = event.target.value;
        this.extCost4 = (this.quantity4 * this.cost4) + ((this.quantity4 * this.cost4) * this.markup1) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;
    }
    handleMarkup2(event) {
        this.markup2 = event.target.value;
        this.extCost5 = (this.quantity5 * this.cost5) + ((this.quantity5 * this.cost5) * this.markup2) / 100;
        this.miscTotal = this.extCost4 + this.extCost5;
    }
    handleCostPerKgChange(event) {
        this.costPerKg = event.target.value;
        //here 1 denotes net weight..
        this.oceanFreight = this.costPerKg * 1;
    }
    handleCustomsChange(event) {
        this.customsPercent = event.target.value;
        this.customs = this.subTotalCost + this.oceanFreight * this.customsPercent / 100;
    }
    handleLocalChange(event) {
        this.localFreight = event.target.value;
        console.log('this.miscTotal ' + this.miscTotal);
        console.log('this.oceanFreight ' + this.oceanFreight);
        console.log('this.localFreight ' + this.localFreight);
        console.log('this.customsl ' + this.customs);
        console.log('this.sellingPrice ' + this.sellingPrice);
        if (this.miscTotal != null && this.oceanFreight != null && this.localFreight != null && this.customs != null && this.sellingPrice != null)
            this.totalPrice = (parseFloat(this.miscTotal) + parseFloat(this.customs) + parseFloat(this.oceanFreight) + parseFloat(this.localFreight) + parseFloat(this.sellingPrice)).toFixed(5);
        console.log(this.totalPrice);
    }

    closeModal() {
        this.openPartCosting = false;
        window.location.reload();
    }
    submitDetails() {
        let obj = {
            quoteid: this.recordId, Id: this.partCostingId, CostPerKgUSD: this.costPerKg, Customs: this.customsPercent,
            CustomsUSD: this.customs, EngCmp1: this.engcmp1, EngCmp2: this.engcmp2,
            EngEC1: this.extCost, EngEC2: this.extCost1, EngItem1: this.engItem1, EngItem2: this.engItem2,
            EngItemEC1: this.extCost2, EngItemEC2: this.extCost3,
            EngItemQty1: this.quantity2, EngItemQty2: this.quantity3, EngItemUC1: this.cost2, EngItemUC2: this.cost3, EngQty1: this.quantity, EngQty2: this.quantity1, EngUC1: this.cost, EngUC2: this.cost1,
            EngineeringTotalUSD: this.engTotal, GrossMargin: this.grossMargin, LocalFreightUSD: this.localFreight, Markup: this.markup, MiscTotal: this.miscTotal, OceanFreightUSD: this.oceanFreight,
            ProcessTotalUSD: this.processTotal, SalesCmp1: this.salesCmp1, SalesCmp2: this.salesCmp2,
            SalesEC1: this.extCost4, SalesEC2: this.extCost5, SalesMarkup1: this.markup1, SalesMarkup2: this.markup2,
            SalesQty1: this.quantity4, SalesQty2: this.quantity5, SalesUC1: this.cost4, SalesUC2: this.cost5, SellingPriceUSD: this.sellingPrice, SubTotalCostUSD: this.subTotalCost, TotalPriceUSD: this.totalPrice
        };

        console.log('obj ' + JSON.stringify(obj));
        this.recordList.push(obj);
        console.log('recordList ' + JSON.stringify(this.recordList));
        updatePartCosting({ recordList: JSON.stringify(this.recordList) })
            .then(res => {
                console.log(res);
                const toast = new ShowToastEvent({
                    variant: 'success',
                    title: 'Success!',
                    message: 'Part Costing Updated successfully',
                    mode: 'dismissable'
                });
                this.dispatchEvent(toast);
                this.openPartCosting = false;
                window.location.reload();

            })
            .catch(err => {
                console.log(err);
                const toast = new ShowToastEvent({
                    variant: 'error',
                    title: 'Error!',
                    message: JSON.stringify(err),
                    mode: 'dismissable'
                });
                this.dispatchEvent(toast);
                this.openPartCosting = false;
                window.location.reload();
            })
    }

    connectedCallback() {
        console.log('line 193==' + this.recordId);
        getQuoteExpress({ recordId: this.recordId })
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

        if (this.recordId) {
            getProcessRouting({ quoteid: this.recordId })
                .then(res => {
                    console.log(res);
                    this.data = res;
                    this.data.forEach(element => {
                        if (element.Ext_Cost__c != null)
                            this.processTotal = this.processTotal + element.Ext_Cost__c;
                    });
                })
                .catch(err => {
                    console.log(err);
                })

            getPartCosting({ quoteid: this.recordId })
                .then(res => {
                    console.log(res);
                    if (res[0].Id)
                        this.partCostingId = res[0].Id;
                    if (res[0].Cost_Per_Kg_USD__c)
                        this.costPerKg = res[0].Cost_Per_Kg_USD__c;
                    if (res[0].Customs__c)
                        this.customsPercent = res[0].Customs__c;
                    if (res[0].Customs_USD__c)
                        this.customs = res[0].Customs_USD__c;
                    if (res[0].Eng_Cmp_1__c)
                        this.engcmp1 = res[0].Eng_Cmp_1__c;
                    if (res[0].Eng_Cmp_2__c)
                        this.engcmp2 = res[0].Eng_Cmp_2__c;
                    if (res[0].Eng_EC_1__c)
                        this.extCost = res[0].Eng_EC_1__c;
                    if (res[0].Eng_EC_2__c)
                        this.extCost1 = res[0].Eng_EC_2__c;
                    if (res[0].Eng_Item_1__c)
                        this.engItem1 = res[0].Eng_Item_1__c;
                    if (res[0].Eng_Item_2__c)
                        this.engItem2 = res[0].Eng_Item_2__c;
                    if (res[0].Eng_Item_EC_1__c)
                        this.extCost2 = res[0].Eng_Item_EC_1__c;
                    if (res[0].Eng_Item_EC_2__c)
                        this.extCost3 = res[0].Eng_Item_EC_2__c;
                    if (res[0].Eng_Item_Qty_1__c)
                        this.quantity2 = res[0].Eng_Item_Qty_1__c;
                    if (res[0].Eng_Item_Qty_2__c)
                        this.quantity3 = res[0].Eng_Item_Qty_2__c;
                    if (res[0].Eng_Item_UC_1__c)
                        this.cost2 = res[0].Eng_Item_UC_1__c;
                    if (res[0].Eng_Item_UC_2__c)
                        this.cost3 = res[0].Eng_Item_UC_2__c;
                    if (res[0].Eng_Qty_1__c)
                        this.quantity = res[0].Eng_Qty_1__c;
                    if (res[0].Eng_Qty_2__c)
                        this.quantity1 = res[0].Eng_Qty_2__c;
                    if (res[0].Eng_UC_1__c)
                        this.cost = res[0].Eng_UC_1__c;
                    if (res[0].Eng_UC_2__c)
                        this.cost1 = res[0].Eng_UC_2__c;
                    if (res[0].Engineering_Total_USD__c)
                        this.engTotal = res[0].Engineering_Total_USD__c;
                    if (res[0].Gross_Margin__c)
                        this.grossMargin = res[0].Gross_Margin__c;
                    if (res[0].Local_Freight_USD__c)
                        this.localFreight = res[0].Local_Freight_USD__c;
                    if (res[0].Markup__c)
                        this.markup = res[0].Markup__c;
                    if (res[0].Misc_Total__c)
                        this.miscTotal = res[0].Misc_Total__c;
                    if (res[0].Ocean_Freight_USD__c)
                        this.oceanFreight = res[0].Ocean_Freight_USD__c;
                    if (res[0].Process_Total_USD__c)
                        this.processTotal = res[0].Process_Total_USD__c;
                    if (res[0].Sales_Cmp_1__c)
                        this.salesCmp1 = res[0].Sales_Cmp_1__c;
                    if (res[0].Sales_Cmp_2__c)
                        this.salesCmp2 = res[0].Sales_Cmp_2__c;
                    if (res[0].Sales_EC_1__c)
                        this.extCost4 = res[0].Sales_EC_1__c;
                    if (res[0].Sales_EC_2__c)
                        this.extCost5 = res[0].Sales_EC_2__c;
                    if (res[0].Sales_Markup_1__c)
                        this.markup1 = res[0].Sales_Markup_1__c;
                    if (res[0].Sales_Markup_2__c)
                        this.markup2 = res[0].Sales_Markup_2__c;
                    if (res[0].Sales_Qty_1__c)
                        this.quantity4 = res[0].Sales_Qty_1__c;
                    if (res[0].Sales_Qty_2__c)
                        this.quantity5 = res[0].Sales_Qty_2__c;
                    if (res[0].Sales_UC_1__c)
                        this.cost4 = res[0].Sales_UC_1__c;
                    if (res[0].Sales_UC_2__c)
                        this.cost5 = res[0].Sales_UC_2__c;
                    if (res[0].Selling_Price_USD__c)
                        this.sellingPrice = res[0].Selling_Price_USD__c;
                    if (res[0].Sub_Total_Cost_USD__c)
                        this.subTotalCost = res[0].Sub_Total_Cost_USD__c;
                    if (res[0].Total_Price_USD__c)
                        this.totalPrice = res[0].Total_Price_USD__c;

                })
                .catch(err => {
                    console.log(err);
                })

            if (this.extCost != null && this.extCost1 != null && this.extCost2 != null && this.extCost3 != null) {
                this.extCostTotal = this.extCost + this.extCost1 + this.extCost2 + this.extCost3;
            }
            if (this.extCostTotal != null) {
                this.engTotal = this.extCostTotal + (this.extCostTotal * this.markup) / 100;
            }
            if (this.engTotal != null && this.processTotal != null) {
                this.subTotalCost = this.engTotal + this.processTotal;
            }
        }
    }

}