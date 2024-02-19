({
    onPageReferenceChange: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var id = myPageRef.state.c__recordId;
        cmp.set("v.recordId", id);
    }
})