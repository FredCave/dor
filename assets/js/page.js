var Page = {

	// cubeIndex: 0, 

    init: function () {

        console.log("Page.init");

        this.startAudio();
        this.startAnimation();

        // Controls.init();

        // LOAD CUBE DATA
        // this.loadCubeData();

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
                console.log( 81, current );
            }, 10000 );
        });
            
    },

    startAnimation: function () {

        console.log("Page.startAnimation");

        this.sceneOne();
        _.delay( this.sceneTwo, 30000 ); // 00:30

    },

    sceneOne: function () {

        console.log("Page.sceneOne");

    }, 

    sceneTwo: function () {

        console.log("Page.sceneTwo");

    }, 

    sceneThree: function () {

        console.log("Page.sceneThree");

    }, 

    sceneFour: function () {

        console.log("Page.sceneFour");

    }, 

    sceneFive: function () {

        console.log("Page.sceneFive");

    }, 

    sceneSix: function () {

        console.log("Page.sceneSix");

    }, 

    sceneSeven: function () {

        console.log("Page.sceneSeven");

    }, 

    sceneEight: function () {

        console.log("Page.sceneEight");

    }, 

}

$(document).on("ready", function(){

    Page.init();

});