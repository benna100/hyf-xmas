
import "./main.scss";
require('particles.js');
import Shake from 'shake.js';
import startSnow from './startSnow.js';
import isMobileDevice from './isMobileDevice.js';

const shakeTextHeader = document.querySelector('.shake-text-wrapper h2');

if (isMobileDevice()) {
    shakeTextHeader.innerHTML = 'Shake your phone';
}


const myShakeEvent = new Shake({
    threshold: 20, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});
myShakeEvent.start();
window.addEventListener('shake', shakeDetected, false);

function shakeDetected() {
    shakeTextHeader.innerHTML = 'Ahh just like the real thing';
    shakeTextHeader.classList.remove('shaking');
    startSnow();
}

// Make the DIV element draggable:
dragElement(document.querySelector(".globe-wrapper"));

function dragElement(elementToDrag) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elementToDrag.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elementToDrag.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elementToDrag.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  let distance = 0;
  let snowInitiated = false;
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    distance = distance + Math.abs(pos1) + Math.abs(pos2);
    elementToDrag.style.top = (elementToDrag.offsetTop - pos2) + "px";
    elementToDrag.style.left = (elementToDrag.offsetLeft - pos1) + "px";

    if (distance > 600 && !snowInitiated) {
        shakeDetected();
        snowInitiated = true;
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}





