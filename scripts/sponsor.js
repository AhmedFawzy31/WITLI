$(document).ready(function(){
    $(".dropdown-content a").click(function(){
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        let filterText = $(this).text();
        $(this).parent().siblings("button").children("span").text(filterText);
    });
})