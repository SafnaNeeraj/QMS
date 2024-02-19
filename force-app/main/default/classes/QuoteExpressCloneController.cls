public with sharing class QuoteExpressCloneController {
    public Quote_Express__c originalQuote { get; set; }
    public Quote_Express__c clonedQuote { get; set; }
    
    // Constructor to initialize the original Quote Express
    public QuoteExpressCloneController(ApexPages.StandardController controller) {
        String quoteExpressId = controller.getRecord().Id;
        originalQuote = [SELECT Id, Name,Application__c,Automotive_Programs__c,Buyer_POC__c,Customer__c,Email__c,
                         Freight_Terms__c,EOP__c,Initiated_By__c,Internal_Notes__c,OEM__c,Opportunity__c,
                         Platform__c,Program_EOP__c ,Program_SOP__c,Quote_Currency__c,Quote_Due_Date__c,Quote_Status__c,Quote_Terms__c,
                         RFQ_Date__c,RFQ_No__c,Shipping_Point__c,SOP__c,Status__c,Terms__c FROM Quote_Express__c WHERE Id = :quoteExpressId];
    }
    
    // Method to clone the Quote Express object and its related items
    public PageReference cloneQuoteAndItems() {
        clonedQuote = originalQuote.clone(false, true);
        clonedQuote.Name = 'testt';
        insert clonedQuote; // Insert the cloned Quote Express
        
        List<Quote_Line_Item__c > relatedItems = [SELECT Id, Name,Customer_Part__c,Part_Description__c,Standard_Pack_Quantity__c,Pieces__c,Customer_Drawing__c,Sample_Lead_Time__c,Production_Lead_Time__c FROM Quote_Line_Item__c WHERE Quote_Express__c  = :originalQuote.Id];
        List<Quote_Line_Item__c > clonedItems = new List<Quote_Line_Item__c>();
        
        for (Quote_Line_Item__c item : relatedItems) {
            Quote_Line_Item__c clonedItem = item.clone(false, true);
            clonedItem.Quote_Express__c = clonedQuote.Id; 
            clonedItems.add(clonedItem);
        }
        
        insert clonedItems;
        
        PageReference page = new PageReference('/' + clonedQuote.Id); // Redirect to the cloned Quote Express
        page.setRedirect(true);
        return page;
    }
}