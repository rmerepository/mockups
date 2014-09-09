$(document).ready(function() {
    modelSearch.record_perpage = 10;
    modelSearch.tab("tenant");
    modelSearch.urlAPI = "/common/tenant_search";
    $("body").addClass("tenant-search")
});
