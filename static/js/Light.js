class Light {

    constructor(pos, color) {

        this.container = new THREE.Object3D();
        this.targetPos = pos
        this.color = color

        this.init()


    }

    init() {

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            specular: 0xffffff,
            shininess: 0.2,
            side: THREE.DoubleSide,
        })

        this.light = new THREE.SpotLight(this.color, 2, 500, Math.PI / 8);
        this.light.position.set(0, 0, 0);


        this.container.add(this.light);


        this.mesh = new THREE.Mesh(this.geometry, this.material);
        let p = this.targetPos
        this.mesh.position.set(p.x, -10, p.z);
        this.container.add(this.mesh);
        this.light.target = this.mesh

    }


    getLight() {
        return this.container;
    }

    set(v) {
        this.mesh.position.set(this.targetPos.x, this.targetPos.y - 100, v)
        this.light.target = this.mesh

    }

    changeColor(color) {
        console.log("zmiana koloru na " + color)
    }

}