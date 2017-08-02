var Controls = {

	cubeButtonsIndex: 1,

	layerNo: 1, 

	init: function () {

		console.log("Controls.init");

		var self = this;

		this.bindEvents();

		$("#buttons_wrapper").show();

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

        // TOGGLE CUBES
        $("#buttons").on( "click", "label", function() {

        	console.log( 60, "Click" );

            if ( !$(this).hasClass("off") ) {
                $(this).addClass("off").siblings(".button").addClass("off");
                Space.hideCube( $(this).text() );
            } else {
                $(this).removeClass("off").siblings(".button").removeClass("off");
                Space.showCube( $(this).text() );
            }

        });

    	// TOGGLE CONTROLS
       	$("#buttons_toggle").on( "click", function() {

    		if ( !$(this).hasClass("off") ) {
    			$(this).text("Show Controls").addClass("off");
    			$("#buttons").hide();
    		} else {
				$(this).text("Hide Controls").removeClass("off");
				$("#buttons").show();
    		}
            Space.toggleAxes();

    	});

        // LABEL ON HOVER
        $("#buttons").on( "mouseover", "label", function( e ) {

            $("#tooltip").text( "Toggle All" ).css({
                "top"       : e.clientY + 12, 
                "left"      : e.clientX + 12,
                "display"   : "inline-block"
            });

        });

    	// BUTTON ON HOVER
    	$("#buttons").on( "mouseover", ".button", function( e ) {

    		var layerName = $(this).attr("data-name");
			$("#tooltip").text( layerName ).css({
				"top" 		: e.clientY + 12, 
				"left" 		: e.clientX + 12,
				"display" 	: "inline-block"
			});

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
    	$("#buttons").on( "mouseout", "div, label", function( e ) {

			$("#tooltip").text("").css({
				"top" 		: "", 
				"left" 		: "",
				"display" 	: ""
			});

    	});  	

    },

    slidersInit: function () {

    	console.log("Page.slidersInit");

		$(".cube_opacity").slider({
			min 	: 0,
			max 	: 100,
			value 	: 100,
            slide: function( event, ui ) {
                self.opacitySlide( event, ui );
            },
            stop: function( event, ui ) {
                self.opacitySlideStop( event, ui );
            }			
		});
		$(".cube_size").slider({
			min 	: 1,
			max 	: 100,
			value 	: 1,
            slide: function( event, ui ) {
                self.sizeSlide( event, ui );    
            },
            stop: function( event, ui ) {
                self.sizeSlideStop( event, ui );
            }
		});

    }, 

    addCubeButtons: function () {

    	console.log("Page.addCubeButtons");

    	// CUBE NUMBER TRANSLATED TO LETTER
    	var letter = String.fromCharCode( 64 + this.cubeButtonsIndex );

    	$("#buttons").append("<li data-letter='" + letter + "'><label class='off'>" + letter + "</label></li>");
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
    	// row.append("<div class='cube_control cube_opacity'></div><div class='cube_control cube_size'></div>");
        row.append("<div class='cube_control cube_opacity'></div>");

    },

    opacitySlide: function ( e, ui ) {

        console.log("Page.opacitySlide");

        // SHOW TOOLTIP
        var value = ui.value;
        $("#tooltip").text( value ).css({
            "top"       : e.clientY + 12, 
            "left"      : e.clientX + 12,
            "display"   : "inline-block"
        });

    },

    sizeSlide: function ( e, ui ) {

        console.log("Page.sizeSlide");

        // SHOW TOOLTIP
        var value = ui.value + "%";
        $("#tooltip").text( value ).css({
            "top"       : e.clientY + 12, 
            "left"      : e.clientX + 12,
            "display"   : "inline-block"
        });

    }, 

    opacitySlideStop: function ( e, ui ) {

        console.log("Page.opacitySlideStop");

        // GET TARGET CUBE
        var cube = $(e.target).parents("li").attr("data-letter");

        Space.changeOpacity( cube, ui.value / 100 );

    },

    sizeSlideStop: function ( e, ui ) {

        console.log("Page.sizeSlideStop");

        // GET TARGET CUBE
        var cube = $(e.target).parents("li").attr("data-letter");

        Space.changeSize( cube, ui.value / 100 );

    }, 

}