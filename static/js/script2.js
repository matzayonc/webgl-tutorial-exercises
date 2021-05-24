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



    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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

