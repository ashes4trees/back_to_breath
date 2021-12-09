import * as THREE from 'three';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TextureLoader } from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky'; 
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import Tree from './tree';
import Rock from './rock';
import { Mesh } from 'three';
// import Misc from './misc';
import Leaf from './leaf';
import { DirectionalLight } from 'three';


const leafClock = new THREE.Clock();
// const leafVector = new THREE.Vector3(10, 5, 10)
const controlsClock = new THREE.Clock();

class View {
    constructor() {
        this.scene = new THREE.Scene();
        // this.scene.backgwround = new THREE.Color(0x6FA8DC);
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.01, 1000);
        this.camera.position.set(0, 100, 0);

        const canvas = document.querySelector('#canvas1');
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.renderer.physicallyCorrectLights = true;
        // this.renderer.setClearColor(0x6FA8DC, .85);

        
        this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                if (this.controls.enabled === true) {
                    this.controls.enabled = false 
                } else {
                        this.controls.enabled = true;
                    }
            }
        })
        this.controls.lookSpeed = 0.1;
        this.controls.movementSpeed = 100;
        this.controls.update(controlsClock.getDelta());
       

        const geometry = new THREE.PlaneBufferGeometry(5000, 5000, 100, 100);
       

        // add ground
        const texture = new THREE.TextureLoader().load('./src/assets/grass_path.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(32, 32);
        const mat = new THREE.MeshLambertMaterial({ map: texture });
        this.ground = new THREE.Mesh(geometry, mat);
        this.scene.add(this.ground);
        this.ground.rotateX(- Math.PI / 2);
        this.ground.position.x = 0;
        this.ground.position.y = 0;
        this.ground.rotation.z = 0;
        this.ground.receiveShadow = true;
        this.ground.castShadow = true;
        this.ground.updateMatrixWorld(true);

         //  add hills
        const peak = 90;
        const slope = 300;
        const vertices = this.ground.geometry.attributes.position.array;
        for (let i = 0; i <= vertices.length; i += 3) {
            vertices[i + 2] = peak * perlin.get(vertices[i] / slope,
                vertices[i + 1] / slope
            );
        }
        this.ground.geometry.attributes.position.needsUpdate = true;
        this.ground.geometry.computeVertexNormals();
        this.addLight();
        this.addSky();
        this.addTrees();
        this.addRocks();
        

        // keep camera close to ground
        const raycaster = new THREE.Raycaster();
        raycaster.set(this.camera.position, new THREE.Vector3(0, -1, 0))
        const intersects = raycaster.intersectObject(this.ground);
        this.camera.position.y = intersects[0].point.y + 50;

        // add fog
        const fogColor = new THREE.Color(0xF2B295);
        this.scene.fog = new THREE.Fog(fogColor, 50, 1000);

        // const axes = new THREE.AxesHelper(100);
        // this.scene.add(axes);

        const container = document.querySelector('.canvas-container');
        container.appendChild(this.renderer.domElement);

        const x = (Math.random() * 200) - 100;
        const y = Math.random() * (200 - 0);
        const z = (Math.random() * 200) - 100;

        const shape = new THREE.CircleBufferGeometry(5, 2, 0, 360);
        const tex = new THREE.TextureLoader().load('./src/assets/leaf.jpg');
        const mats = new THREE.MeshStandardMaterial({ map: tex });
        this.leaf = new THREE.Mesh(shape, mats);
        this.leaf.name = 'leaf';
        this.leaf.position.set(0, 0, -100);
        this.scene.add(this.leaf);
        
    }


    addLight() {
        const light = new THREE.AmbientLight(0xfff9d8, 0.5);
        const sunLight = new THREE.DirectionalLight(0xfff9d8, 1);
        sunLight.position.set(0, 20, -500);
        sunLight.castShadow = true;

        this.scene.add(light);
        this.scene.add(sunLight);
    }


    addTrees() {
        const scene = this.scene;
        const ground = this.ground;
        for (let i = 1; i < 15; i++) {
            new Tree(scene, ground);
        }
    }

    addRocks() {
        const scene = this.scene;
        const ground = this.ground;
        for (let i = 1; i < 15; i++) {
            new Rock(scene, ground);
        }
    }

            
            
        addSky() {
            const sky = new Sky();
            sky.scale.setScalar(45000);
            this.scene.add(sky);
            
            const sun = new THREE.Vector3();
            
            const effects = {
                turbidity: 5.5,
                rayleigh: 3,
                mieCoefficient: 0.005,
                mieDirectionalG: 0.7,
                elevation: 1.5,
                azimuth: 180,
                exposure: this.renderer.toneMappingExposure
            };
            
            const renderer = this.renderer;
            const scene = this.scene;
            const camera = this.camera;
            
            const uniforms = sky.material.uniforms;
            uniforms['turbidity'].value = effects.turbidity;
            uniforms['rayleigh'].value = effects.rayleigh;
            uniforms['mieCoefficient'].value = effects.mieCoefficient;
            uniforms['mieDirectionalG'].value = effects.mieDirectionalG;
            
            const phi = THREE.MathUtils.degToRad(90 - effects.elevation);
            const theta = THREE.MathUtils.degToRad(effects.azimuth);
            
            sun.setFromSphericalCoords(1, phi, theta);
            
            uniforms['sunPosition'].value.copy(sun);
            
            renderer.toneMappingExposure = effects.exposure;
            
            
        }
        
        animate() {
            this.leaf.translateY(leafClock.getDelta() * 10);
            this.leaf.rotateY(.25);
            this.controls.update(controlsClock.getDelta());
            requestAnimationFrame(this.animate.bind(this)); 
            this.renderer.render(this.scene, this.camera);
        }

}

export default View;
