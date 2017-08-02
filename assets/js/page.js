var Page = {

    currentRandomLayers: [], 

    init: function () {

        console.log("Page.init");

        // LOAD CUBE DATA
        // THIS CALLS STARTAUDIO + STARTANIMATIONS
        this.loadCubeData();

        // Controls.init();

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

        this.startAudio();
        this.startAnimation();

    },

    startAudio: function () {

        console.log("Page.startAudio");

        var self = this;

        // AUDIO LENGTH = 4:23 (263000)

        $("#main_audio").prop("volume", 0.1);
        $("#main_audio")[0].play();
        $("#main_audio").animate({
            volume : 1
        }, 1000 );

        // START LOOP AFTER DEFINED TIME (4:20)
        setTimeout( function(){

            self.startAudioLoop();

        }, 260000 );

    },

    startAudioLoop: function () {

        console.log("Page.startAudioLoop");

        // FADE IN FIRST
        $("#loop_audio_1").prop("volume", 0.1);
        $("#loop_audio_1")[0].play();
        $("#loop_audio_1").animate({
            volume : 1
        }, 10000, function(){
            var current = 2;
            // PLAY NEXT
            $("#loop_audio_" + current)[0].play();
            // START LOOP
            setInterval( function(){
                // TOGGLE AUDIOS
                current === 1 ? current = 2 : current = 1;
                $("#loop_audio_" + current)[0].play();
            }, 10000 );
        });
            
    },

    startAnimation: function () {

        console.log("Page.startAnimation");

        this.sceneOne();                    // 00:00
        _.delay( this.sceneTwo,    30000 ); // 00:30
        _.delay( this.sceneThree,  70000 ); // 01:10
        _.delay( this.sceneFour,  105000 ); // 01:45
        _.delay( this.sceneFive,  135000 ); // 02:15
        _.delay( this.sceneSix,   170000 ); // 02:50
        _.delay( this.sceneSeven, 210000 ); // 03:30
        _.delay( this.sceneEight, 251000 ); // 04:11
        // _.delay( this.sceneEight, 1000 ); 

    },

    sceneOne: function () {

        console.log("Page.sceneOne");

        // A2 APPEARS
        Space.fadeInLayer( "A2", 2000 );
        // START RANDOM FADING
        Page.randomFade( "A,B,C" );

    }, 

    sceneTwo: function () {

        console.log("Page.sceneTwo");

        // B2 APPEARS
        Space.fadeInLayer( "B2", 4000 );
        Space.fadeOutLayer( "A2", 8000 );

    }, 

    sceneThree: function () {

        console.log("Page.sceneThree");

        // C2 APPEARS
        Space.fadeInLayer( "C2", 8000 );
        Space.fadeOutLayer( "B2", 8000 );

    }, 

    sceneFour: function () {

        console.log("Page.sceneFour");

        // D1 APPEARS
        Space.fadeInLayer( "D1", 8000 );
        Space.fadeOutLayer( "C2", 8000 );
        // FADE OUT ALL CURRENT RANDOM LAYERS
        Page.stopRandomFade();
        // RANDOM FADING
        Page.randomFade( "D,E" );

    }, 

    sceneFive: function () {

        console.log("Page.sceneFive");

        // E2 APPEARS
        Space.fadeInLayer( "E2", 10000 );
        Space.fadeOutLayer( "D1", 10000 );

    }, 

    sceneSix: function () {

        console.log("Page.sceneSix");

        // D AND E LAYERS FADE OUT
        Page.stopRandomFade();
        Space.fadeOutLayer( "E2", 5000 );

        // ALL F LAYERS COME IN
        for ( var i = 1; i < 10; i++ ) {
            Space.fadeInLayer( "F"+i, ( Math.random() * 5000 ) + 3000 );
        }

    }, 

    sceneSeven: function () {

        console.log("Page.sceneSeven");

        // SCENE LASTS 41 SECONDS
        // F LAYERS FADE OUT – F8 FADES OUT FIRST
        // F4 (STONE) STAYS LAST
        Space.fadeOutLayer( "F8", 5000 );
        _.delay( Space.fadeOutLayer( "F1", ( Math.random() * 5000 ) + 3000 ),  5000 );
        _.delay( Space.fadeOutLayer( "F2", ( Math.random() * 5000 ) + 3000 ), 10000 );
        _.delay( Space.fadeOutLayer( "F3", ( Math.random() * 5000 ) + 3000 ), 15000 );
        _.delay( Space.fadeOutLayer( "F5", ( Math.random() * 5000 ) + 3000 ), 20000 );
        _.delay( Space.fadeOutLayer( "F6", ( Math.random() * 5000 ) + 3000 ), 25000 );
        _.delay( Space.fadeOutLayer( "F7", ( Math.random() * 5000 ) + 3000 ), 30000 );
        _.delay( Space.fadeOutLayer( "F9", ( Math.random() * 5000 ) + 3000 ), 35000 );

    }, 

    sceneEight: function () {

        console.log("Page.sceneEight");

        // F4 FADES OUT
        // G1 APPEARS
        Space.fadeOutLayer( "F4", 10000 );
        Space.fadeInLayer( "G1", 10000 );

    }, 

    randomFade: function ( cubes ) {

        console.log("Page.randomFade");

        var cubeArray = cubes.split(","),
            layerArray = [],
            temples = ["A2","B2","C2","D1","E2"];

        // COLLECT ALL AVAILABLE LAYERS IN ONE ARRAY
        // LOOP THROUGH CUBES
        for ( var i = 0; i < cubeArray.length; i++ ) {
            var index = cubeArray[i].charCodeAt(0) - 65
            // LOOP THROUGH LAYERS
            _.each( Page.cubeData[index], function( layer ){
                // IF NOT A TEMPLE
                if ( temples.indexOf( layer.ID ) === -1 ) {
                    // ADD TO ARRAY
                    layerArray.push( layer );
                }
            });
        }

        function randomIteration () {

            console.log("Page.randomFade.randomIteration");

            // FADE IN THREE RANDOM LAYERS FROM ARRAY
            for ( var i = 0; i < 3; i++ ) {
                var randIndex = Math.floor( Math.random() * layerArray.length ), 
                    randLayer = layerArray[randIndex].ID;
                // IF NOT ALREADY FADED IN
                if ( Page.currentRandomLayers.indexOf( randLayer ) === -1 ) {
                    // FADE IN WITH RANDOM DURATION
                    var time = ( Math.random() * 10000 ) + 5000;
                    Space.fadeInLayer( randLayer, time );
                    // IF LAST IN BATCH: PHASING
                    if ( i === 2 ) {
                        Space.rotateLayer( randLayer );
                    }
                    // ADD TO CURRENTRANDOMLAYERS ARRAY
                    Page.currentRandomLayers.push( randLayer );
                } else {
                    console.log("Already faded in.");
                }
            }

            // FADE OUT AFTER RANDOM DELAY
            _.delay( function(){
                // LOOP THROUGH CURRENT FADED IN
                for ( var i = 0; i < Page.currentRandomLayers.length; i++ ) {
                    var layer = Page.currentRandomLayers[i];
                    // FADE OUT
                    Space.fadeOutLayer( layer, ( Math.random() * 5000 ) + 5000 );
                    // REMOVE FROM CURRENTRANDOMLAYERS ARRAY
                    Page.currentRandomLayers.splice( i, 1 );
                }
            }, 10000 );

        }

        randomIteration();

        // LOOPS OF 20 SECONDS
        this.interval = setInterval( function(){
            randomIteration();
        }, 20000 );

    }, 

    stopRandomFade: function () {

        console.log("Page.stopRandomFade");

        // STOP INTERVAL
        clearInterval( this.interval );
        console.log("Interval cleared.");

        // FADE OUT ALL CURRENT RANDOM LAYERS
        for ( var i = 0; i < Page.currentRandomLayers.length; i++ ) {
            var layer = Page.currentRandomLayers[i];
            // FADE OUT
            Space.fadeOutLayer( layer, ( Math.random() * 5000 ) + 5000 );
            // REMOVE FROM CURRENTRANDOMLAYERS ARRAY
            Page.currentRandomLayers.splice( i, 1 );
        }

    }

}

$(document).on("ready", function(){

    Page.init();

});