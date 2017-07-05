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

    init: function () {

        console.log("Space.init");

//     // SCENE
//     scene = new THREE.Scene();
//     // CAMERA
//     var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
//     var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
//     camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
//     scene.add(camera);
//     camera.position.set(0,150,400);
//     camera.lookAt(scene.position);  
//     // RENDERER
//     if ( Detector.webgl )
//         renderer = new THREE.WebGLRenderer( {antialias:true} );
//     else
//         renderer = new THREE.CanvasRenderer(); 
//     renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
//     container = document.getElementById( 'ThreeJS' );
//     container.appendChild( renderer.domElement );
//     // EVENTS
//     THREEx.WindowResize(renderer, camera);
//     THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
//     // CONTROLS
//     controls = new THREE.OrbitControls( camera, renderer.domElement );
    
//     ////////////
//     // CUSTOM //
//     ////////////
    
//     var boxSize = 20000;

//     // axes
//     var axes = new THREE.AxisHelper(100);
//     scene.add( axes );
    
//     var imagePrefix = "canary copy/";
//     var directions  = ["pos-x", "neg-x", "pos-y", "neg-y", "pos-z", "neg-z"];
//     var imageSuffix = ".png";
//     var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );   
    
//     var materialArray = [];
//     for (var i = 0; i < 6; i++)
//         materialArray.push( new THREE.MeshBasicMaterial({
//             map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
//             side: THREE.BackSide,
//             transparent: true,  
//         }));
//     var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
//     var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
//     scene.add( skyBox );

//     // ADD BOX
//     var imagePrefixTwo = "box_2/";
//     var directionsTwo  = ["pos-x", "neg-x", "pos-y", "neg-y", "pos-z", "neg-z"];
//     var imageSuffixTwo = ".jpg";
//     var skyGeometryTwo = new THREE.CubeGeometry( boxSize, boxSize, boxSize );   
    
//     var materialArrayTwo = [];
//     for (var i = 0; i < 6; i++)
//         materialArrayTwo.push( new THREE.MeshBasicMaterial({
//             map: THREE.ImageUtils.loadTexture( imagePrefixTwo + directionsTwo[i] + imageSuffixTwo),
//             side: THREE.BackSide
//         }));
//     var skyMaterialTwo = new THREE.MeshFaceMaterial( materialArrayTwo );
//     var skyBoxTwo = new THREE.Mesh( skyGeometryTwo, skyMaterialTwo );
//     scene.add( skyBoxTwo );

//     console.log( 131, skyBoxTwo, scene );

    },

    animate: function () {

        console.log("Space.animate");

//     // REDUCE FRAME RATE TO 30 FPS
//     setTimeout( function() {

//         requestAnimationFrame( animate );
//         render();      
//         update();

//     }, 1000 / 30 );

//     // requestAnimationFrame( animate );
//     // render();       
//     // update();

    },

    update: function () {

        console.log("Space.update");

        // controls.update();  

    },

    render: function () {

        console.log("Space.render");

        // renderer.render( scene, camera );    

    }

}

