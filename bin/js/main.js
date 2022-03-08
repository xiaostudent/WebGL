/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/ADT/LinkList.ts":
/*!**********************************!*\
  !*** ./src/core/ADT/LinkList.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkList = void 0;
var LinkNode = /** @class */ (function () {
    function LinkNode() {
        this.clear();
    }
    LinkNode.prototype.setNext = function (__next) {
        this.__next = __next;
    };
    LinkNode.prototype.getNext = function () {
        return this.__next;
    };
    LinkNode.prototype.setPrevious = function (__previous) {
        this.__previous = __previous;
    };
    LinkNode.prototype.getPrevious = function (__previous) {
        return this.__previous;
    };
    LinkNode.prototype.setData = function (__data) {
        this.__data = __data;
    };
    LinkNode.prototype.getData = function (__data) {
        return this.__data;
    };
    LinkNode.prototype.clear = function () {
        this.__next = null;
        this.__next = null;
        this.__data = null;
    };
    return LinkNode;
}());
var LinkList = /** @class */ (function () {
    function LinkList() {
        this.__header = null;
        this.__ender = null;
    }
    LinkList.prototype.push = function (data) {
        if (!data)
            return;
        var node = new LinkNode();
        node.setData(data);
        if (this.__header == null) {
            this.__header = this.__ender = node;
        }
        else {
            if (this.__ender) {
                this.__ender.setNext(node);
                node.setPrevious(this.__ender);
                this.__ender = node;
            }
        }
    };
    LinkList.prototype.pop = function () {
        if (this.__ender) {
            var pre = this.__ender.getPrevious();
            var node = this.__ender;
            var data = node.getData();
            if (pre) {
                pre.setNext(null);
                node.setPrevious(null);
                this.__ender = pre;
            }
            else {
                this.__header = this.__ender = null;
            }
            return data;
        }
    };
    LinkList.prototype.shift = function () {
        if (this.__header) {
            var next = this.__header.getNext();
            var node = this.__header;
            var data = node.getData();
            if (next) {
                next.setPrevious(null);
                node.setNext(null);
                this.__header = next;
            }
            else {
                this.__header = this.__ender = null;
            }
            return data;
        }
    };
    LinkList.prototype.unshift = function (data) {
        if (!data)
            return;
        var node = new LinkNode();
        node.setData(data);
        if (this.__header == null) {
            this.__header = this.__ender = node;
        }
        else {
            if (this.__header) {
                this.__header.setPrevious(node);
                node.setNext(this.__header);
                this.__header = node;
            }
        }
    };
    LinkList.prototype.print = function () {
        if (this.__header) {
            var node = this.__header;
            var list = [];
            while (node) {
                list.push(node.getData());
                node = node.getNext();
            }
            console.dir(list);
        }
    };
    return LinkList;
}());
exports.LinkList = LinkList;


/***/ }),

/***/ "./src/core/gl/GLProgram.ts":
/*!**********************************!*\
  !*** ./src/core/gl/GLProgram.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GLProgram = void 0;
var GLProgram = /** @class */ (function () {
    function GLProgram(gl, vshader, fshader) {
        this.__gl = gl;
        this.__fshader = fshader;
        this.__vshader = vshader;
        gl && this.__fshader && this.__vshader && (this.__program = this.createProgram()) && (this.init());
    }
    GLProgram.prototype.init = function () {
    };
    GLProgram.prototype.getProgram = function () {
        return this.__program;
    };
    GLProgram.prototype.useProgram = function () {
        if (this.__program && this.__gl) {
            this.__gl.useProgram(this.__program);
            return true;
        }
        return false;
    };
    GLProgram.prototype.checkAvailable = function () {
        return this.__program && this.__gl;
    };
    GLProgram.prototype.getAttribLocation = function (name) {
        if (!this.checkAvailable())
            return -1;
        return this.__gl.getAttribLocation(this.__program, name);
    };
    GLProgram.prototype.createProgram = function () {
        var vertexShader = this.loadShader(this.__gl.VERTEX_SHADER, this.__vshader);
        var fragmentShader = this.loadShader(this.__gl.FRAGMENT_SHADER, this.__fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }
        // Create a program object
        var program = this.__gl.createProgram();
        if (!program) {
            return null;
        }
        // Attach the shader objects
        this.__gl.attachShader(program, vertexShader);
        this.__gl.attachShader(program, fragmentShader);
        // Link the program object
        this.__gl.linkProgram(program);
        // Check the result of linking
        var linked = this.__gl.getProgramParameter(program, this.__gl.LINK_STATUS);
        if (!linked) {
            var error = this.__gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            this.__gl.deleteProgram(program);
            this.__gl.deleteShader(fragmentShader);
            this.__gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    };
    GLProgram.prototype.loadShader = function (type, source) {
        var shader = this.__gl.createShader(type);
        if (shader == null) {
            console.log('unable to create shader');
            return null;
        }
        // Set the shader program
        this.__gl.shaderSource(shader, source);
        // Compile the shader
        this.__gl.compileShader(shader);
        // Check the result of compilation
        var compiled = this.__gl.getShaderParameter(shader, this.__gl.COMPILE_STATUS);
        if (!compiled) {
            var error = this.__gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            this.__gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    GLProgram.prototype.setRenderFunction = function (func) {
        this.__renderFunction = func;
    };
    GLProgram.prototype.render = function () {
        if (this.__renderFunction)
            this.__renderFunction();
    };
    return GLProgram;
}());
exports.GLProgram = GLProgram;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LinkList_1 = __webpack_require__(/*! ./core/ADT/LinkList */ "./src/core/ADT/LinkList.ts");
var MainGLProgram_1 = __webpack_require__(/*! ./main/MainGLProgram */ "./src/main/MainGLProgram.ts");
function resizeCanvas() {
    var canvas = document.getElementById('webgl');
    canvas["width"] = window.innerWidth;
    canvas["height"] = window.innerHeight;
}
function onMouseDown() {
}
function addListeners() {
    window.addEventListener("resize", function () {
        resizeCanvas();
    });
    window.addEventListener("mousedown", function () {
        onMouseDown();
    });
}
function initWebgl() {
    var canvas = document.getElementById('webgl');
    var gl = window["getWebGLContext"](canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    window["gl"] = gl;
}
function render() {
    if (!window["gl"])
        return;
    window["gl"].clearColor(0.0, 1.0, 0.0, 1.0);
    window["gl"].clear(window["gl"].COLOR_BUFFER_BIT);
    if (window["renderList"] && typeof (window["renderList"]) == "object") {
        for (var index = 0; index < window["renderList"].length; index++) {
            var program = window["renderList"][index];
            if (typeof (program.render) == "function") {
                program.render();
            }
        }
    }
}
function initHtml() {
    window.requestAnimationFrame = window.requestAnimationFrame || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["oRequestAnimationFrame"] || window["msRequestAnimationFrame"] || function (fun) {
        return window.setTimeout(fun, 1000 / 60);
    };
    window.requestAnimationFrame(loop);
    function loop() {
        render();
        window.requestAnimationFrame(loop);
    }
}
function initMainProgram() {
    var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
        'void main() {\n' +
        '  gl_Position = a_Position;\n' +
        '  gl_PointSize = 10.0;\n' +
        '}\n';
    var FSHADER_SOURCE = 'void main() {\n' +
        '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n';
    var gl = window["gl"];
    var program = new MainGLProgram_1.MainGLPrograme(gl, VSHADER_SOURCE, FSHADER_SOURCE);
}
function main() {
    resizeCanvas();
    addListeners();
    initWebgl();
    initHtml();
    initMainProgram();
    var list = new LinkList_1.LinkList();
    list.push("1");
    list.push("2");
    list.print();
    console.dir(list.shift());
    list.unshift("3");
    list.print();
}
main();


/***/ }),

/***/ "./src/main/MainGLProgram.ts":
/*!***********************************!*\
  !*** ./src/main/MainGLProgram.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainGLPrograme = void 0;
var GLProgram_1 = __webpack_require__(/*! ../core/gl/GLProgram */ "./src/core/gl/GLProgram.ts");
var MainGLPrograme = /** @class */ (function (_super) {
    __extends(MainGLPrograme, _super);
    function MainGLPrograme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.g_points = [];
        return _this;
    }
    MainGLPrograme.prototype.init = function () {
        this.a_Position = this.getAttribLocation('a_Position');
    };
    return MainGLPrograme;
}(GLProgram_1.GLProgram));
exports.MainGLPrograme = MainGLPrograme;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map