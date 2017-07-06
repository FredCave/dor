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

    init : function () {

        console.log("Space.init");

        // SCENE
        this.scene = new THREE.Scene();
        
        // CAMERA
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add( this.camera );
        this.camera.position.set(0,150,400);
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
        this.scene.add( axes );

        this.generateCube();

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
        Page.addCubeButtons();

        // LOOP THROUGH ALL LAYERS
        _.each( thisCube, function( layer ){

            // LAYER = OBJECT
            self.generateLayer( layer );

        });

        this.cubeIndex++;
        while ( this.cubeIndex < 6 ) {
            this.generateCube();
        }

    }, 

    generateLayer : function ( layerData ) {

        console.log("Space.generateLayer");

        console.log( 121, layerData );

        var cubeSize = 5000;

        var dataComplete = true;

        // LOAD IMAGE SRCs INTO ARRAY
        // LOOP THROUGH LAYER OBJECT
        var sources = [];
        for ( var index in layerData ) {
            if ( layerData.hasOwnProperty(index) ) {
                if ( layerData[index] === false ) {
                    // CHECK IF IMAGES ARE LOADED
                    dataComplete = false;
                    console.log( 135, "Data Incomplete" );
                } else {
                    sources.push( layerData[index].url );                    
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
                }));            
            }

            var material = new THREE.MeshFaceMaterial( materialArray );
            var box = new THREE.Mesh( geometry, material );
            this.scene.add( box );

            // ADD BUTTON IN BUTTON WRAPPER
            Page.addLayerButton();

        }

    }, 

}