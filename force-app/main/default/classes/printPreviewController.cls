public class printPreviewController {
    public static Quote_Express__c quoteExpress {get;set;}
    public static List<Quote_Line_Item__c> quoteLineItems {get;set;}
    public Boolean isApproved {get;set;}
    public string formattedDate {get;set;}
    private static ID RecordId;
    public string userEmail {get;set;}
    public string userPhone{get;set;}
    public string clauses{get;set;}
    
    public printPreviewController() { 
        try{
            RecordId= System.currentPageReference().getParameters().get('id');
            userPhone = '';
            quoteExpress = [SELECT Id,Name,Customer__c,Phone__c,Createdby.Name,Createdby.phone,Createdby.Email,Additional_Sales_Contact__r.Phone,
                            Additional_Sales_Contact__c,Additional_Sales_Contact__r.Email,Contact__r.Fax,Quote_Status__c,Email__c,RFQ_No__c,Terms__c,
                            Automotive_Programs__c,Quote_Currency__c,Quote_Due_Date__c,RFQ_Date__c,Additional_Sales_Contact__r.Name,
                            (Select id, Clause__c  from Standard_Clause__r where Active__c = true LIMIT 1)
                            FROM Quote_Express__c 
                            WHERE id=:RecordId  ORDER BY createddate DESC][0];
            quoteLineItems = [SELECT Id,Customer_Part__c,PCS_Yr__c,PCS__c,RBW_Drawing_Number__c ,Developer_Charges__c ,Part_Description__c,Standard_Pack_Quantity__c,Pieces__c,Sample_Lead_Time__c,Production_Lead_Time__c 
                              FROM Quote_Line_Item__c 
                              WHERE Quote_Express__c =: quoteExpress.Id];
            if(quoteExpress.Quote_Status__c == 'Approved'){
                system.debug('line 13==' + isApproved);
                isApproved = True;
            }
            system.debug('line 16==' + quoteExpress.Additional_Sales_Contact__r.Email);
            String FileName = quoteExpress.Name +'.pdf';
            if (quoteExpress.Additional_Sales_Contact__c != null) {
                userEmail = quoteExpress.Additional_Sales_Contact__r.Email;
            }
            system.debug('line 25===' + quoteExpress.Additional_Sales_Contact__r.Phone);
            if (quoteExpress.Additional_Sales_Contact__c != null) {
                userPhone = quoteExpress.Additional_Sales_Contact__r.Phone;
            }
            if(quoteExpress.Standard_Clause__r != NULL && quoteExpress.Standard_Clause__r.size() > 0 ){
                clauses = quoteExpress.Standard_Clause__r[0].Clause__c;
            }
            Apexpages.currentPage().getHeaders().put('content-disposition', 'inline; filename="'+filename+'".pdf');
            system.debug('quote exp==' + quoteExpress.Customer__c);
            system.debug('line items===' + quoteLineItems);
            
        }
        
        catch(exception e){
            system.debug('line 35==' + e.getMessage());
        }
        
    }
    
}