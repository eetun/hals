
class Game {
	
    constructor() {
        this.canvas_name = "canvas";
        this.canvas = document.getElementById(this.canvas_name);
        this.gameSize = {width: canvas.width, height: canvas.height};
        this.ctx = this.canvas.getContext("2d");
        
        this.setup();
        
        this.runningFirstTime = true;
        
    }
    
    setup() {
        
        this.level = new Level();
        this.player = new Player(new InputHandler(), this.level, 100, 100);
        
        this.level.entities.push(this.player);
        this.level.entities.push(new Dummy(this.level, 300, 300));
        
        this.run();
    }
    
    run() {
        this.render(this.ctx);
        this.update();
        window.requestAnimationFrame(this.run.bind(this));
    }
    
    getTimestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    
    render(ctx) {
        //var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.gameSize.width, this.gameSize.height);
        ctx.fillStyle = "#000"
        ctx.fillText("HYPER ASTEROID LASER SHOOTER", 10, 16);
        ctx.fillText("Move with arrow keys, shoot with space | Press R to spawn dummies ", 10, 32);
        
        this.level.render(ctx);
        
    }
    
    update() {
        this.level.update();
    }
  
}

function init() {
    var game = new Game();
}

init();
