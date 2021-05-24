class Game {
    constructor() {

        this.scene = new THREE.Scene();
        const w = $(window).width()
        const h = $(window).height()

        console.log(w, h)

        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 10000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0066ff);
        this.renderer.setSize(w, h);

        $("#root").append(this.renderer.domElement);
        this.camera.position.set(0, 50, 100)
        this.camera.lookAt(this.scene.position);

        var axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)

        this.geometry = new THREE.BoxGeometry(9, 9, 9);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            specular: 0xffffff,
            shininess: 0.2,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("/gfx/cardboard.jpg"),
        })

        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()


        this.angle = {
            z: 0,
            x: 0
        }

        this.direction = 'none'
        this.down = false

        this.selected = null
        this.tab = [
            [-10, 0, -10],
            [-10, 0, 0],
            [-10, 0, 10],
            [0, 0, -10],
            [0, 0, 0],
            [0, 0, 10],
            [10, 0, -10],
            [10, 0, 0],
            [10, 0, 10],
        ]
        this.light = new Light({ x: 0, y: 0, z: 10 }, 0xffffff)
        let container = this.light.getLight()
        container.position.set(0, 20, 0)
        console.log(container)
        this.scene.add(container)

        this.map()
        this.initUi()

        this.clock = new THREE.Clock();

    }

    initUi() {

        let control = $('<div></div>')
        control.attr('id', 'control')
        control.appendTo($('body'))

        let range = $('<input></input>')
        range.attr('type', 'range')
        range.attr('id', 'range')
        range.appendTo(control)
        range.on('change', () => { game.changeLight($('#range').val()) })
    }

    changeLight(v) {
        this.light.set(v - 50)
    }

    map() {

        for (let i of this.tab) {
            let mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.set(i[0], i[1], i[2]);
            this.scene.add(mesh);
        }
    }


    render() {

        const delta = this.clock.getDelta() / 2

        this.camera.position.x = 100 * Math.sin(this.angle.x -= delta);
        this.camera.position.z = 100 * Math.cos(this.angle.z -= delta);

        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera);
    }

}

function render() {
    game.render()
    requestAnimationFrame(render)
}


$(document).ready(function () {
    game = new Game
    requestAnimationFrame(render)

})