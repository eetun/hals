"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile() {
    _classCallCheck(this, Tile);
};

var Level = function () {
    function Level() {
        _classCallCheck(this, Level);

        this.width = 800;
        this.height = 600;
        this.entities = [];
    }

    _createClass(Level, [{
        key: "update",
        value: function update() {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].render(ctx);
            }
        }
    }]);

    return Level;
}();