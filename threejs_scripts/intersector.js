var camera, scene, renderer;

var params = {
planeConstant: 1.5,
showHelpers: false
};

var clipPlanes = [];

var clipPlane1 = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 1.5 );
clipPlanes[0] = clipPlane1;
var clipPlane2 = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 1.5 );
clipPlanes[1] = clipPlane2;
var clipPlane3 = new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 1.5 );
clipPlanes[2] = clipPlane3;

init();
render();
function init() {
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.localClippingEnabled = true;
document.body.appendChild( renderer.domElement );
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );
camera.position.set(2.5, 8, 6.5);

camera.up.set( 0, 0, -1 );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // use only if there is no animation loop


var light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1 );
scene.add( light );
scene.add( new THREE.AmbientLight( 0x505050 ) );
//
var group = new THREE.Group();

var loader = new THREE.JSONLoader( );
	loader.load(

        'data/testcsvneurons/celis/dilated/location_4.json',

	function( geometry ){
		
    var material = new THREE.MeshLambertMaterial( {color: "#2263ff", opacity: 1, transparent: true, wireframe: true, clippingPlanes: clipPlanes
		} );

    var object = new THREE.Mesh( geometry, material );
    object.geometry.computeVertexNormals( );

    object.name = "1";

    object.rotation.x =  Math.PI/2;
    
    scene.add( object );

    object.position.set(-3.11726, -2.67137, -6.58039);
    group.add( object );

    scene.add( group );

});
	loader.load(

        '/data/testcsvneurons/mala/eroded/location_4.json',

	function( geometry ){
		
    var material = new THREE.MeshLambertMaterial( {color: 0xE72D4D, opacity: 0.7, transparent: true, wireframe: false
		} );

    var object = new THREE.Mesh( geometry, material );
    object.geometry.computeVertexNormals( );

    object.name = "1";

    object.rotation.x =  Math.PI/2;
    
    scene.add( object );

    object.position.set(-3.11726, -2.67137, -6.58039);
    

});


// helpers
var helpers = new THREE.Group();
//helpers.add( new THREE.AxesHelper( 3 ) );

helpers.add( new THREE.PlaneHelper( clipPlanes[0], 3, 0xff0000 ) );
helpers.add( new THREE.PlaneHelper( clipPlanes[1], 3, 0x00ff00 ) );
helpers.add( new THREE.PlaneHelper( clipPlanes[2], 3, 0x0000ff ) );
helpers.visible = false;
scene.add( helpers );
// gui
var gui = new dat.GUI();

gui.add( params, 'planeConstant', -1.5, 1.5 ).step( 0.001 ).name( 'Clip X' ).onChange( function ( value ) {
	for ( var j = 0; j < clipPlanes.length; j ++ ) {
		clipPlanes[0].constant = value;
	}
	render();
} );
gui.add( params, 'planeConstant', -1.5, 1.5 ).step( 0.001 ).name( 'Clip Y' ).onChange( function ( value ) {
	for ( var j = 0; j < clipPlanes.length; j ++ ) {
		clipPlanes[1].constant = value;
	}
	render();
} );
gui.add( params, 'planeConstant', -1.5, 1.5 ).step( 0.001 ).name( 'Clip Z' ).onChange( function ( value ) {
	for ( var j = 0; j < clipPlanes.length; j ++ ) {
		clipPlanes[2].constant = value;
	}
	render();
} );
gui.add( params, 'showHelpers' ).name( 'show helpers' ).onChange( function ( value ) {
	helpers.visible = value;
	render();
} );
//
window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
render();
}
function render() {
renderer.render( scene, camera );
}