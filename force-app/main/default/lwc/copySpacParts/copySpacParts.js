import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuoteExpress from '@salesforce/apex/addProduct.getQuoteExpress';
import getRecordTypeId from '@salesforce/apex/addProduct.getRecordTypeId';
import copySpac from '@salesforce/apex/addProduct.copySpac'
export default class CopySpacParts extends LightningElement {
   @api recordId;
   @track data;
   result;
   @track error;
   spinner = false;
   @api quoteLineId;
   @api copy;
   getValue;
   @api recordType = '';
   @track customertrue;
   @track proposaltrue;
   @track feasibletrue;
   @track sametrue;
   varRecordType;
   customer;
   platform;
   buyer;
   eop;
   sop;
   oem;
   Pieces__c;
   disabled = true;
   RecordTypeId;
   Component_Material__c;
   Grade_Hardness__c;
   Thickness__c;
   SPAC_Type__c;
   SPAC_Material__c;
   Length_mm__c;
   of_SPAC_Element_App__c;
   Customer_Part__c;
   Customer_Drawing__c;
   Customer_Drawing_Rev__c;
   Customer_Drawing_Date__c;
   Annual_Usage__c;
   Automotive_Programs__c;
   Part_Description__c;
   Additional_Notes__c;
   Part_Cost_Currency__c;
   Feasible_Customer__c;
   Feasible_Proposal__c;
   RB_W_Alternative_Proposal__c;
   Not_Feasible__c;
   Completely_New_Design__c;
   Partially_Close_to__c;
   Same_as__c;
   Manufacture__c;
   Buy_In_Complete__c;
   Buy__c;
   Cost__c;
   Net_Weight_Kg__c;
   Standard_Pack_Quantity__c;
   Sample_Lead_Time__c;
   Production_Lead_Time__c;
   Quoted_Group__c;
   Risk_Analysis__c;
   Additional_Comments__c;
   SPAC_Annual_Volume__c;
   Finish__c;
   Dimensions__c;
   Thread_Size__c;
   Special_SPAC_Thread__c;
   Tolerence__c;
   Proof_Load_Stength__c;
   Clinch_Type__c;
   Torque_Out_Min__c;
   Push_Out_Min__c;
   Pull_Through_Min__c;
   Air_Decay__c;
   Water_Ingress__c;
   Grounding__c;
   Feasibility__c;
   Quote__c;
   X3D_Model_Required__c;
   Prevailing_Torque__c;
   Pieces_Per_Year_Pieces__c;
   Pieces_Value__c;

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
               this.error = undefined;
            })
            .catch(err => {
               this.data = undefined;
               this.error = err;
               console.log(err);
            })
            
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




         copySpac({ qliId: this.quoteLineId })
            .then(res => {
               this.result = res;
               this.error = undefined;
               console.log('result ' + JSON.stringify(res));
               if (res[0].RecordTypeId != null) {
                  this.RecordTypeId = res[0].RecordTypeId;
               }
               if (res[0].Component_Material__c != null) {
                  this.Component_Material__c = res[0].Component_Material__c;
               }
               if (res[0].Grade_Hardness__c != null) {
                  this.Grade_Hardness__c = res[0].Grade_Hardness__c;
               }
               if (res[0].Thickness__c != null) {
                  this.Thickness__c = res[0].Thickness__c;
               }
               if (res[0].SPAC_Type__c != null) {
                  this.SPAC_Type__c = res[0].SPAC_Type__c;
               }
               if (res[0].SPAC_Material__c != null) {
                  this.SPAC_Material__c = res[0].SPAC_Material__c;
               }
               if (res[0].Length_mm__c != null) {
                  this.Length_mm__c = res[0].Length_mm__c;
               }
               if (res[0].of_SPAC_Element_App__c != null) {
                  this.of_SPAC_Element_App__c = res[0].of_SPAC_Element_App__c;
               }
               if (res[0].SPAC_Annual_Volume__c != null) {
                  this.SPAC_Annual_Volume__c = res[0].SPAC_Annual_Volume__c;
               }
               if (res[0].Customer_Part__c != null) {
                  this.Customer_Part__c = res[0].Customer_Part__c;
               }
               if (res[0].Customer_Drawing__c != null) {
                  this.Customer_Drawing__c = res[0].Customer_Drawing__c;
               }
               if (res[0].Customer_Drawing_Rev__c != null) {
                  this.Customer_Drawing_Rev__c = res[0].Customer_Drawing_Rev__c;
               }
               if (res[0].Customer_Drawing_Date__c != null) {
                  this.Customer_Drawing_Date__c = res[0].Customer_Drawing_Date__c;
               }
               if (res[0].Automotive_Programs__c != null) {
                  this.Automotive_Programs__c = res[0].Automotive_Programs__c;
               }
               if (res[0].Part_Description__c != null) {
                  this.Part_Description__c = res[0].Part_Description__c;
               }
               if (res[0].Additional_Notes__c != null) {
                  this.Additional_Notes__c = res[0].Additional_Notes__c;
               }
               if (res[0].Part_Cost_Currency__c != null) {
                  this.Part_Cost_Currency__c = res[0].Part_Cost_Currency__c;
               }
               if (res[0].Feasible_Customer__c != null) {
                  this.Feasible_Customer__c = res[0].Feasible_Customer__c;
                  console.log('feasible ' + this.Feasible_Customer__c)
               }
               if (res[0].Feasible_Proposal__c != null) {
                  this.Feasible_Proposal__c = res[0].Feasible_Proposal__c;
               }
               if (res[0].RB_W_Alternative_Proposal__c != null) {
                  this.RB_W_Alternative_Proposal__c = res[0].RB_W_Alternative_Proposal__c;
               }
               if (res[0].Not_Feasible__c != null) {
                  this.Not_Feasible__c = res[0].Not_Feasible__c;
               }
               if (res[0].Completely_New_Design__c != null) {
                  this.Completely_New_Design__c = res[0].Completely_New_Design__c;
               }
               if (res[0].Partially_Close_to__c != null) {
                  this.Partially_Close_to__c = res[0].Partially_Close_to__c;
               }
               if (res[0].Same_as__c != null) {
                  this.Same_as__c = res[0].Same_as__c;
               }
               if (res[0].Manufacture__c != null) {
                  this.Manufacture__c = res[0].Manufacture__c;
               }
               if (res[0].Buy_In_Complete__c != null) {
                  this.Buy_In_Complete__c = res[0].Buy_In_Complete__c;
               }
               if (res[0].Buy__c != null) {
                  this.Buy__c = res[0].Buy__c;
               }
               if (res[0].Cost__c != null) {
                  this.Cost__c = res[0].Cost__c;
               }
               if (res[0].Net_Weight_Kg__c != null) {
                  this.Net_Weight_Kg__c = res[0].Net_Weight_Kg__c;
               }
               if (res[0].Standard_Pack_Quantity__c != null) {
                  this.Standard_Pack_Quantity__c = res[0].Standard_Pack_Quantity__c;
               }
               if (res[0].Sample_Lead_Time__c != null) {
                  this.Sample_Lead_Time__c = res[0].Sample_Lead_Time__c;
               }
               if (res[0].Production_Lead_Time__c != null) {
                  this.Production_Lead_Time__c = res[0].Production_Lead_Time__c;
               }
               if (res[0].Quoted_Group__c != null) {
                  this.Quoted_Group__c = res[0].Quoted_Group__c;
               }
               if (res[0].Risk_Analysis__c != null) {
                  this.Risk_Analysis__c = res[0].Risk_Analysis__c;
               }
               if (res[0].Additional_Comments__c != null) {
                  this.Additional_Comments__c = res[0].Additional_Comments__c;
               }
               if (res[0].Pieces__c != null) {
                  this.Pieces__c = res[0].Pieces__c;
               }
               if (res[0].Finish__c != null) {
                  this.Finish__c = res[0].Finish__c;
               }
               if (res[0].Dimensions__c != null) {
                  this.Dimensions__c = res[0].Dimensions__c;
               }
               if (res[0].Thread_Size__c != null) {
                  this.Thread_Size__c = res[0].Thread_Size__c;
               }
               if (res[0].Special_SPAC_Thread__c != null) {
                  this.Special_SPAC_Thread__c = res[0].Special_SPAC_Thread__c;
               }
               if (res[0].Tolerence__c != null) {
                  this.Tolerence__c = res[0].Tolerence__c;
               }
               if (res[0].Proof_Load_Stength__c != null) {
                  this.Proof_Load_Stength__c = res[0].Proof_Load_Stength__c;
               }
               if (res[0].Clinch_Type__c != null) {
                  this.Clinch_Type__c = res[0].Clinch_Type__c;
               }
               if (res[0].Torque_Out_Min__c != null) {
                  this.Torque_Out_Min__c = res[0].Torque_Out_Min__c;
               }
               if (res[0].Push_Out_Min__c != null) {
                  this.Push_Out_Min__c = res[0].Push_Out_Min__c;
               }
               if (res[0].Pull_Through_Min__c != null) {
                  this.Pull_Through_Min__c = res[0].Pull_Through_Min__c;
               }
               if (res[0].Air_Decay__c != null) {
                  this.Air_Decay__c = res[0].Air_Decay__c;
               }
               if (res[0].Water_Ingress__c != null) {
                  this.Water_Ingress__c = res[0].Water_Ingress__c;
               }
               if (res[0].Grounding__c != null) {
                  this.Grounding__c = res[0].Grounding__c;
               }
               if (res[0].Feasibility__c != null) {
                  this.Feasibility__c = res[0].Feasibility__c;
               }
               if (res[0].Quote__c != null) {
                  this.Quote__c = res[0].Quote__c;
               }
               if (res[0].X3D_Model_Required__c != null) {
                  this.X3D_Model_Required__c = res[0].X3D_Model_Required__c;
               }
               if (res[0].Prevailing_Torque__c != null) {
                  this.Prevailing_Torque__c = res[0].Prevailing_Torque__c;
               }
               if (res[0].Pieces_Per_Year_Pieces__c != null) {
                  this.Pieces_Per_Year_Pieces__c = res[0].Pieces_Per_Year_Pieces__c;
               }
               if (res[0].Pieces_Value__c != null) {
                  this.Pieces_Value__c = res[0].Pieces_Value__c;
               }


            })
            .catch(err => {
               this.result = undefined;
               this.error = err;
               console.log(err);
            })
      }
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
   handle3DModelChange(event) {

   }
   handlePrevailingTorqueChange(event) {

   }

   handleAnnualVolumeChange(event) {
      this.SPAC_Annual_Volume__c = event.target.value;
   }
   handleFinishChange(event) {
      this.Finish__c = event.target.value;
   }
   handleDimensionsChange(event) {
      this.Dimensions__c = event.target.value;
   }
   handleThreadSizeChange(event) {
      this.Thread_Size__c = event.target.value;
   }
   handleSpecialSPACThreadChange(event) {
      this.Special_SPAC_Thread__c = event.target.value;
   }
   handleTolerenceChange(event) {
      this.Tolerence__c = event.target.value;
   }
   handleProofLoadStengthChange(event) {
      this.Proof_Load_Stength__c = event.target.value;
   }
   handleClinchTypeChange(event) {
      this.Clinch_Type__c = event.target.value;
   }
   handleTorqueChange(event) {
      this.Torque_Out_Min__c = event.target.value;
   }
   handlePushChange(event) {
      this.Push_Out_Min__c = event.target.value;
   }
   handlePullChange(event) {
      this.Pull_Through_Min__c = event.target.value;
   }
   handleAirDecayChange(event) {
      this.Air_Decay__c = event.target.value;
   }
   handleWaterIngressChange(event) {
      this.Water_Ingress__c = event.target.value;
   }
   handleGroundingChange(event) {
      this.Grounding__c = event.target.value;
   }
   handleFeasibilityChange(event) {
      this.Feasibility__c = event.target.value;
   }
   handleQuoteChange(event) {
      this.Quote__c = event.target.value;
   }
   handleAdditionalCommentsChange(event) {
      this.Additional_Comments__c = event.target.value;
   }
   handleRiskAnalysisChange(event) {
      this.Risk_Analysis__c = event.target.value;
   }
   handleQuotedGroupChange(event) {
      this.Quoted_Group__c = event.target.value;
   }
   handleProductionLeadTimeChange(event) {
      this.Production_Lead_Time__c = event.target.value;
   }
   handleSampleLeadTimeChange(event) {
      this.Sample_Lead_Time__c = event.target.value;
   }
   handleStandardPackQuantityChange(event) {
      this.Standard_Pack_Quantity__c = event.target.value;
   }
   handleNetWeightKgChange(event) {
      this.Net_Weight_Kg__c = event.target.value;
   }
   handleCostChange(event) {
      this.Cost__c = event.target.value;
   }
   handleBuyChange(event) {
      this.Buy__c = event.target.value;
      this.Buy_In_Complete__c = false;
      this.Manufacture__c = false;
   }
   handleBuyInCompleteChange(event) {
      this.Buy_In_Complete__c = event.target.value;
      this.Manufacture__c = false;
      this.Buy__c = false;
   }
   handleManufactureChange(event) {
      this.Manufacture__c = event.target.value;
      this.Buy_In_Complete__c = false;
      this.Buy__c = false;
   }
   handleSameChange(event) {
      this.Same_as__c = event.target.value;
      this.Completely_New_Design__c = false;
      this.Partially_Close_to__c = false;


   }
   handlePartiallyCloseChange(event) {
      this.Same_as__c = false;
      this.Completely_New_Design__c = false;
      this.Partially_Close_to__c = event.target.value;
   }
   handleCompletelyNewDesignChange(event) {
      this.Same_as__c = false;
      this.Completely_New_Design__c = event.target.value;
      this.Partially_Close_to__c = false;
   }
   handleNotFeasibleChange(event) {
      this.Not_Feasible__c = event.target.value;
      this.Feasible_Customer__c = false;
      this.RB_W_Alternative_Proposal__c = false;
      this.Feasible_Proposal__c = false;



   }
   handleAlternativeProposalChange(event) {
      this.RB_W_Alternative_Proposal__c = event.target.value;
      this.Feasible_Customer__c = false;
      this.Not_Feasible__c = false;
      this.Feasible_Proposal__c = false;


   }
   handleFeasibleProposalChange(event) {
      this.Feasible_Proposal__c = event.target.value;
      this.Not_Feasible__c = false;
      this.Feasible_Customer__c = false;
      this.RB_W_Alternative_Proposal__c = false;
   }
   handleFeasibleCustomerChange(event) {
      this.Feasible_Customer__c = event.target.value;
      this.RB_W_Alternative_Proposal__c = false;
      this.Not_Feasible__c = false;
      this.Feasible_Proposal__c = false;

   }
   handlePartCostCurrencyChange(event) {
      this.Part_Cost_Currency__c = event.target.value;
   }
   handleAdditionalNotesChange(event) {
      this.Additional_Notes__c = event.target.value;
   }
   handlePartDescriptionChange(event) {
      this.Part_Description__c = event.target.value;
   }
   handleAutomotiveProgramsChange(event) {
      this.Automotive_Programs__c = event.target.value;
   }
   handleCustomerDrawingDateChange(event) {
      this.Customer_Drawing_Date__c = event.target.value;
   }
   handleCustomerDrawingRevChange(event) {
      this.Customer_Drawing_Rev__c = event.target.value;
   }
   handleCustomerDrawingChange(event) {
      this.Customer_Drawing__c = event.target.value;
   }
   handleCustomerPartChange(event) {
      this.Customer_Part__c = event.target.value;
   }
   handleComponentMaterialChange(event) {
      this.Component_Material__c = event.target.value;
   }
   handleGradeHardnessChange(event) {
      this.Grade_Hardness__c = event.target.value;
   }
   handleThicknessChange(event) {
      this.Thickness__c = event.target.value;
   }
   handleSPACTypeChange(event) {
      this.SPAC_Type__c = event.target.value;
   }
   handleSPACMaterialChange(event) {
      this.SPAC_Material__c = event.target.value;
   }
   handleLengthChange(event) {
      this.Length_mm__c = event.target.value;
   }
   handleElementAppChange(event) {
      this.of_SPAC_Element_App__c = event.target.value;
       if (this.Pieces__c != null && this.of_SPAC_Element_App__c != null)
            this.SPAC_Annual_Volume__c = this.Pieces__c * this.of_SPAC_Element_App__c;
   }
   handlePiecesValueChange(event) {
      this.Pieces__c = event.target.value;
      if (this.Pieces__c != null && this.of_SPAC_Element_App__c != null)
            this.SPAC_Annual_Volume__c = this.Pieces__c * this.of_SPAC_Element_App__c;
       
   }
    handlePiecesPerYearChange(event){
       this.Pieces_Per_Year_Pieces__c = event.target.value;
       if(event.target.value =='Pieces Per Year'){
             this.report =true;
        }else{
            this.report =false;
        }
        
       
    }
}