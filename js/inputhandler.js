"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function () {
    function InputHandler() {
        _classCallCheck(this, InputHandler);

        this.keyState = {};
        this.KEYS = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32, R: 82 };

        this.bindListeners();
    }

    _createClass(InputHandler, [{
        key: "bindListeners",
        value: function bindListeners() {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            this.keyState[e.keyCode] = true;
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(e) {
            this.keyState[e.keyCode] = false;
        }
    }, {
        key: "isDown",
        value: function isDown(keyCode) {
            return this.keyState[keyCode] === true;
        }
    }]);

    return InputHandler;
}();