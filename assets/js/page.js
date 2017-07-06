var Page = {

	cubeButtonsNo: 1,

	cubeIndex: 0, 

	layerNo: 1, 

    init: function () {

        console.log("Page.init");

        this.bindEvents();

    },

    bindEvents: function () {

    	console.log("Page.bindEvents");

    	$("#buttons").on( "click", ".button", function() {

    		if ( !$(this).hasClass("off") ) {
    			$(this).addClass("off");
    		} else {
				$(this).removeClass("off");
    		}

    	});

    },

    addCubeButtons: function () {

    	console.log("Page.addCubeButtons");

    	// CUBE NUMBER TRANSLATED TO LETTER
    	$("#buttons").append("<li><label>" + String.fromCharCode( 64 + this.cubeButtonsNo ) + "</label></li>");
    	this.cubeButtonsNo++;
    	// RESET LAYER NUMBERS
    	this.layerNo = 1;

    },

    addLayerButton: function () {

    	console.log("Page.addLayerButton");

    	$("#buttons li:last-child").append("<div class='button'>" + this.layerNo + "</div>");
    	this.layerNo++;

    }

}

$(document).on("ready", function(){

    Page.init();

    // var i = 0;
    // while ( i < 6 ) {
    	
    // 	var cube

    // 	Space.init();
    // 	Space.animate();
    // 	Page.cubeIndex++;
    // 	i++;
    // }

    var cubeOne = new Cube();
	cubeOne.init();
	// cubeOne.animate();

});