
import * as THREE from 'three';
import View from './scripts/view.js';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";


document.addEventListener('DOMContentLoaded', () => {
    
    
    
    const view = new View();
    view.animate();
    
})