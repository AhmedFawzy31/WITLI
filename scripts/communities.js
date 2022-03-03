$(document).ready(function(){
    $(".accordion").on("shown.bs.collapse", function(e){
        scroll.update();
    })
    $(".accordion").on("hidden.bs.collapse", function(e){
        scroll.update();
    })
});