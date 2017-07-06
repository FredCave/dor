var Page = {

	cubeButtonsIndex: 1,

	cubeIndex: 0, 

	layerNo: 1, 

    init: function () {

        console.log("Page.init");

        this.bindEvents();

        // LOAD CUBE DATA
        this.loadCubeData();

    },

    bindEvents: function () {

    	console.log("Page.bindEvents");

    	// TOGGLE LAYERS
    	$("#buttons").on( "click", ".button", function() {

    		if ( !$(this).hasClass("off") ) {
    			$(this).addClass("off");
    			Space.hideLayer( $(this).attr("id") );
    		} else {
				$(this).removeClass("off");
				Space.showLayer( $(this).attr("id") );
    		}

    	});

    	// TOGGLE ALL BUTTONS
       	$("#buttons_toggle").on( "click", function() {

    		if ( !$(this).hasClass("off") ) {
    			$(this).text("Show Controls").addClass("off");
    			$("#buttons").hide();
    		} else {
				$(this).text("Hide Controls").removeClass("off");
				$("#buttons").show();
    		}

    	});

    	// LAYER NAME ON HOVER
    	$("#buttons").on( "mouseover", ".button", function( e ) {

    		var layerName = $(this).attr("data-name");
			$("#tooltip").text( layerName ).css({
				"top" 		: e.clientY + 12, 
				"left" 		: e.clientX + 12,
				"display" 	: "inline-block"
			});
    		console.log( 54, e.clientX, e.clientY, layerName );

    	});

    	// SLIDERS ON HOVER
    	$("#buttons").on( "mouseover", ".cube_control", function( e ) {

    		var text;
    		if ( $(this).hasClass("cube_opacity") ) {
    			text = "Opacity";
    		} else if ( $(this).hasClass("cube_size") ) {
				text = "Size";
    		}

			$("#tooltip").text( text ).css({
				"top" 		: e.clientY + 12, 
				"left" 		: e.clientX + 12,
				"display" 	: "inline-block"
			});

    	});  

    	// RESET TOOLTIP
    	$("#buttons").on( "mouseout", "div", function( e ) {

			$("#tooltip").text("").css({
				"top" 		: "", 
				"left" 		: "",
				"display" 	: ""
			});

    	});  	

    },

    addCubeButtons: function () {

    	console.log("Page.addCubeButtons");

    	// CUBE NUMBER TRANSLATED TO LETTER
    	var letter = String.fromCharCode( 64 + this.cubeButtonsIndex );
    	$("#buttons").append("<li data-letter='" + letter + "'><label>" + letter + "</label></li>");
    	this.cubeButtonsIndex++;
    	// RESET LAYER NUMBERS
    	this.layerNo = 1;

    },

    addLayerButton: function ( name ) {

    	console.log("Page.addLayerButton");

    	var row = $("#buttons li:last-child");
    	row.append("<div class='button off' data-name='" + name + "' id='" + row.data("letter") + this.layerNo + "'>" + this.layerNo + "</div>");
    	this.layerNo++;

    },

    addControls: function () {

    	console.log("Page.addControls");
    	
    	var row = $("#buttons li:last-child");
    	row.append("<div class='cube_control cube_opacity'></div><div class='cube_control cube_size'></div>");

    },

	loadCubeData: function () {

        console.log("Page.loadCubeData");

        var self = this;

        $.get( ROOT + "/wp-json/custom/v1/cubes", function( data ) {

            self.cubeData = data;

            self.cubeDataLoaded();

        }).fail(function() {
            console.log("Ajax error. Cube not loaded.");
        });

    },

    cubeDataLoaded: function () {

    	console.log("Page.cubeDataLoaded");

		Space.init();
		Space.animate();

    },

    controlsInit: function () {

    	console.log("Page.controlsInit");

		$(".cube_opacity").slider({
			min 	: 0,
			max 	: 1,
			value 	: 1,			
		});
		$(".cube_size").slider({
			min 	: 500,
			max 	: 20000,
			value 	: 5000,
		});

    }

}

$(document).on("ready", function(){

    Page.init();

});