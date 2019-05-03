

var camera, scene, renderer;
var geometry, material, mesh;
var filename = './retweet_timeline.json';


init();
animate();


var text = readTextFile(filename, function (str) {
    var res = str;
    // console.log(res);

    var split_res = res.split("\n");
    // console.log(split_res.length);
    for (var i = 0; i < split_res.length; i++) {
        
        if (split_res[i]) {
            // console.log(split_res[i]);
            var json_obj = JSON.parse(split_res[i]);
            // console.log(json_obj['id']);
        }
    }

});




function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 10;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    var spheregeometry = new THREE.SphereGeometry( 20, 16, 16 );
    var spherematerial = new THREE.MeshNormalMaterial();
    var sphere = new THREE.Mesh( spheregeometry, spherematerial );
    scene.add( sphere );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
    controls.update();
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


function animate() {

    requestAnimationFrame( animate );

    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.02;
    // mesh.position.x += 0.01;
    renderer.render( scene, camera );

}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == '200') {
            callback(rawFile.responseText);
        } else{
            callback('');
        }
    };
      rawFile.send(null);
}