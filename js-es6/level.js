 
class Tile {
    
    constructor() {
         
    }
    
}
 
class Level {
    
    constructor() {
        this.width = 800;
        this.height = 600;
        this.entities = [];
        
    }
    
    update() {
        for(var i=0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }
    
    render(ctx) {
        for(var i=0; i < this.entities.length; i++) {
            this.entities[i].render(ctx);
        }
    }
    
}