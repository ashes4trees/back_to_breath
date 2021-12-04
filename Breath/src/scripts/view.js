import * as THREE from 'three';
import { mouseCoords } from './mouse';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

const ctxWidth = 900;
const ctxHeight = 506; 
let clock = new THREE.Clock();

class View {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, ctxWidth/ctxHeight, 0.1, 1000);
        const canvas = document.querySelector('#image-canvas');
        this.renderer = new THREE.WebGLRenderer({ canvas });
        
        this.controls = new FirstPersonControls(this.camera, canvas);
        this.controls.lookSpeed = 0.1
        this.controls.movementSpeed = 10
        this.camera.position.set(0, 20, 100);
    
        this.controls.update(clock.getDelta());
        this.camera.position.z = 10;

        this.renderer.setSize(ctxWidth, ctxHeight);

        // const axes = new THREE.AxesHelper(100);
        // this.scene.add(axes);

        const container = document.querySelector('.canvas-container');
        container.appendChild(this.renderer.domElement);

        this.addGround();
    }

    addGround() {
        const geometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true});
        const ground = new THREE.Mesh(geometry, mat);
        this.scene.add(ground);
        ground.rotateX(- Math.PI / 2);
        ground.position.x = 0;
        ground.rotation.x = 1;
        ground.position.y = -5;
    }

    animate() {
        this.controls.update(clock.getDelta());
        requestAnimationFrame(this.animate.bind(this)); 
        this.renderer.render(this.scene, this.camera);
        this.getPos();
    }

    getPos() {
        const ctx = document.querySelector('#image-canvas');
        ctx.addEventListener("mousemove", e => this.mouseCoords(ctx, e));
    }

    mouseCoords(canvas, event) {
        const dimens = canvas.getBoundingClientRect();
        let pos = [];
        let x = event.clientX - dimens.left;
        let y = event.clientY - dimens.top;
        pos.push(x, y);
        // this.camera.rotation.x = pos[0]/ctxHeight - 0.5;
        // this.camera.rotation.y = pos[1]/ctxWidth - 0.5;
    }
}

export default View;
