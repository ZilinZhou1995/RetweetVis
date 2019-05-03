
var count = 0;
var camera, scene, renderer, raycaster;
var geometry, material, mesh;
var filename = './retweet_timeline.json';
var mesh_array_main;
var lines_geometry;
var mouse = new THREE.Vector2(), INTERSECTED;   


function readTextFile(file, callback, callback2) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == '200') {
            callback(rawFile.responseText, callback2);
        } else{
            callback('', callback2);
        }
    };
      rawFile.send(null);
}



function process_str(str, callback) {
    var res = str;
    // console.log(res);

    var split_res = res.split("\n");
    // console.log(split_res.length);
    for (var i = 0; i < split_res.length; i++) {
        
        if (split_res[i]) {
            // console.log(split_res[i]);
            var json_obj = JSON.parse(split_res[i]);
            console.log(json_obj['id']);
            callback(json_obj, i, split_res);
        }
    }
}

function create_sphere_from_jsonobj(json_obj, index, split_res) {
    var rand_num = Math.floor(Math.random() * 5);
    var spheregeometry = new THREE.SphereGeometry( rand_num, 16, 16 );
    // var spherematerial = new THREE.MeshNormalMaterial();
    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // load a resource
    loader.load(
        // resource URL
        '../textures/zhangbowen.jpg',

        // onLoad callback
        function ( texture ) {
            // console.log("???");
            // in this example we create the material when the texture is loaded
            var material = new THREE.MeshBasicMaterial( {
                map: texture
            } );
            var sphere = new THREE.Mesh( spheregeometry, material );
            sphere.position.x = 8 * index;
            lines_geometry.vertices.push(sphere.position);
            sphere.name = index;
            sphere.json_obj = json_obj;

            scene.add( sphere );
            count = count + 1;
            console.log(count);
            if (split_res.length - 1 == count) {
                console.log("-  ");
                var line_material = new THREE.LineBasicMaterial( {
                    color: 0xffffff,
                    linewidth: 10,
                    linecap: 'round', //ignored by WebGLRenderer
                    linejoin:  'round' //ignored by WebGLRenderer
                } );
                var line = new THREE.Line( lines_geometry, line_material );
                scene.add( line );
                renderer.render( scene, camera );
            }
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
    
    
    
}







init();
animate();


function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 50;
    // camera.position.x = 10;
    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    // material = new THREE.MeshNormalMaterial();
    material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // var spheregeometry = new THREE.SphereGeometry( 2, 16, 16 );
    // var spherematerial = new THREE.MeshNormalMaterial();
    // var sphere = new THREE.Mesh( spheregeometry, spherematerial );
    // scene.add( sphere );



    // Add sphere and line

    lines_geometry = new THREE.Geometry();
    readTextFile(filename, process_str, create_sphere_from_jsonobj);

    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
    controls.update();
    window.addEventListener( 'resize', onWindowResize, false );
    var light = new THREE.DirectionalLight( 0xffffff, 0.35 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    raycaster = new THREE.Raycaster();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function render() {
    renderer.render( scene, camera );

    // find intersections

    raycaster.setFromCamera( mouse, camera );
    
    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        var targetDistance = intersects[ 0 ].distance;
        // camera.focusAt( targetDistance ); // using Cinematic camera focusAt method
        if ( INTERSECTED != intersects[ 0 ].object ) {
            // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            // INTERSECTED.material.emissive.setHex( 0xff0000 );
            console.log(INTERSECTED);
        }
    } else {
        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        // console.log(INTERSECTED);
        INTERSECTED = null;
    }
}


function animate() {

    requestAnimationFrame( animate );

    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.02;
    // mesh.position.x += 0.01;
    camera.position.x += 0.01;
    renderer.render( scene, camera );
    render();

}


