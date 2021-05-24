$(document).ready(function () {

    var scene = new THREE.Scene();
    var w = window.innerWidth;
    var h = window.innerHeight;

    console.log(w, h)

    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        w / h,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maksymalna renderowana odległość od kamery
    );


    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0066ff);
    renderer.setSize(w, h);

    $("#root").append(renderer.domElement);
    camera.position.set(100, 100, 100)
    camera.lookAt(scene.position);

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)



    var geometryOfBox = new THREE.BoxGeometry(100, 100, 100);
    var geometryOfSphere = new THREE.SphereGeometry(50, 32, 32);
    var geometryOfCone = new THREE.ConeGeometry(5, 20, 32);

    var material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });

    var cube = new THREE.Mesh(geometryOfBox, material);
    var sphere = new THREE.Mesh(geometryOfSphere, material);
    var cone = new THREE.Mesh(geometryOfCone, material);

    var displayed = {
        cube: true,
        sphere: false,
        cone: false,
    }

    $("#cubeButton").on("click", function () {
        toggle(cube, displayed.cube)
        displayed.cube = !displayed.cube
    })

    $("#sphereButton").on("click", function () {
        toggle(sphere, displayed.sphere)
        displayed.sphere = !displayed.sphere
    })

    $("#coneButton").on("click", function () {
        toggle(cone, displayed.cone)
        displayed.cone = !displayed.cone
    })

    function toggle(what, bool) {
        if (bool)
            scene.remove(what)
        else
            scene.add(what);
    }

    scene.add(cube);
    scene.add(sphere);
    scene.remove(sphere)
    console.log(scene)

    $("#slider").on("change", function () {
        console.log($("#slider").val())
        camera.fov = $("#slider").val();
        camera.updateProjectionMatrix();
    })


    function render() {
        cube.rotation.y += 0.01;

        requestAnimationFrame(render);
        console.log("renderuje")
        renderer.render(scene, camera);
    }

    requestAnimationFrame(render)


})

