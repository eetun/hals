
class InputHandler {
    
    constructor() {
        this.keyState = {};
        this.KEYS = {LEFT: 37, UP: 38,  RIGHT: 39, DOWN: 40, SPACE: 32, R: 82 };
        
        this.bindListeners();
    }
    
    bindListeners() {
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
        document.addEventListener("keyup", this.onKeyUp.bind(this), false);
    }
    
    onKeyDown(e) {
        this.keyState[e.keyCode] = true;    
    }
    
    onKeyUp(e) {
        this.keyState[e.keyCode] = false;    
    }
    
    isDown(keyCode) {
        return this.keyState[keyCode] === true;
    }
   
}
