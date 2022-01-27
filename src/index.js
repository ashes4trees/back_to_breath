import View from './scripts/view.js';
import Music from './scripts/music';
import Breath from './scripts/breath';

document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.querySelector("#canvas1");
    const submit = document.querySelector("#submit");
    const begin = document.querySelector('#begin');
    const info = document.querySelector('#info-btn');
    const close = document.querySelector('#close');
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
        const start = new Date().getTime();
        setInterval(() => {
            let current = new Date().getTime();
            if (current > (start + (1000 * 60 * duration))) {
                audio.fade();
                document.querySelector('#play-pause').classList.add('fade-out');
                document.querySelector('#info-btn').classList.add('fade-out');
                document.querySelector('.canvas2-container').classList.add('fade-out');
                document.querySelector('#prompt').classList.add('fade-out');
                document.querySelector('#goodbye').style.display = 'flex';
                document.querySelector('.canvas-container').classList.add('fade-out');
                document.querySelector('#canvas1').classList.add('fade-out');
                
            }
        }, 3000)
        document.querySelector('#play-pause').style.display = 'flex';
        document.querySelector('.links').style.display = 'flex';
        document.querySelector('.canvas2-container').style.display = 'flex';
        document.querySelector('#prompt').style.display = 'block';
        const breath = new Breath(ctx);
        document.querySelector("#instructions").style.display = 'flex';
    });
    
    
    
    begin.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#instructions').style.display = 'none';
        document.querySelector("h1").style.display = 'none';
        
        
        const view = new View();
        document.querySelector('#load').style.display = 'flex';

        setTimeout(() => {
            document.querySelector('#load').style.display = 'none';
            document.querySelector('.canvas-container').classList.add('fade-in');
            document.querySelector('#info-btn').style.display = 'flex';
            view.animate();
        }, 5000);
        
        window.addEventListener('resize', function () {
            let width = window.innerWidth;
            let height = window.innerHeight;
            view.renderer.setSize(width, height);
            view.camera.aspect = width / height;
            view.camera.updateProjectionMatrix();
        })
    });

    info.addEventListener('click', e => {
        const modal = document.querySelector('#modal');
        if (document.querySelector('#instructions').style.display === 'flex') {
            return false;
        } else if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    });

    close.addEventListener('click', e => {
        const modal = document.querySelector('#modal');
        modal.style.display === 'none' ? modal.style.display = 'flex' :
            modal.style.display = 'none';
    });


})