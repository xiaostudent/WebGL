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
    LinkList.prototype.foreach = function (func) {
        if (func) {
            var node = this.__header;
            while (node) {
                func(node.getData());
                node = node.getNext();
            }
        }
    };
    LinkList.prototype.remove = function (data) {
        if (data) {
            var node = this.__header;
            while (node) {
                if (node.getData() == data) {
                    var pre = node.getPrevious();
                    var next = node.getNext();
                    if (!pre) { //第一个
                        this.__header = next;
                        if (next) {
                            next.setPrevious(null);
                        }
                        else {
                            this.__ender = null;
                        }
                    }
                    else {
                        pre.setNext(next);
                        if (next) {
                            next.setPrevious(pre);
                        }
                        else {
                            this.__ender = pre;
                        }
                    }
                    break;
                }
                else {
                    node = node.getNext();
                }
            }
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
var Main_1 = __webpack_require__(/*! ./main/Main */ "./src/main/Main.ts");
function resizeCanvas() {
    var canvas = document.getElementById('webgl');
    canvas["width"] = window.innerWidth;
    canvas["height"] = window.innerHeight;
    window["mainCanvas"] = canvas;
    window["resizeList"] && window["resizeList"].foreach(function (view) {
        if (typeof (view.onResize) == "function") {
            view.onResize();
        }
    });
    window["gl"] && window["gl"].viewport(0, 0, canvas["width"], canvas["height"]); //画布改变要改变视口变换
}
function onMouseDown(ev) {
    window["mousedownList"] && window["mousedownList"].foreach(function (view) {
        if (typeof (view.onMouseDown) == "function") {
            view.onMouseDown(ev);
        }
    });
}
function addListeners() {
    window["resizeList"] = new LinkList_1.LinkList();
    window["mousedownList"] = new LinkList_1.LinkList();
    window.addEventListener("resize", function () {
        resizeCanvas();
    });
    window["mainCanvas"] && window["mainCanvas"].addEventListener("mousedown", function (ev) {
        onMouseDown(ev);
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
    window["renderList"] = new LinkList_1.LinkList();
}
function render() {
    if (!window["gl"])
        return;
    window["gl"].clearColor(0.0, 0.0, 0.0, 1.0);
    window["gl"].clear(window["gl"].COLOR_BUFFER_BIT);
    if (window["renderList"] && typeof (window["renderList"]) == "object") {
        window["renderList"].foreach(function (program) {
            if (typeof (program.render) == "function") {
                program.render();
            }
        });
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
    new Main_1.Main();
}
function main() {
    resizeCanvas();
    addListeners();
    initWebgl();
    initHtml();
    initMainProgram();
}
main();


/***/ }),

/***/ "./src/main/Main.ts":
/*!**************************!*\
  !*** ./src/main/Main.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var Test1GLProgram_1 = __webpack_require__(/*! ../test/Test1GLProgram */ "./src/test/Test1GLProgram.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.initProgram();
        this.initTestProgram();
    }
    Main.prototype.initProgram = function () {
    };
    Main.prototype.initTestProgram = function () {
        var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
            'void main() {\n' +
            '  gl_Position = a_Position;\n' +
            '  gl_PointSize = 10.0;\n' +
            '}\n';
        var FSHADER_SOURCE = 'void main() {\n' +
            '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
            '}\n';
        var gl = window["gl"];
        var program = new Test1GLProgram_1.Test1GLProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        window["renderList"].push(program);
    };
    return Main;
}());
exports.Main = Main;


/***/ }),

/***/ "./src/test/Test1GLProgram.ts":
/*!************************************!*\
  !*** ./src/test/Test1GLProgram.ts ***!
  \************************************/
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
exports.Test1GLProgram = void 0;
var GLProgram_1 = __webpack_require__(/*! ../core/gl/GLProgram */ "./src/core/gl/GLProgram.ts");
var Test1GLProgram = /** @class */ (function (_super) {
    __extends(Test1GLProgram, _super);
    function Test1GLProgram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.g_points = [];
        return _this;
    }
    Test1GLProgram.prototype.init = function () {
        this.a_Position = this.getAttribLocation('a_Position');
        window["mousedownList"] && window["mousedownList"].push(this);
    };
    Test1GLProgram.prototype.onMouseDown = function (ev) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        x = ((x - rect.left) - window["mainCanvas"].width / 2) / (window["mainCanvas"].width / 2);
        y = (window["mainCanvas"].height / 2 - (y - rect.top)) / (window["mainCanvas"].height / 2);
        console.dir([x, y]);
        this.g_points.push(x);
        this.g_points.push(y);
    };
    Test1GLProgram.prototype.render = function () {
        this.useProgram();
        var len = this.g_points.length;
        for (var i = 0; i < len; i += 2) {
            this.__gl.vertexAttrib3f(this.a_Position, this.g_points[i], this.g_points[i + 1], 0.0);
            this.__gl.drawArrays(this.__gl.POINTS, 0, 1);
        }
    };
    return Test1GLProgram;
}(GLProgram_1.GLProgram));
exports.Test1GLProgram = Test1GLProgram;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map