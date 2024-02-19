({
    showOption1Component: function (component, event, helper) {
        component.set("v.showOption1", true);
        component.set("v.showOption2", false);
    },
    showOption2Component: function (component, event, helper) {
        component.set("v.showOption1", false);
        component.set("v.showOption2", true);
    },
});