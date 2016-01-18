"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.canvas_name = "canvas";
        this.canvas = document.getElementById(this.canvas_name);
        this.gameSize = { width: canvas.width, height: canvas.height };
        this.ctx = this.canvas.getContext("2d");

        this.setup();

        this.runningFirstTime = true;
    }

    _createClass(Game, [{
        key: "setup",
        value: function setup() {

            this.level = new Level();
            this.player = new Player(new InputHandler(), this.level, 100, 100);

            this.level.entities.push(this.player);
            this.level.entities.push(new Dummy(this.level, 300, 300));

            this.run();
        }
    }, {
        key: "run",
        value: function run() {
            this.render(this.ctx);
            this.update();
            window.requestAnimationFrame(this.run.bind(this));
        }
    }, {
        key: "getTimestamp",
        value: function getTimestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }
    }, {
        key: "render",
        value: function render(ctx) {
            //var ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
            ctx.fillStyle = "#000";
            ctx.fillText("HYPER ASTEROID LASER SHOOTER", 10, 16);
            ctx.fillText("Move with arrow keys, shoot with space | Press R to spawn dummies ", 10, 32);

            this.level.render(ctx);
        }
    }, {
        key: "update",
        value: function update() {
            this.level.update();
        }
    }]);

    return Game;
}();

function init() {
    var game = new Game();
}

init();