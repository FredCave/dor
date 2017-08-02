// Space.init();
// Space.animate();

var Space = {

    container   : "",
    scene       : "",
    camera      : "",
    renderer    : "",
    controls    : "",
    cube        : "",
    clock       : new THREE.Clock(), 

    cubeIndex   : 0, 
    axesVisible : false,

    init : function () {

        console.log("Space.init");

        var self = this;

        // SCENE
        this.scene = new THREE.Scene();
        
        // CAMERA
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add( this.camera );
        this.camera.position.set( 0, -100, 400 ); // 0, 150, 400
        this.camera.lookAt( this.scene.position );  

        // RENDERER
        if ( Detector.webgl )
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        else
            this.renderer = new THREE.CanvasRenderer(); 
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.container = document.getElementById( 'space' );
        this.container.appendChild( this.renderer.domElement );

        // EVENTS
        THREEx.WindowResize( this.renderer, this.camera );

        // CONTROLS
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  
        // AXES
        var axes = new THREE.AxisHelper(100);
        axes.name = "axes";
        this.scene.add( axes );
        axes.visible = false;

        // this.generateCube();

    }, 

    animate : function () {

        // console.log("Space.animate");

        var self = this;



        // REDUCE FRAME RATE TO 24 FPS
        setTimeout( function() {

            requestAnimationFrame( function(){
                self.animate();
            } );

        }, 1000 / 24 );

        this.render();       
        this.update();   
        TWEEN.update();     

    }, 

    update : function () {

        // console.log("Space.update");

        this.controls.update();  

    }, 

    render : function () {

        // console.log("Space.render");

        this.renderer.render( this.scene, this.camera );    

    }, 

    generateCube : function () {

        console.log("Space.generateCube");

        var self = this;

        // GET ALL DATA FROM CURRENT CUBE
        var thisCube = Page.cubeData[ this.cubeIndex ];

        // ADD LI IN BUTTON WRAPPER
        Controls.addCubeButtons();

        // LAYER INDEX TO IDENTIFY LAYERS
        var layerIndex = 1;

        // LOOP THROUGH ALL LAYERS
        _.each( thisCube, function( layer ){

            // LAYER = OBJECT
            self.generateLayer( layer, layerIndex );
            layerIndex++;

        });

        // ADD CUBE CONTROLS AT END OF ROW
        Controls.addControls();

        this.cubeIndex++;
        if ( this.cubeIndex < 6 ) {
            this.generateCube();
        } else if ( this.cubeIndex === 6  ) {

            Controls.slidersInit();

        }

    }, 

    generateLayer : function ( layerData ) {

        console.log("Space.generateLayer");

        var cubeSize = 5000, 
            dataComplete = true;

        // SORT THROUGH DATA
            // LOAD IMAGE SRCs INTO ARRAY
            // STORE LAYER NAME TO ADD TO BUTTON

        // LOOP THROUGH LAYER OBJECT
        var sources = [], 
            layerName, 
            layerId;
        for ( var index in layerData ) {
            
            if ( layerData.hasOwnProperty(index) ) {
                if ( layerData[index] === false ) {
                    // CHECK IF IMAGES ARE LOADED
                    dataComplete = false;
                    console.log( 135, "Data Incomplete" );
                } else if ( index === "name" ) {
                    layerName = layerData[index];
                } else if ( index === "ID" ) {
                    layerId = layerData[index];
                } else {
                    sources.push( layerData[index].sizes.extralarge );                    
                }
            }
        }

        if ( dataComplete ) {

            var geometry = new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize );   
        
            var materialArray = [];
            for (var i = 0; i < 6; i++) {
                
                materialArray.push( new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture( sources[i] ),
                    side: THREE.BackSide,
                    transparent: true, 
                    opacity: 0 
                }));            
            }

            var material = new THREE.MeshFaceMaterial( materialArray );
            var box = new THREE.Mesh( geometry, material );

            // SET NAME
            box.name = layerId;
            this.scene.add( box );
            box.rotateY(180);

            // ADD BUTTON IN BUTTON WRAPPER
            Controls.addLayerButton( layerName );

        }

    }, 

    hideLayer : function ( id ) {

        console.log("Space.hideLayer", id );

        var box = this.scene.getObjectByName( id );
        // LOOP THROUGH SIDES OF CUBE
        _.each( box.material.materials, function ( material ) {
            material.opacity = 0;
        });

    },

    showLayer: function ( id ) {

        console.log("Space.showLayer", id );

        var box = this.scene.getObjectByName( id );
        // LOOP THROUGH SIDES OF CUBE
        _.each( box.material.materials, function ( material ) {
            material.opacity = 1;
        });

    },

    fadeInLayer: function ( name, time ) {

        console.log("Space.fadeInLayer", name, time );

        // GET LAYER DATA
        var cube = name[0].charCodeAt(0) - 65;

        console.log( 225, cube);

        var layer = _.findWhere( Page.cubeData[cube],{ ID:name } );

        console.log( 229, Page.cubeData[cube] );

        // GENERATE LAYER
        this.generateLayer( layer );
        // FADE IN 
        var generatedCube = this.scene.getObjectByName( name );
        for ( var i = 0; i < generatedCube.material.materials.length; i++ ) {
            new TWEEN.Tween( generatedCube.material.materials[i] ).to({ opacity: 1 }, time ).start();
        }

    },

    fadeOutLayer: function ( name, time ) {

        console.log("Space.fadeOutLayer", name, time );

        var layer = this.scene.getObjectByName( name ),
            self = this;

        for ( var i = 0; i < layer.material.materials.length; i++ ) {
            new TWEEN.Tween( layer.material.materials[i] ).to({ opacity: 0 }, time ).start();
        }
        // AFTER FADE OUT: REMOVE LAYER FROM SCENE
        _.delay( function(){
            self.scene.remove( self.scene.getObjectByName(name) );
            console.log("Layer removed from scene.");
        }, time + 1000 );

    },

    hideCube: function ( char ) {

        console.log("Space.hideCube", char );

        var layers = this.scene.children;
        _.each( layers, function( layer ){
            // IF LAYER NAME CONTAINS CHAR
            if ( layer.name.indexOf( char ) > -1 ) {
                _.each( layer.material.materials, function ( material ) {
                    material.opacity = 0;
                });
            }
        });

    }, 

    showCube: function ( char ) {

        console.log("Space.showCube", char );

        var layers = this.scene.children;
        _.each( layers, function( layer ){
            // IF LAYER NAME CONTAINS CHAR
            if ( layer.name.indexOf( char ) > -1 ) {
                _.each( layer.material.materials, function ( material ) {
                    material.opacity = 1;
                });
            }
        });

    }, 

    toggleAxes: function () {

        console.log("Space.toggleAxes");

        var axes = this.scene.getObjectByName( "axes" );

        if ( this.axesVisible ) {
            axes.visible = false;
            this.axesVisible = false;
        } else {
            axes.visible = true;
            this.axesVisible = true;            
        }

    },

    changeOpacity: function ( char, value ) {

        console.log("Space.changeOpacity", char, value);

        var layers = this.scene.children;
        _.each( layers, function( layer ){
            // IF LAYER NAME CONTAINS CHAR
            if ( layer.name.indexOf( char ) > -1 ) {
                _.each( layer.material.materials, function ( material ) {
                    // IF VALUE IS NOT ZERO: CHANGE ONLY VISIBLE LAYER
                    if ( value > 0 && material.opacity > 0 ) {
                        material.opacity = value;
                    }
                });
            }
        });

    },

    changeSize: function ( char, value ) {

        console.log("Space.changeSize", char, value );

        var layers = this.scene.children;
        // INVERT VALUE (?) – CLOSER TO 0 IS BIGGER
        value = ( value + 1 ) * 5000;
        _.each( layers, function( layer ){
            // IF LAYER NAME CONTAINS CHAR
            if ( layer.name.indexOf( char ) > -1 ) {
                console.log( 292, layer );
                layer.geometry.depth = value;
                layer.geometry.height = value;
                layer.geometry.width = value;
            }
        });

    },   

    rotateLayer: function ( layerId ) {

        console.log("Space.rotateLayer", layerId);

        // var layer = this.scene.getObjectByName(layerId);

        // var tween = new TWEEN.Tween(layer.rotation)
        //     .to({ y: "-" + Math.PI / 2 }, 30000 ) // relative animation
        //     .start();

    },

    layerPhase: function ( left, up ) {

        // console.log("Space.layerPhase", left, up );

    //     // CALLED FROM ORBITCONTROLS.JS

    //     // APPLIES TO ONLY ONE LAYER
    //     // var layerId = Page.currentRandomLayers[0], 
    //     //     layer = this.scene.getObjectByName(layerId);

    //     // console.log( 358, layerId, layer );
    //     // layer.rotateY( left );

    }

}
