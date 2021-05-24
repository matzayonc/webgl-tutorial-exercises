class Game {
    constructor(){

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
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('gfx/tekstura1.jpg'),
            transparent: true,
            opacity: 0.8,

        })
            
        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()

        $(document).mousedown(this.raycast)

        $(document).keydown()

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

        this.clicks()

        this.map()
    }

    map(){

        for(let i of this.tab){
            let mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.set(i[0], i[1], i[2]);
            this.scene.add(mesh);
        }
    }

    raycast(e){
        game.mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
        game.mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;

        game.raycaster.setFromCamera(game.mouseVector, game.camera);

        var intersects = game.raycaster.intersectObjects(game.scene.children);
        console.log(intersects.length, intersects[0])

        if(intersects.length > 0)
            game.selected = intersects[0].object
        else
            game.selected = null
    }

    render(){

        const delta = 0.02

        console.log(this.direction)

        if(this.selected){
            if(this.direction == 'left')
                this.selected.position.x +=  10
            if(this.direction == 'right')
                this.selected.position.x -=  10            
            if(this.direction == 'up')
                this.selected.position.y +=  10
            if(this.direction == 'down')
                this.selected.position.y -=  10

            this.direction = 'none'
        }
        else{
            if(this.down && this.direction == 'left'){
                this.camera.position.x = 100 * Math.sin(this.angle.x += delta);
                this.camera.position.z = 100 * Math.cos(this.angle.z += delta);
            }
            else if(this.down && this.direction == 'right'){
                this.camera.position.x = 100 * Math.sin(this.angle.x -= delta);
                this.camera.position.z = 100 * Math.cos(this.angle.z -= delta);
            }
        }



        //console.log(this.selected != null ? this.selected.position.x:false)

        this.camera.lookAt(this.scene.position)

        //console.log("renderuje")
        this.renderer.render(this.scene, this.camera);
    }

    clicks(){
        $(document).mousedown(e => this.raycast)
        $(document).keydown(e => {

            console.log(e.keyCode)

            this.down = true

            if(e.keyCode == 37)
                this.direction = 'right'        
            else if(e.keyCode == 39)
                this.direction = 'left'            
            else if(e.keyCode == 38)
                this.direction = 'up'            
            else if(e.keyCode == 40)
                this.direction = 'down'
            else if(e.keyCode == 41)
                this.selected = null

        })
        $(document).keyup(e => {this.down = false})
    }

    move(e){


        console.log(e.keyCode, this.direction)
    }

}

function render(){
    game.render()
    requestAnimationFrame(render)
}


$(document).ready(function () {
    game = new Game
    requestAnimationFrame(render)

})
