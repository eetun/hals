"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(level, x, y) {
        _classCallCheck(this, Entity);

        this.level = level;
        this.x = x;
        this.y = y;

        this.width = 16;
        this.height = 32;
    }

    _createClass(Entity, [{
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render(ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }]);

    return Entity;
}();

var Bullet = function (_Entity) {
    _inherits(Bullet, _Entity);

    function Bullet(level, x, y, direction, color) {
        _classCallCheck(this, Bullet);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).call(this, level, x, y));

        _this.Directions = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3

        };

        //console.log("Bullet created - X: " + this.x + " Y:" + this.y);

        _this.direction = direction;
        _this.color = color;

        _this.width = 2;
        _this.height = 2;

        _this.speed = 3;

        return _this;
    }

    _createClass(Bullet, [{
        key: "update",
        value: function update() {

            var xa = 0;
            var ya = 0;

            if (this.direction == this.Directions.UP) {
                ya = -1 * this.speed;
            }
            if (this.direction == this.Directions.DOWN) {
                ya = 1 * this.speed;
            }
            if (this.direction == this.Directions.LEFT) {
                xa = -1 * this.speed;
            }
            if (this.direction == this.Directions.RIGHT) {
                xa = 1 * this.speed;
            }

            this.move(xa, ya);

            if (this.x < 0 || this.y < 0 || this.x > this.level.width - this.width || this.y > this.level.height - this.height) {
                this.level.entities.splice(this.level.entities.indexOf(this), 1);
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }, {
        key: "move",
        value: function move(xa, ya) {
            this.x += xa;
            this.y += ya;
        }
    }]);

    return Bullet;
}(Entity);

var Mob = function (_Entity2) {
    _inherits(Mob, _Entity2);

    function Mob(level, x, y) {
        _classCallCheck(this, Mob);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Mob).call(this, level, x, y));

        _this2.speed = 2;

        _this2.width = 16;
        _this2.height = 32;

        _this2.Directions = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3

        };

        return _this2;
    }

    _createClass(Mob, [{
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render(ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }, {
        key: "move",
        value: function move(xa, ya) {

            if (xa > 0) this.direction = this.Directions.RIGHT;
            if (xa < 0) this.direction = this.Directions.LEFT;
            if (ya > 0) this.direction = this.Directions.DOWN;
            if (ya < 0) this.direction = this.Directions.UP;

            this.x += xa;
            this.y += ya;
        }
    }]);

    return Mob;
}(Entity);

var Player = function (_Mob) {
    _inherits(Player, _Mob);

    function Player(inputhandler, level, x, y) {
        _classCallCheck(this, Player);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, level, x, y));

        _this3.inputhandler = inputhandler;
        _this3.gunSize = 15;
        _this3.direction = _this3.Directions.RIGHT;

        _this3.lastFire = 0;
        _this3.fireRate = 350;

        console.log("Player created");

        return _this3;
    }

    _createClass(Player, [{
        key: "update",
        value: function update() {

            var xa = 0;
            var ya = 0;

            if (this.inputhandler.isDown(this.inputhandler.KEYS.UP)) {
                ya -= this.speed;
            } else if (this.inputhandler.isDown(this.inputhandler.KEYS.DOWN)) {
                ya += this.speed;
            }

            if (this.inputhandler.isDown(this.inputhandler.KEYS.LEFT)) {
                xa -= this.speed;
            } else if (this.inputhandler.isDown(this.inputhandler.KEYS.RIGHT)) {
                xa += this.speed;
            }

            if (this.inputhandler.isDown(this.inputhandler.KEYS.SPACE)) {
                //console.log("Player shooting - X: " + this.x + " Y:" + this.y);
                if (window.performance.now() - this.lastFire > this.fireRate) {
                    this.level.entities.push(new Bullet(this.level, this.x, this.y, this.direction, "#FF00FF"));
                    this.lastFire = window.performance.now();
                }
            }

            if (this.inputhandler.isDown(this.inputhandler.KEYS.R)) {
                this.level.entities.push(new Dummy(this.level, Math.floor(Math.random() * 500 + 50), Math.floor(Math.random() * 500 + 50)));
            }

            if (xa != 0 || ya != 0) {
                this.move(xa, ya);
            }

            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.x > this.level.width - this.width) {
                this.x = this.level.width - this.width;
            }
            if (this.y > this.level.height - this.height) {
                this.y = this.level.height - this.height;
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {

            var renderX = this.x - this.width / 2;
            var renderY = this.y - this.height / 2;

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
            if (this.direction == this.Directions.UP) {
                ctx.fillRect(renderX + this.width / 2, renderY - this.gunSize * 0.75, 2, this.gunSize * 0.75);
            } else if (this.direction == this.Directions.DOWN) {
                ctx.fillRect(renderX + this.width / 2, renderY + this.height / 2, 2, this.gunSize * 1.2);
            } else if (this.direction == this.Directions.LEFT) {
                ctx.fillRect(renderX - this.gunSize, renderY + this.height / 2, this.gunSize, 2);
            } else if (this.direction == this.Directions.RIGHT) {
                ctx.fillRect(renderX + this.gunSize, renderY + this.height / 2, this.gunSize, 2);
            }
        }
    }]);

    return Player;
}(Mob);

var Dummy = function (_Mob2) {
    _inherits(Dummy, _Mob2);

    function Dummy(level, x, y) {
        _classCallCheck(this, Dummy);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dummy).call(this, level, x, y));
    }

    _createClass(Dummy, [{
        key: "update",
        value: function update() {
            //check if im hit by bullet

            var r1 = { x: this.x - this.width / 2, y: this.y - this.height / 2, width: this.width, height: this.height };

            for (var i = 0; i < this.level.entities.length; i++) {
                var entity = this.level.entities[i];
                var r2 = { x: entity.x, y: entity.y, width: entity.width, height: entity.height };

                if (r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.height + r1.y > r2.y) {

                    if (entity instanceof Bullet) {
                        this.level.entities.splice(this.level.entities.indexOf(this), 1);
                        this.level.entities.splice(this.level.entities.indexOf(entity), 1);
                    }
                }
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {

            var renderX = this.x - this.width / 2;
            var renderY = this.y - this.height / 2;

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
    }]);

    return Dummy;
}(Mob);