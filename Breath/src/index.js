
import * as THREE from 'three';
import View from './scripts/view.js';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import Music from './scripts/music';



document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.querySelector("#canvas1");
    const submit = document.querySelector("#submit");
    const begin = document.querySelector('#begin');

    submit.addEventListener('click', e => {
        e.preventDefault();
        const form = document.querySelector("#form");
        form.style.display = 'none';
        const music = document.querySelector('#select-music').value;
        const duration = document.querySelector('#select-duration').value;
        const audio = new Music(music, duration);
        audio.fadeOut();
        document.querySelector('#play-pause').style.display = 'flex';
        document.querySelector("#instructions").style.display = 'flex';
        });
    

    begin.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#instructions').style.display = 'none';
        // document.querySelector('#splash').style.display = 'none;'
        document.querySelector("h1").style.display = 'none';
        const view = new View();
        console.log(view.scene.children);
        view.animate();
        

        window.addEventListener('resize', function () {
            let width = window.innerWidth;
            let height = window.innerHeight;
            view.renderer.setSize(width, height);
            view.camera.aspect = width / height;
            view.camera.updateProjectionMatrix();
        })
    })

    

})