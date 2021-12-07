import * as THREE from 'three';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TextureLoader } from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky'; 
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// import Tree from './tree';



// import { DirectionalLight } from 'three';

// const ctxWidth = 900;
// const ctxHeight = 506; 
let clock = new THREE.Clock();

class View {
    constructor() {
        this.scene = new THREE.Scene();
        // this.scene.backgwround = new THREE.Color(0x6FA8DC);
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 100, 0);
        

        this.mixers = [];

        const canvas = document.querySelector('#canvas1');
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // this.renderer.physicallyCorrectLights = true;
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
        this.controls.movementSpeed = 10;
        this.controls.update(clock.getDelta());
       

        const geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
       

        // add ground
        const texture = new THREE.TextureLoader().load('assets/grass_path.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(128, 128);
        const mat = new THREE.MeshLambertMaterial({ map: texture });
        this.ground = new THREE.Mesh(geometry, mat);
        this.scene.add(this.ground);
        this.ground.rotateX(- Math.PI / 2);
        this.ground.position.x = 0;
        this.ground.position.y = 0;
        this.ground.rotation.z = 0;
        this.ground.receiveShadow = true;
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

        const raycaster = new THREE.Raycaster();
        raycaster.set(this.camera.position, new THREE.Vector3(0, -1, 0))
        const intersects = raycaster.intersectObject(this.ground);
        this.camera.position.y = intersects[0].point.y + 50;

        const fogColor = new THREE.Color(0xF2B295);
        this.scene.fog = new THREE.Fog(fogColor, 1, 1000);

        const axes = new THREE.AxesHelper(100);
        this.scene.add(axes);

        const container = document.querySelector('.canvas-container');
        container.appendChild(this.renderer.domElement);

        
        this.addLight();
        this.addSky();
        // this.addSun();
        this.addTree();
        this.addApple();
        this.addRabbit(); 
    }


    addLight() {
        const light = new THREE.AmbientLight(0xfff9d8, 0.5);
        // const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6 );
        // light.position.set(0, 0, 0);

        const sunLight = new THREE.DirectionalLight(0xfff9d8, 1);
        sunLight.position.set(0, 20, -500);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.Height = 1024 * 2;
        sunLight.shadow.mapSize.width = 512; // default
        sunLight.shadow.mapSize.height = 512; // default
        sunLight.shadow.camera.near = 0.5; // default
        sunLight.shadow.camera.far = 500; // default

        this.scene.add(light);
        this.scene.add(sunLight);
    }
   
    addTree() {
        const loader = new GLTFLoader();
        const scene = this.scene;
        const ground = this.ground;
     
        loader.load('assets/trees/tree1.glb', function (gltf) {
            let tree = gltf.scene;
            tree.scale.set(20, 20, 20);
            tree.position.set(100, 200, 100);
            tree.castShadow = true;
            scene.add(tree);
            const raycaster = new THREE.Raycaster();
            raycaster.set(tree.position, new THREE.Vector3(0, -1, 0))
            const intersects = raycaster.intersectObject(ground);
            tree.position.y = intersects[0].point.y - 0.2;
        }, undefined, function (error) {

            console.error(error);
        });
        
    }

    addApple() {
        const loader = new GLTFLoader();
        const scene = this.scene;
        const mixers = this.mixers;
        loader.load('assets/apple.glb', function (gltf) {
            let apple = gltf.scene;
            apple.scale.set(20, 20, 20);
            apple.position.set(200, 0, 400);
            apple.castShadow = true;
            const appleMixer = new THREE.AnimationMixer(apple);
            mixers.push(appleMixer);
            gltf.animations.forEach((clip) => {
                appleMixer.clipAction(clip).play();
            });
            scene.add(apple);

        }, undefined, function (error) {

            console.error(error);
     });
    }

    addRabbit() {
        const loader = new GLTFLoader();
        const scene = this.scene;
        const mixers = this.mixers;
        loader.load('assets/rabbit.glb', function (gltf) {
            let rabbit = gltf.scene;
            rabbit.scale.set(2, 2, 2);
            rabbit.position.set(100, 0, -100);
            rabbit.castShadow = true;
            const rabbitMixer = new THREE.AnimationMixer(rabbit);
            mixers.push(rabbitMixer);
            gltf.animations.forEach((clip) => {
                rabbitMixer.clipAction(clip).play();
            });
            scene.add(rabbit);

        }, undefined, function (error) {

            console.error(error);
        });


    }
   

    addSky() {
        // const mats = [];
       
        // const texture_ft = new THREE.TextureLoader().load('assets/sh_ft.png');
        // const texture_bk = new THREE.TextureLoader().load('assets/sh_bk.png');
        // const texture_up = new THREE.TextureLoader().load('assets/sh_up.png');
        // const texture_dn = new THREE.TextureLoader().load('assets/sh_dn.png');
        // const texture_rt = new THREE.TextureLoader().load('assets/sh_rt.png');
        // const texture_lf = new THREE.TextureLoader().load('assets/sh_lf.png');

        // mats.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
        // mats.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
        // mats.push(new THREE.MeshBasicMaterial({ map: texture_up }));
        // mats.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
        // mats.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
        // mats.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

        // for (let i = 0; i < 6; i++) {
        //     mats[i].side = THREE.BackSide;
        // }
        // const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
        // const skybox = new THREE.Mesh(skyboxGeo, mats);
        // this.scene.add(skybox);
        // const renderer = this.renderer;
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

        function guiChanged() {

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
            renderer.render(scene, camera);

        }

      

        guiChanged();

    }


    

    

    animate() {
        this.controls.update(clock.getDelta());
        // this.skybox.rotation.x += 0.005;
        // this.skybox.rotation.y += 0.005;
        this.mixers.forEach(mixer => mixer.update(clock.getDelta()));
        requestAnimationFrame(this.animate.bind(this)); 
        this.renderer.render(this.scene, this.camera);
        // this.getPos();
    }

}

export default View;
