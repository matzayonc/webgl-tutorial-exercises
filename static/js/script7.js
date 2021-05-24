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
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.9
    });

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const pos = [
        { x: 100, y: 0, z: 0 },
        { x: 0, y: 100, z: 0 },
        { x: 0, y: 0, z: 100 }
    ]

    var mode = 0

    $("#button").on("click", function () {
        mode++
        mode < pos.length ? false : mode = 0
    })

    function render() {
        cube.rotation.y += 0.01;


        camera.position.set(pos[mode].x, pos[mode].y, pos[mode].z)
        camera.lookAt(scene.position)

        requestAnimationFrame(render);
        console.log("renderuje")
        renderer.render(scene, camera);
    }

    requestAnimationFrame(render)


})

