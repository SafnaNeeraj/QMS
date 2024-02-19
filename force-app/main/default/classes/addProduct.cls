public class addProduct {
    @AuraEnabled
    public static List<Quote_Express__c> getQuoteExpress(Id recordId){
        try{
            return ([Select Id, Customer__c,Buyer_POC__c,Platform__c,OEM__c,EOP__c,SOP__c,Automotive_Programs__c from Quote_Express__c where id  =: recordId]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static Id getRecordTypeId(String recordType){
       Id recordId = SObjectType.Quote_Line_Item__c.getRecordTypeInfosByDeveloperName().get(recordType).getRecordTypeId();
       return recordId;
   
    }
     @AuraEnabled
    public static List<Quote_Line_Item__c> getQuoteLineItem(Id recordId){
        try{
            return ([Select Id,Name,RecordType.Name,Customer_Drawing__c,Customer_Part__c,Pieces__c,Part_Description__c, Quote_Express__r.Id,
            Sample_Lead_Time__c,Production_Lead_Time__c,Report__c,Notes__c,Status__c,Probability__c,Start_Date__c,End_Date__c from Quote_Line_Item__c where Quote_Express__r.Id  =: recordId order by Name ASC limit 5]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
     @AuraEnabled
    public static List<Quote_Line_Item__c> getQLI(Id recordId){
        try{
            return ([Select Id,Name,RecordType.Name,Piece__c,Est_Annual_Usage__c,Customer_Drawing__c,Customer_Part__c,Pieces__c,Part_Description__c, Quote_Express__r.Id,
            Sample_Lead_Time__c,Production_Lead_Time__c,Report__c,Notes__c,Status__c,Probability__c,Start_Date__c,End_Date__c,Feasible_Customer__c,Feasible_Proposal__c,RB_W_Alternative_Proposal__c,
            Not_Feasible__c,Same_as__c,Manufacture__c,Buy_In_Complete__c,Buy__c from Quote_Line_Item__c where Id  =: recordId]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static List<Quote_Line_Item__c> getAllQuoteLineItem(Id recordId){
        try{
            return ([Select Id,Name,RecordType.Name,Piece__c,Est_Annual_Usage__c,Customer_Drawing__c,Customer_Part__c,Pieces__c,Part_Description__c, Quote_Express__r.Id,
            Sample_Lead_Time__c,Production_Lead_Time__c,Report__c,Notes__c,Status__c,Probability__c,Start_Date__c,End_Date__c,Feasible_Customer__c,Feasible_Proposal__c,RB_W_Alternative_Proposal__c,
            Not_Feasible__c,Same_as__c,Manufacture__c,Buy_In_Complete__c,Buy__c from Quote_Line_Item__c where Quote_Express__r.Id  =: recordId order by Name ASC]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static Quote_Line_Item__c getRecordType(Id qliId){
        try{
            return ([Select Id,RecordType.Name from Quote_Line_Item__c where Id  =: qliId]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
     @AuraEnabled
    public static void deleteQuoteLineItem(Id qliId){
        try{
            Quote_Line_Item__c qli = [Select Id from Quote_Line_Item__c where Id  =: qliId];
            delete qli;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
     @AuraEnabled
    public static List<Part_Costing__c> getPartCosting(Id recordId){
        try{
             return([Select Id,Sub_Total_Cost_USD__c from Part_Costing__c where Quote_Express__r.Id  =: recordId]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static Object copyNonSpac(Id qliId){
        try{
            return ([Select Id,RecordTypeId,Component_Material__c,Grade_Hardness__c,Thickness__c,SPAC_Type__c,SPAC_Material__c,Length_mm__c,
            of_SPAC_Element_App__c,Customer_Part__c,Customer_Drawing__c,Customer_Drawing_Rev__c,Customer_Drawing_Date__c,
            Annual_Usage__c,Automotive_Programs__c,Part_Description__c,Additional_Notes__c,
            Feasible_Customer__c,Feasible_Proposal__c,RB_W_Alternative_Proposal__c,Not_Feasible__c,
            Completely_New_Design__c,Partially_Close_to__c,Same_as__c,Manufacture__c,Buy_In_Complete__c,Production_Lead_Time__c,
            Buy__c,Cost__c,Net_Weight_Kg__c,Standard_Pack_Quantity__c,Part_Cost_Currency__c,Sample_Lead_Time__c,
            Quoted_Group__c,Risk_Analysis__c,Additional_Comments__c,No_of_Parts_Vehicle__c,Est_Annual_Usage__c,
            Quote_Express__r.Id from Quote_Line_Item__c where Id  =: qliId ]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static Object copySpac(Id qliId){
        try{
            return ([Select Id,RecordTypeId,Component_Material__c,Grade_Hardness__c,Thickness__c,SPAC_Type__c,SPAC_Material__c,Length_mm__c,
            of_SPAC_Element_App__c,SPAC_Annual_Volume__c,Customer_Part__c,Customer_Drawing__c,Customer_Drawing_Rev__c,Customer_Drawing_Date__c,Tolerence__c,
            Automotive_Programs__c,Part_Description__c,Additional_Notes__c,Pieces__c,Part_Cost_Currency__c,Finish__c,Dimensions__c,
            Feasible_Customer__c,Feasible_Proposal__c,RB_W_Alternative_Proposal__c,Not_Feasible__c,Thread_Size__c,Special_SPAC_Thread__c,
            Completely_New_Design__c,Partially_Close_to__c,Same_as__c,Manufacture__c,Buy_In_Complete__c,Production_Lead_Time__c,
            Buy__c,Cost__c,Net_Weight_Kg__c,Standard_Pack_Quantity__c,Sample_Lead_Time__c,Proof_Load_Stength__c,Clinch_Type__c,Torque_Out_Min__c,
            Quoted_Group__c,Risk_Analysis__c,Additional_Comments__c,Push_Out_Min__c,Pull_Through_Min__c,Air_Decay__c,Water_Ingress__c,Grounding__c,
            Feasibility__c,Prevailing_Torque__c,X3D_Model_Required__c,Pieces_Per_Year_Pieces__c,Pieces_Value__c,
            Quote__c,Quote_Express__r.Id from Quote_Line_Item__c where Id  =: qliId ]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
       
    }
    
     @AuraEnabled
    public static List<Standard_Clause__c> getStandardClause(Id recordId){
        try{
            return ([Select Id, Clause__c, Active__c,Quote_Express__c from Standard_Clause__c where Quote_Express__r.Id  =: recordId]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
     @AuraEnabled
    public static void updateStandardClause(String recordList){
        System.debug('recordList '+recordList);
        try{
            List<Standard_Clause__c> recordsToUpdate = new List<Standard_Clause__c>();
            for(Object record : (List<Object>)System.JSON.deserializeUntyped(recordList)){
                Map<String,Object> recordMap = (Map<String,Object>)record;
                Standard_Clause__c Clause = new Standard_Clause__c();
                Clause.Id = String.valueOf(recordMap.get('Id'));
                Clause.Active__c = Boolean.valueOf(recordMap.get('checked'));
                recordsToUpdate.add(Clause);
            }
            System.debug(recordsToUpdate);
            
            update recordsToUpdate;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }

}