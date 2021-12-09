
import * as THREE from 'three';
import View from './scripts/view.js';
import Music from './scripts/music';
import Breath from './scripts/breath';





document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.querySelector("#canvas1");
    const submit = document.querySelector("#submit");
    const begin = document.querySelector('#begin');
    const canvas2 = document.querySelector('#canvas2');
    canvas2.width = 50;
    canvas2.height = 300;
    const ctx = canvas2.getContext('2d');

    submit.addEventListener('click', e => {
        e.preventDefault();
        const form = document.querySelector("#form");
        form.style.display = 'none';
        const music = document.querySelector('#select-music').value;
        const duration = document.querySelector('#select-duration').value;
        const audio = new Music(music, duration);
    
         
        document.querySelector('#play-pause').style.display = 'flex';
        document.querySelector('.canvas2-container').style.display = 'flex';
        
        const breath = new Breath(ctx);
        document.querySelector("#instructions").style.display = 'flex';
    });
    
    
    
    begin.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#instructions').style.display = 'none';
        document.querySelector("h1").style.display = 'none';
        
        
        const view = new View();
        console.log(view.scene.children);
        document.querySelector('#load').style.display = 'flex';

        setTimeout(() => {
            document.querySelector('#load').style.display = 'none';
            document.querySelector('.canvas-container').classList.add('fade-in');
            view.animate();
        }, 5000);
        
        window.addEventListener('resize', function () {
            let width = window.innerWidth;
            let height = window.innerHeight;
            view.renderer.setSize(width, height);
            view.camera.aspect = width / height;
            view.camera.updateProjectionMatrix();
        })
    })

    

    

})