var Page = {

    init: function () {

        console.log("Page.init");

    }

}

$(document).on("ready", function(){

    Page.init();

    Space.init();
    Space.animate();

});