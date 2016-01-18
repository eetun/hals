 
class Entity {
    
    constructor(level, x, y) {
        this.level = level;
        this.x = x;
        this.y = y;
        
        this.width = 16;
        this.height = 32;
        
    }
    
    update() {
        
    }
    
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}

class Bullet extends Entity {
 
    constructor(level, x, y, direction, color) {
        super(level, x, y);
        
        this.Directions = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
            
        }
        
        //console.log("Bullet created - X: " + this.x + " Y:" + this.y);
        
        this.direction = direction;
        this.color = color;
        
        this.width = 2;
        this.height = 2;
        
        this.speed = 3;
        
    }
    
    update() { 
        
        var xa = 0;
        var ya = 0;
        
        if(this.direction == this.Directions.UP) { ya = -1 * this.speed; }
        if(this.direction == this.Directions.DOWN) { ya = 1 * this.speed; }
        if(this.direction == this.Directions.LEFT) { xa = -1 * this.speed; }
        if(this.direction == this.Directions.RIGHT) { xa = 1 * this.speed; }
        
        this.move(xa, ya);
        
        if(this.x < 0 || this.y < 0 || this.x > this.level.width - this.width || this.y > this.level.height - this.height) {
            this.level.entities.splice(this.level.entities.indexOf(this), 1);
        } 
        
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    move(xa, ya) {            
        this.x += xa;
        this.y += ya;
    }
    
}

class Mob extends Entity {
    
    constructor(level, x, y) {
        super(level, x, y);

        this.speed = 2;
        
        this.width = 16;
        this.height = 32;
        
        this.Directions = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
            
        }
        
    }
    
    update() {
        
    }
    
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    move(xa, ya) {
        
        if(xa > 0) this.direction = this.Directions.RIGHT;
        if(xa < 0) this.direction = this.Directions.LEFT;
        if(ya > 0) this.direction = this.Directions.DOWN;
        if(ya < 0) this.direction = this.Directions.UP;
        
        
        this.x += xa;
        this.y += ya;
    }
    
}

class Player extends Mob {
    
    constructor(inputhandler, level, x, y) {
        super(level, x, y);
        
        this.inputhandler = inputhandler;
        this.gunSize = 15;
        this.direction = this.Directions.RIGHT;
        
        this.lastFire = 0;
        this.fireRate = 350;
        
        console.log("Player created");
        
    }
    
    update() {
        
        var xa = 0;
        var ya = 0;
     
        if(this.inputhandler.isDown(this.inputhandler.KEYS.UP)){
                ya -= this.speed;
        } else if(this.inputhandler.isDown(this.inputhandler.KEYS.DOWN)) {
                ya += this.speed;
        }
        
        if(this.inputhandler.isDown(this.inputhandler.KEYS.LEFT)){
                xa -= this.speed;
        } else if(this.inputhandler.isDown(this.inputhandler.KEYS.RIGHT)) {
                xa += this.speed;
        }    
        
        if(this.inputhandler.isDown(this.inputhandler.KEYS.SPACE)){
                //console.log("Player shooting - X: " + this.x + " Y:" + this.y);
            if(window.performance.now() - this.lastFire > this.fireRate) {
                this.level.entities.push(new Bullet(this.level, this.x, this.y, this.direction, "#FF00FF"));
                this.lastFire = window.performance.now();
            }
        }
        
        if(this.inputhandler.isDown(this.inputhandler.KEYS.R)){
                this.level.entities.push(new Dummy(this.level, Math.floor((Math.random() * 500) + 50) , Math.floor((Math.random() * 500) + 50) ));
        }
        
        if(xa != 0 || ya != 0) {
            this.move(xa, ya);
        }
        
        if(this.x < 0) { this.x = 0; }
        if(this.y < 0) { this.y = 0; }
        if(this.x > this.level.width - this.width) { this.x = this.level.width - this.width; }
        if(this.y > this.level.height - this.height) { this.y = this.level.height - this.height; }
        
    }
    
    render(ctx) {
        
        var renderX = this.x - (this.width/2);
        var renderY = this.y - (this.height/2);

        
        //Render helmet
        ctx.fillStyle = "#da5400";
        ctx.fillRect(renderX, renderY, this.width, 8);
        
        //Render face
        ctx.fillStyle = "#FFD9AC";
        ctx.fillRect(renderX, renderY + 8, this.width, 8);
        
        //Render body
        ctx.fillStyle = "#FF8700";
        ctx.fillRect(renderX, renderY + 8 + 8, this.width, 16);
        
        //Render gun, based on player direction
        ctx.fillStyle = "#323232";
        if(this.direction == this.Directions.UP) {
            ctx.fillRect(renderX + (this.width/2), renderY - this.gunSize * 0.75, 2, this.gunSize * 0.75);
        } else if(this.direction == this.Directions.DOWN) {
            ctx.fillRect(renderX + (this.width/2), renderY + (this.height/2), 2, this.gunSize * 1.2);
        } else if(this.direction == this.Directions.LEFT) {
            ctx.fillRect(renderX - this.gunSize, renderY + (this.height/2), this.gunSize, 2);
        } else if(this.direction == this.Directions.RIGHT) {
            ctx.fillRect(renderX + this.gunSize, renderY + (this.height/2), this.gunSize, 2);
        }
    }
    
    
}

class Dummy extends Mob {
    
    constructor(level, x, y) {
        super(level, x, y);
    }
    
    update() {
        //check if im hit by bullet
        
        var r1 = {x: this.x - (this.width/2), y: this.y - (this.height/2), width: this.width, height: this.height};
        
        for(var i=0; i < this.level.entities.length; i++) {
            var entity = this.level.entities[i];
            var r2 = {x: entity.x, y: entity.y, width: entity.width, height: entity.height};
            
            if (r1.x < r2.x + r2.width &&
            r1.x + r1.width > r2.x &&
            r1.y < r2.y + r2.height &&
            r1.height + r1.y > r2.y) {
                
                if(entity instanceof Bullet) {
                    this.level.entities.splice(this.level.entities.indexOf(this), 1);
                    this.level.entities.splice(this.level.entities.indexOf(entity), 1);
                }
            }
            
        }
        
    }
    
    render(ctx) {
        
        var renderX = this.x - (this.width/2);
        var renderY = this.y - (this.height/2);

        
        //Render helmet
        ctx.fillStyle = "#404040";
        ctx.fillRect(renderX, renderY, this.width, 8);
        
        //Render face
        ctx.fillStyle = "#32871B";
        ctx.fillRect(renderX, renderY + 8, this.width, 8);
        
        //Render body
        ctx.fillStyle = "#404040";
        ctx.fillRect(renderX, renderY + 8 + 8, this.width, 16);    
    }
    
}
