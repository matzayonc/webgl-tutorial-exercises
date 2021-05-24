$(document).ready(function () {

    var scene = new THREE.Scene();
    var w = window.innerWidth;
    var h = window.innerHeight;

    console.log(w, h)

    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 10000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0066ff);
    renderer.setSize(w, h);

    $("#root").append(renderer.domElement);
    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position);

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)



    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('gfx/tekstura1.jpg'),
        transparent: true,
        opacity: 0.8,

    })

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    function render() {
        cube.rotation.y += 0.01;

        requestAnimationFrame(render);
        console.log("renderuje")
        renderer.render(scene, camera);
    }

    requestAnimationFrame(render)


})

