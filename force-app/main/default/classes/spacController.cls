public without sharing class spacController {
    
    @AuraEnabled
    public static List<Quote_Express__c> getQuoteExpressDetails(Id recordId){
        List<Quote_Express__c> quoteDetails = [SELECT Id,Customer__c,Platform__c,OEM__c,SOP__c,EOP__c,Buyer_POC__c,Name FROM Quote_Express__c WHERE Id =: recordId];
        system.debug('line 6==' + quoteDetails);
        return quoteDetails;
    }
    
    
    @AuraEnabled
    public static void insertQuoteLineItems(Id quoteId, String customerPart, String customerDrawing, String customerDrawingRev, Date customerDrawingDate,
                                            Decimal targetPrice, String automotivePrograms, String partDescription, String additionalNotes, Decimal spacElement,
                                            String componentMaterial, String gradeHardness, String thickness, String spacType, String lengthValue){
                                                
                                                List<Quote_Line_Item__c> qliList = new List<Quote_Line_Item__c>();
                                                Quote_Line_Item__c qli = new Quote_Line_Item__c();
                                                try{
                                                    if(quoteId!=null){
                                                        qli.Quote_Express__c = quoteId;
                                                        qli.RecordTypeId = '0125j000001aJ9tAAE';
                                                        qli.Customer_Part__c = customerPart;
                                                        qli.Customer_Drawing__c = customerDrawing;
                                                        qli.Customer_Drawing_Rev__c = customerDrawingRev;
                                                        qli.Customer_Drawing_Date__c = customerDrawingDate;
                                                        qli.Pieces__c = targetPrice;
                                                        qli.Automotive_Programs__c = automotivePrograms;
                                                        qli.Part_Description__c = partDescription;
                                                        qli.Additional_Notes__c = additionalNotes;
                                                        qli.of_SPAC_Element_App__c = spacElement;
                                                        // qli.SPAC_Annual_Volume__c = annualVolume;
                                                        qli.Component_Material__c = componentMaterial;
                                                        qli.Grade_Hardness__c = gradeHardness;
                                                        qli.Thickness__c = thickness;
                                                        qli.SPAC_Type__c = spacType;
                                                        qli.Length_mm__c = lengthValue;
                                                        
                                                        
                                                    }
                                                    qliList.add(qli);
                                                    insert qliList;
                                                }catch(Exception e){
                                                    System.debug('Error '+ e.getMessage());
                                                    throw new AuraHandledException(e.getMessage());
                                                }
                                            }
    
    
    // custom metadata for process routing component
    
    @AuraEnabled(cacheable=true)
    public static wrapper getCustomMetadataValues() {
        
        List<Schema.PicklistEntry> ple = ((Schema.SObjectField)Schema.getGlobalDescribe().get('Process_Routing_Metadata__mdt').getDescribe().fields.getMap().get('Operation__c')).getDescribe().getPicklistValues();
        List<Schema.PicklistEntry> ple1 = ((Schema.SObjectField)Schema.getGlobalDescribe().get('Process_Routing_Metadata__mdt').getDescribe().fields.getMap().get('Supplier__c')).getDescribe().getPicklistValues();
        List<Schema.PicklistEntry> ple2 = ((Schema.SObjectField)Schema.getGlobalDescribe().get('Process_Routing_Metadata__mdt').getDescribe().fields.getMap().get('Work_Center__c')).getDescribe().getPicklistValues();
        
        List<String> picklistValuesOperation = new List<String>();
        List<String> picklistValuesSupplier = new List<String>();
        List<String> picklistValuesWorkCenter = new List<String>();
        
        for (Schema.PicklistEntry pickListVal : ple) {
            picklistValuesOperation.add(pickListVal.getValue());
        }
        for (Schema.PicklistEntry pickListVal : ple1) {
            picklistValuesSupplier.add(pickListVal.getValue());
        }
        for (Schema.PicklistEntry pickListVal : ple2) {
            picklistValuesWorkCenter.add(pickListVal.getValue());
        }
        
        
        
        
        wrapper wrp = new wrapper();
        wrp.operationList = picklistValuesOperation;
        wrp.supplierList = picklistValuesSupplier;
        wrp.workCenterList = picklistValuesWorkCenter;
        return wrp;
    }
    
    public class Wrapper{
        @AuraEnabled
        public List<String> operationList; 
        @AuraEnabled
        public List<String> supplierList;
        @AuraEnabled
        public List<String> workCenterList; 
    }
    
    //insert process routing records
    
    @AuraEnabled
    public static void insertProcessRoutingRecords(Id recordId , String operation , String supplier,String workCenter,String outsideCost,String ratePcs,String variableCost,String directLabour ){
        /*  List<Process_Routing__c> processRoutingList = new List<Process_Routing__c>();
Process_Routing__c process = new Process_Routing__c();
try{
process.Quote_Express__c = recordId;
process.Operation__c = operation;
process.Supplier__c = supplier;
process.Work_Center__c = workCenter;
// process.Outside_Cost_CAD__c = outsideCost;
process.Rate_Pcs_hr__c = ratePcs;
process.Variable_Cost__c = variableCost;
process.Direct_Labour_Cost__c = directLabour;
processRoutingList.add(process);
insert processRoutingList;
system.debug('processRoutingList==='+ processRoutingList);
}
catch(Exception e){
System.debug('Error '+ e.getMessage());
throw new AuraHandledException(e.getMessage());
}*/
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Process_Routing__c> getProcessRouting(String quotelineid){
        
        List<Process_Routing__c> prList  = [SELECT Id,Quote_Line_Item__c ,Quote_Express__c,Operation__c,Supplier__c,Work_Center__c,Outside_Cost_CAD__c,Rate_Pcs_hr__c,Direct_Labour_Cost__c,Variable_Cost__c,Overhead_Cost_CAD__c  FROM Process_Routing__c where Quote_Line_Item__c =:quotelineid];
        system.debug('prList----->'+prList);
        
        return prList;
    }
    @AuraEnabled
    public static String deleterecords(String processrecordid){
        system.debug('inside delete--------'+processrecordid);
        List<Process_Routing__c> prList  = [SELECT Id,Operation__c,Supplier__c,Work_Center__c,Outside_Cost_CAD__c,Rate_Pcs_hr__c,Direct_Labour_Cost__c,Variable_Cost__c,Overhead_Cost_CAD__c FROM Process_Routing__c where id =: processrecordid];
        system.debug('prList----->'+prList);
        try{
            delete prList[0];
            return 'Success';
        }
        catch(Exception e){
            system.debug('Exception---'+e);
            return 'error';
        }
    }
    
    @AuraEnabled
    public static List<Process_Routing__c> updaterecordsProcessRouting(List<Process_Routing__c> recordtablelist, String quoteid, String quotelineid){
        
        List<Process_Routing__c> prList  = new List<Process_Routing__c>();
        List<Process_Routing__c> prListcreate  = new List<Process_Routing__c>();
        for(Process_Routing__c pr: recordtablelist){
            
            if(!String.isBlank(pr.Id) || !String.isEmpty(pr.Id)){
                if(pr.Operation__c!= null || pr.Operation__c != '')
                    pr.Operation__c = pr.Operation__c;
                if(pr.Supplier__c!= null || pr.Supplier__c != '')
                    pr.Supplier__c = pr.Supplier__c;
                if(pr.Work_Center__c!= null || pr.Work_Center__c != '')
                    pr.Work_Center__c = pr.Work_Center__c;
                if(pr.Outside_Cost_CAD__c!= null)
                    pr.Outside_Cost_CAD__c = pr.Outside_Cost_CAD__c;
                if(pr.Rate_Pcs_hr__c!= null)
                    pr.Rate_Pcs_hr__c = pr.Rate_Pcs_hr__c;
                if(pr.Direct_Labour_Cost__c!= null)
                    pr.Direct_Labour_Cost__c = pr.Direct_Labour_Cost__c;
                if(pr.Variable_Cost__c!= null)
                    pr.Variable_Cost__c = pr.Variable_Cost__c;
                if(pr.Overhead_Cost_CAD__c!= null)
                    pr.Overhead_Cost_CAD__c = pr.Overhead_Cost_CAD__c;
                prlist.add(pr);
            }
            else{
                System.debug('pr data-------'+ pr);
                Process_Routing__c probj = new Process_Routing__c();
                probj.Quote_Express__c  = quoteid;
                probj.Quote_Line_Item__c  = quotelineid;
                if(pr.Operation__c!= null || pr.Operation__c != '')
                    probj.Operation__c = pr.Operation__c;
                if(pr.Supplier__c!= null || pr.Supplier__c != '')
                    probj.Supplier__c = pr.Supplier__c;
                if(pr.Work_Center__c!= null || pr.Work_Center__c != '')
                    probj.Work_Center__c = pr.Work_Center__c;
                if(pr.Outside_Cost_CAD__c!= null)
                    probj.Outside_Cost_CAD__c = pr.Outside_Cost_CAD__c;
                if(pr.Rate_Pcs_hr__c!= null)
                    probj.Rate_Pcs_hr__c = pr.Rate_Pcs_hr__c;
                if(pr.Direct_Labour_Cost__c!= null)
                    probj.Direct_Labour_Cost__c = pr.Direct_Labour_Cost__c;
                if(pr.Variable_Cost__c!= null)
                    probj.Variable_Cost__c = pr.Variable_Cost__c;
                if(pr.Overhead_Cost_CAD__c!= null)
                    pr.Overhead_Cost_CAD__c = pr.Overhead_Cost_CAD__c;
                prListcreate.add(probj);
                
            }
            
        }
        system.debug('before prlist----->'+prlist);
        try{
            update prlist;
            insert prListcreate;
            system.debug('afterprlist----->'+prlist);
            return prlist;
        }
        catch(Exception e){
            System.debug('exeption---'+e); 
            return null;
        }
        
    }
    
    @AuraEnabled(cacheable=true) 
    public static picklistvaluesprocessrouting__c getCustomSettings(){
        
        system.debug('@@@@@picklistvaluesprocessrouting__c.getOrgDefaults()-->'+picklistvaluesprocessrouting__c.getOrgDefaults());
        return picklistvaluesprocessrouting__c.getOrgDefaults();
    }
    @AuraEnabled(cacheable=true)
    public static List<Part_Costing__c> getPartCosting(String quoteid){     
        List<Part_Costing__c> pcList  = [SELECT Id,Quote_Express__c,Cost_Per_Kg_USD__c,Customs__c,Customs_USD__c,Eng_Cmp_1__c,Eng_Cmp_2__c,
                                         Eng_EC_1__c,Eng_EC_2__c,Eng_Item_1__c,Eng_Item_2__c,Eng_Item_EC_1__c,Eng_Item_EC_2__c,Eng_Item_Qty_1__c,
                                         Eng_Item_Qty_2__c,Eng_Item_UC_1__c,Eng_Item_UC_2__c,Eng_Qty_1__c,Eng_Qty_2__c,Eng_UC_1__c,Eng_UC_2__c,
                                         Engineering_Total_USD__c,Gross_Margin__c,Local_Freight_USD__c,Markup__c,Misc_Total__c,Ocean_Freight_USD__c,Process_Total_USD__c,
                                         Sales_Cmp_1__c,Sales_Cmp_2__c,Sales_EC_1__c,Sales_EC_2__c,Sales_Markup_1__c,Sales_Markup_2__c,Sales_Qty_1__c,Sales_Qty_2__c,
                                         Sales_UC_1__c,Sales_UC_2__c,Selling_Price_USD__c,Sub_Total_Cost_USD__c,Total_Price_USD__c FROM Part_Costing__c where Quote_Express__c =:quoteid];
        system.debug('pcList----->'+pcList);
        
        return pcList;
    }
    
    @AuraEnabled
    public static List<Part_Costing__c> updatePartCosting(String recordList){  
        List<Part_Costing__c> pcListcreate  = new List<Part_Costing__c>();
        List<Part_Costing__c> pcList  = new List<Part_Costing__c>();
        
        for(Object record : (List<Object>)System.JSON.deserializeUntyped(recordList)){
            Map<String,Object> recordMap = (Map<String,Object>)record;
            System.debug('Id '+ String.valueOf(recordMap.get('Id')));
            if(String.valueOf(recordMap.get('Id')) != null){
                System.debug('inside 233');
                Part_Costing__c pc = new Part_Costing__c();
                pc.Id = String.valueOf(recordMap.get('Id'));
                if(String.valueOf(recordMap.get('CostPerKgUSD')) != null)
                    pc.Cost_Per_Kg_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('CostPerKgUSD')));
                if(String.valueOf(recordMap.get('Customs')) != null )
                    pc.Customs__c = Decimal.valueOf(String.valueOf(recordMap.get('Customs')));
                if(String.valueOf(recordMap.get('CustomsUSD')) != null )
                    pc.Customs_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('CustomsUSD')));
                if(String.valueOf(recordMap.get('EngCmp1'))!= null)
                    pc.Eng_Cmp_1__c = String.valueOf(recordMap.get('EngCmp1'));
                if(String.valueOf(recordMap.get('EngCmp2'))!= null)
                    pc.Eng_Cmp_2__c = String.valueOf(recordMap.get('EngCmp2'));
                if(String.valueOf(recordMap.get('EngEC1')) !=null )
                    pc.Eng_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngEC1')));
                if(String.valueOf(recordMap.get('EngEC2')) !=null )
                    pc.Eng_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngEC2')));
                if(String.valueOf(recordMap.get('EngItem1')) !=null )
                    pc.Eng_Item_1__c = String.valueOf(recordMap.get('EngItem1'));
                if(String.valueOf(recordMap.get('EngItem2')) !=null )
                    pc.Eng_Item_2__c = String.valueOf(recordMap.get('EngItem2'));
                if(String.valueOf(recordMap.get('EngItemEC1')) !=null )
                    pc.Eng_Item_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemEC1')));
                if(String.valueOf(recordMap.get('EngItemEC2')) !=null )
                    pc.Eng_Item_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemEC2')));
                if(String.valueOf(recordMap.get('EngItemQty1')) !=null )
                    pc.Eng_Item_Qty_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemQty1')));
                if(String.valueOf(recordMap.get('EngItemQty2')) !=null )
                    pc.Eng_Item_Qty_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemQty2')));
                if(String.valueOf(recordMap.get('EngItemUC1')) !=null )
                    pc.Eng_Item_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemUC1')));
                if(String.valueOf(recordMap.get('EngItemUC2')) !=null )
                    pc.Eng_Item_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemUC2')));
                if(String.valueOf(recordMap.get('EngQty1')) !=null )
                    pc.Eng_Qty_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngQty1')));
                if(String.valueOf(recordMap.get('EngQty2')) !=null )
                    pc.Eng_Qty_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngQty2')));
                if(String.valueOf(recordMap.get('EngUC1')) !=null )
                    pc.Eng_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngUC1')));
                if(String.valueOf(recordMap.get('EngUC2')) !=null )
                    pc.Eng_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngUC2')));
                if(String.valueOf(recordMap.get('EngineeringTotalUSD')) !=null )
                    pc.Engineering_Total_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('EngineeringTotalUSD')));
                
                if(String.valueOf(recordMap.get('GrossMargin')) !=null )
                    pc.Gross_Margin__c =  Decimal.valueOf(String.valueOf(recordMap.get('GrossMargin')));
                if(String.valueOf(recordMap.get('LocalFreightUSD')) !=null )
                    pc.Local_Freight_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('LocalFreightUSD')));
                if(String.valueOf(recordMap.get('Markup'))!=null )
                    pc.Markup__c = Decimal.valueOf(String.valueOf(recordMap.get('Markup')));
                if(String.valueOf(recordMap.get('MiscTotal')) !=null )
                    pc.Misc_Total__c = Decimal.valueOf(String.valueOf(recordMap.get('MiscTotal')));
                if(String.valueOf(recordMap.get('OceanFreightUSD')) !=null )
                    pc.Ocean_Freight_USD__c =  Decimal.valueOf(String.valueOf(recordMap.get('OceanFreightUSD')));
                if(String.valueOf(recordMap.get('OceanFreightUSD')) !=null )
                    pc.Process_Total_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('OceanFreightUSD')));
                
                if(String.valueOf(recordMap.get('SalesCmp1')) !=null )
                    pc.Sales_Cmp_1__c = String.valueOf(recordMap.get('SalesCmp1'));
                if(String.valueOf(recordMap.get('SalesCmp2')) !=null)
                    pc.Sales_Cmp_2__c = String.valueOf(recordMap.get('SalesCmp2'));
                
                if(String.valueOf(recordMap.get('SalesEC1')) !=null )
                    pc.Sales_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesEC1')));
                if(String.valueOf(recordMap.get('SalesEC2')) !=null )
                    pc.Sales_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesEC2')));
                if(String.valueOf(recordMap.get('SalesMarkup1')) !=null )
                    pc.Sales_Markup_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesMarkup1')));
                if(String.valueOf(recordMap.get('SalesMarkup2')) !=null )
                    pc.Sales_Markup_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesMarkup2')));
                if(String.valueOf(recordMap.get('SalesQty1')) !=null )
                    pc.Sales_Qty_1__c =  Decimal.valueOf(String.valueOf(recordMap.get('SalesQty1')));
                if(String.valueOf(recordMap.get('SalesQty2')) !=null )
                    pc.Sales_Qty_2__c =  Decimal.valueOf(String.valueOf(recordMap.get('SalesQty2')));
                if(String.valueOf(recordMap.get('SalesUC1')) !=null )
                    pc.Sales_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesUC1')));
                if(String.valueOf(recordMap.get('SalesUC2')) !=null )
                    pc.Sales_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesUC2')));
                
                if(String.valueOf(recordMap.get('SellingPriceUSD')) !=null )
                    pc.Selling_Price_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('SellingPriceUSD')));
                if(String.valueOf(recordMap.get('SubTotalCostUSD')) !=null )
                    pc.Sub_Total_Cost_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('SubTotalCostUSD')));
                if(String.valueOf(recordMap.get('TotalPriceUSD')) !=null )
                    pc.Total_Price_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('TotalPriceUSD')));
                
                pcList.add(pc);
                
            }
            else if(String.valueOf(recordMap.get('Id')) == null){
                System.debug('inside 325');
                Part_Costing__c pc = new Part_Costing__c();
                   if(String.valueOf(recordMap.get('quoteid')) != null )
                    pc.Quote_Express__c = String.valueOf(recordMap.get('quoteid'));
                if(String.valueOf(recordMap.get('CostPerKgUSD')) != null)
                    pc.Cost_Per_Kg_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('CostPerKgUSD')));
                if(String.valueOf(recordMap.get('Customs')) != null )
                    pc.Customs__c = Decimal.valueOf(String.valueOf(recordMap.get('Customs')));
                if(String.valueOf(recordMap.get('CustomsUSD')) != null )
                    pc.Customs_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('CustomsUSD')));
                if(String.valueOf(recordMap.get('EngCmp1'))!= null)
                    pc.Eng_Cmp_1__c = String.valueOf(recordMap.get('EngCmp1'));
                if(String.valueOf(recordMap.get('EngCmp2'))!= null)
                    pc.Eng_Cmp_2__c = String.valueOf(recordMap.get('EngCmp2'));
                if(String.valueOf(recordMap.get('EngEC1')) !=null )
                    pc.Eng_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngEC1')));
                if(String.valueOf(recordMap.get('EngEC2')) !=null )
                    pc.Eng_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngEC2')));
                if(String.valueOf(recordMap.get('EngItem1')) !=null)
                    pc.Eng_Item_1__c = String.valueOf(recordMap.get('EngItem1'));
                if(String.valueOf(recordMap.get('EngItem2')) !=null )
                    pc.Eng_Item_2__c = String.valueOf(recordMap.get('EngItem2'));
                if(String.valueOf(recordMap.get('EngItemEC1')) !=null )
                    pc.Eng_Item_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemEC1')));
                if(String.valueOf(recordMap.get('EngItemEC2')) !=null )
                    pc.Eng_Item_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemEC2')));
                if(String.valueOf(recordMap.get('EngItemQty1')) !=null )
                    pc.Eng_Item_Qty_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemQty1')));
                if(String.valueOf(recordMap.get('EngItemQty2')) !=null )
                    pc.Eng_Item_Qty_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemQty2')));
                if(String.valueOf(recordMap.get('EngItemUC1')) !=null )
                    pc.Eng_Item_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemUC1')));
                if(String.valueOf(recordMap.get('EngItemUC2')) !=null )
                    pc.Eng_Item_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngItemUC2')));
                if(String.valueOf(recordMap.get('EngQty1')) !=null )
                    pc.Eng_Qty_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngQty1')));
                if(String.valueOf(recordMap.get('EngQty2')) !=null )
                    pc.Eng_Qty_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngQty2')));
                if(String.valueOf(recordMap.get('EngUC1')) !=null )
                    pc.Eng_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('EngUC1')));
                if(String.valueOf(recordMap.get('EngUC2')) !=null )
                    pc.Eng_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('EngUC2')));
                if(String.valueOf(recordMap.get('EngineeringTotalUSD')) !=null )
                    pc.Engineering_Total_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('EngineeringTotalUSD')));
                
                if(String.valueOf(recordMap.get('GrossMargin')) !=null )
                    pc.Gross_Margin__c =  Decimal.valueOf(String.valueOf(recordMap.get('GrossMargin')));
                if(String.valueOf(recordMap.get('LocalFreightUSD')) !=null )
                    pc.Local_Freight_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('LocalFreightUSD')));
                if(String.valueOf(recordMap.get('Markup'))!=null )
                    pc.Markup__c = Decimal.valueOf(String.valueOf(recordMap.get('Markup')));
                if(String.valueOf(recordMap.get('MiscTotal')) !=null )
                    pc.Misc_Total__c = Decimal.valueOf(String.valueOf(recordMap.get('MiscTotal')));
                if(String.valueOf(recordMap.get('OceanFreightUSD')) !=null )
                    pc.Ocean_Freight_USD__c =  Decimal.valueOf(String.valueOf(recordMap.get('OceanFreightUSD')));
                if(String.valueOf(recordMap.get('OceanFreightUSD')) !=null )
                    pc.Process_Total_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('OceanFreightUSD')));
                
                if(String.valueOf(recordMap.get('SalesCmp1')) !=null  )
                    pc.Sales_Cmp_1__c = String.valueOf(recordMap.get('SalesCmp1'));
                if(String.valueOf(recordMap.get('SalesCmp2')) !=null )
                    pc.Sales_Cmp_2__c = String.valueOf(recordMap.get('SalesCmp2'));
                
                if(String.valueOf(recordMap.get('SalesEC1')) !=null )
                    pc.Sales_EC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesEC1')));
                if(String.valueOf(recordMap.get('SalesEC2')) !=null )
                    pc.Sales_EC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesEC2')));
                if(String.valueOf(recordMap.get('SalesMarkup1')) !=null )
                    pc.Sales_Markup_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesMarkup1')));
                if(String.valueOf(recordMap.get('SalesMarkup2')) !=null )
                    pc.Sales_Markup_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesMarkup2')));
                if(String.valueOf(recordMap.get('SalesQty1')) !=null )
                    pc.Sales_Qty_1__c =  Decimal.valueOf(String.valueOf(recordMap.get('SalesQty1')));
                if(String.valueOf(recordMap.get('SalesQty2')) !=null )
                    pc.Sales_Qty_2__c =  Decimal.valueOf(String.valueOf(recordMap.get('SalesQty2')));
                if(String.valueOf(recordMap.get('SalesUC1')) !=null )
                    pc.Sales_UC_1__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesUC1')));
                if(String.valueOf(recordMap.get('SalesUC2')) !=null )
                    pc.Sales_UC_2__c = Decimal.valueOf(String.valueOf(recordMap.get('SalesUC2')));
                
                if(String.valueOf(recordMap.get('SellingPriceUSD')) !=null )
                    pc.Selling_Price_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('SellingPriceUSD')));
                if(String.valueOf(recordMap.get('SubTotalCostUSD')) !=null )
                    pc.Sub_Total_Cost_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('SubTotalCostUSD')));
                if(String.valueOf(recordMap.get('TotalPriceUSD')) !=null )
                    pc.Total_Price_USD__c = Decimal.valueOf(String.valueOf(recordMap.get('TotalPriceUSD')));
                
                pcListcreate.add(pc);
                
            }
        }
        system.debug('before pclist----->'+pcList);
        try{
            if(!pcList.isEmpty()){
                System.debug('pcList '+ pcList);
                update pclist;
                return pcList;
            }
            else if(!pcListcreate.isEmpty())
                insert pcListcreate;
            system.debug('pcListcreate----->'+pcListcreate);
            return pcListcreate;
            
        }
        catch(Exception e){
            System.debug('exeption---'+e); 
            return null;
        }
    }
}