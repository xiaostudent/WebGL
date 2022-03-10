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
    LinkNode.prototype.getPrevious = function () {
        return this.__previous;
    };
    LinkNode.prototype.setData = function (__data) {
        this.__data = __data;
    };
    LinkNode.prototype.getData = function () {
        return this.__data;
    };
    LinkNode.prototype.clear = function () {
        this.__next = null;
        this.__previous = null;
        this.__data = null;
    };
    return LinkNode;
}());
var LinkList = /** @class */ (function () {
    function LinkList() {
        this.__header = null;
        this.__ender = null;
        this.__count = 0;
    }
    LinkList.prototype.push = function (data) {
        if (!data)
            return;
        if (this.findNode(data))
            return;
        var node = new LinkNode();
        node.setData(data);
        if (this.__header == null) {
            this.__header = this.__ender = node;
            this.__count += 1;
        }
        else {
            if (this.__ender) {
                this.__ender.setNext(node);
                node.setPrevious(this.__ender);
                this.__ender = node;
                this.__count += 1;
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
            this.__count -= 1;
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
            this.__count -= 1;
            return data;
        }
    };
    LinkList.prototype.unshift = function (data) {
        if (!data)
            return;
        if (this.findNode(data))
            return;
        var node = new LinkNode();
        node.setData(data);
        if (this.__header == null) {
            this.__header = this.__ender = node;
            this.__count += 1;
        }
        else {
            if (this.__header) {
                this.__header.setPrevious(node);
                node.setNext(this.__header);
                this.__header = node;
                this.__count += 1;
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
    //支持动态删除
    LinkList.prototype.foreach = function (func) {
        if (func) {
            var node = this.__header;
            while (node) {
                var isbreak = func(node.getData()); //当前节点可能被删除
                if (isbreak) {
                    if (typeof (isbreak) == "object") {
                        if (isbreak.remove) {
                            var nextNode = node.getNext(); //可能存在bug,如果下一个节点被当前回调删除，即遍历会终止 nextNode 的 __next为 null
                            this.removeNode(node);
                            node = nextNode;
                        }
                        if (isbreak.break) {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    node = node.getNext();
                }
            }
        }
    };
    LinkList.prototype.findNode = function (data) {
        if (data) {
            var node = this.__header;
            while (node) {
                if (node.getData() == data) {
                    return node;
                }
                else {
                    node = node.getNext();
                }
            }
            return null;
        }
    };
    LinkList.prototype.removeNode = function (node) {
        if (node && node instanceof LinkNode) {
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
            this.__count -= 1;
            node.clear();
        }
    };
    LinkList.prototype.remove = function (data) {
        if (data) {
            var node = this.__header;
            while (node) {
                if (node.getData() == data) {
                    this.removeNode(node);
                    break;
                }
                else {
                    node = node.getNext();
                }
            }
        }
    };
    LinkList.prototype.length = function () {
        return this.__count;
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
    GLProgram.prototype.getUniformLocation = function (name) {
        if (!this.checkAvailable())
            return -1;
        return this.__gl.getUniformLocation(this.__program, name);
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

/***/ "./src/core/util/EventDispatcher.ts":
/*!******************************************!*\
  !*** ./src/core/util/EventDispatcher.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
var LinkList_1 = __webpack_require__(/*! ../ADT/LinkList */ "./src/core/ADT/LinkList.ts");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.__eventList = {};
    }
    EventDispatcher.prototype.check = function (list, caller, listener) {
        var node = null;
        if (list) {
            list.foreach(function (data) {
                if (data.caller == caller && data.listener == listener) {
                    node = data;
                    return true;
                }
            });
        }
        return node;
    };
    EventDispatcher.prototype.on = function (type, caller, listener, args, time) {
        if (args === void 0) { args = null; }
        if (time === void 0) { time = -1; }
        if (!type)
            return;
        this.__eventList[type] || (this.__eventList[type] = new LinkList_1.LinkList());
        var node = this.check(this.__eventList[type], caller, listener);
        if (node) {
            node.removeTag = false;
            node.time = time;
            return;
        }
        this.__eventList[type].push({ caller: caller, listener: listener, args: args, removeTag: false, time: time });
    };
    EventDispatcher.prototype.once = function (type, caller, listener, args) {
        if (args === void 0) { args = null; }
        if (!type)
            return;
        this.on(type, caller, listener, args, 1);
    };
    EventDispatcher.prototype.off = function (type, caller, listener) {
        if (!type)
            return;
        if (!this.__eventList[type])
            return;
        this.__eventList[type].foreach(function (data) {
            if (data.caller == caller && data.listener == listener) {
                data.removeTag = true;
                return true;
            }
        });
    };
    EventDispatcher.prototype.offAllCaller = function (caller) {
        if (!caller)
            return;
        for (var key in this.__eventList) {
            var list = this.__eventList[key];
            if (list && list instanceof LinkList_1.LinkList) {
                list.foreach(function (data) {
                    if (data.caller == caller) {
                        data.removeTag = true;
                    }
                });
            }
        }
    };
    EventDispatcher.prototype.event = function (type, data) {
        if (data === void 0) { data = null; }
        if (this.__eventList[type]) {
            var list = this.__eventList[type];
            if (list.length() > 0) {
                list.foreach(function (node) {
                    if (node.removeTag) { //标记删除
                        return { remove: node.removeTag };
                    }
                    else {
                        if (node.time) {
                            node.listener && node.listener.call(node.caller, node.args, data);
                            node.time > 0 && (node.time -= 1);
                            node.time == 0 && (node.removeTag = true);
                        }
                        return { remove: node.removeTag };
                    }
                });
                list.print();
            }
        }
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;


/***/ }),

/***/ "./src/core/util/HttpRequest.ts":
/*!**************************************!*\
  !*** ./src/core/util/HttpRequest.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
        this.__http = new XMLHttpRequest();
    }
    HttpRequest.prototype.send = function (url, calllBacks, data, method, responseType, headers) {
        if (calllBacks === void 0) { calllBacks = null; }
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "get"; }
        if (responseType === void 0) { responseType = "text"; }
        if (headers === void 0) { headers = null; }
        if (!url || !this.__http)
            return;
        var http = this.__http;
        http.open(method, url, true);
        this.__url = url;
        var isJson = false;
        var _this = this;
        if (headers) {
            for (var i = 0; i < headers.length; i++) {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        else {
            if (!data || typeof (data) == 'string')
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            else {
                http.setRequestHeader("Content-Type", "application/json");
                isJson = true;
            }
        }
        var restype = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.responseType = restype;
        http.onerror = function (e) {
            var status = _this.__http.status;
            var statusText = _this.__http.statusText;
            _this.clear();
            if (calllBacks && typeof (calllBacks.onerror) == "function") {
                calllBacks.onerror(status, statusText);
            }
        };
        http.onabort = function (e) {
            _this.clear();
            if (calllBacks && typeof (calllBacks.onabort) == "function") {
                calllBacks.onabort();
            }
        };
        http.onprogress = function (e) {
            var progress = 0;
            if (e && e.lengthComputable && e.loaded && e.total)
                progress = e.loaded / e.total;
            if (calllBacks && typeof (calllBacks.onprogress) == "function") {
                calllBacks.onprogress(progress);
            }
        };
        http.onload = function (e) {
            var _http = _this.__http;
            var status = _http.status !== undefined ? _http.status : 200;
            var data = _http.response || _http.responseText;
            _this.clear();
            if (status === 200 || status === 204 || status === 0) {
                if (calllBacks && typeof (calllBacks.oncomplete) == "function") {
                    calllBacks.oncomplete(data);
                }
            }
            else {
                var statusText = _this.__http.statusText;
                _this.clear();
                if (calllBacks && typeof (calllBacks.onerror) == "function") {
                    calllBacks.onerror(status, statusText);
                }
            }
        };
        data || (isJson && (data = {}));
        http.send(isJson ? JSON.stringify(data) : data);
    };
    HttpRequest.prototype.clear = function () {
        if (!this.__http)
            return;
        this.__url = this.__http.onerror = this.__http.onabort = this.__http.onprogress = this.__http.onload = null;
    };
    HttpRequest.prototype.abort = function () {
        if (!this.__http)
            return;
        this.__http.abort();
    };
    HttpRequest.prototype.url = function () {
        return this.__url;
    };
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;


/***/ }),

/***/ "./src/core/util/Loader.ts":
/*!*********************************!*\
  !*** ./src/core/util/Loader.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var LinkList_1 = __webpack_require__(/*! ../ADT/LinkList */ "./src/core/ADT/LinkList.ts");
var HttpRequest_1 = __webpack_require__(/*! ./HttpRequest */ "./src/core/util/HttpRequest.ts");
var Loader = /** @class */ (function () {
    function Loader() {
        this.__maxLoadCount = 6;
        this.__tryTime = 3;
        this.__loadList = new LinkList_1.LinkList();
        this.__httpRequestList = new LinkList_1.LinkList();
        this.__httpPoolList = new LinkList_1.LinkList();
    }
    Loader.prototype.push = function (http) {
        if (!http)
            return;
        http.clear();
        this.__httpRequestList.remove(http);
        this.__httpPoolList.push(http);
    };
    Loader.prototype.pop = function () {
        var http = this.__httpPoolList.shift() || new HttpRequest_1.HttpRequest();
        this.__httpRequestList.push(http);
        return http;
    };
    Loader.prototype.checkLoadUrl = function (url) {
        var isIn = false;
        this.__loadList.foreach(function (data) {
            if (data.url == url) {
                isIn = true;
                return isIn;
            }
        });
        return isIn;
    };
    Loader.prototype.check = function () {
        if (this.__httpRequestList.length() < this.__maxLoadCount) {
            var http_1 = this.pop();
            if (!http_1)
                return;
            var _this_1 = this;
            if (this.__loadList.length() > 0) {
                var node_1 = this.__loadList.shift();
                if (node_1 && node_1.url) {
                    http_1.send(node_1.url, { onerror: function (status, statusText) {
                            node_1.times += 1;
                            if (node_1.times < _this_1.__tryTime) {
                                _this_1.__loadList.push(node_1);
                            }
                            else {
                                console.dir(node_1.url + " Request failed Status:" + status + " text:" + statusText);
                            }
                            _this_1.push(http_1);
                            _this_1.check();
                        }, onabort: function () {
                            console.dir(node_1.url + " Request was aborted by user");
                            _this_1.push(http_1);
                            _this_1.check();
                        }, onprogress: function (progress) {
                            node_1.calllBacks && typeof (node_1.calllBacks.onprogress) == "function" && node_1.calllBacks.onprogress(progress);
                        }, oncomplete: function (data) {
                            _this_1.push(http_1);
                            node_1.calllBacks && typeof (node_1.calllBacks.oncomplete) == "function" && node_1.calllBacks.oncomplete(node_1.url, data);
                            _this_1.check();
                        } }, node_1.data, node_1.method, node_1.responseType, node_1.headers);
                }
            }
        }
    };
    Loader.prototype.send = function (url, calllBacks, data, method, responseType, headers) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "get"; }
        if (responseType === void 0) { responseType = "text"; }
        if (headers === void 0) { headers = null; }
        if (url) {
            if (url instanceof Array) {
                for (var index = 0; index < url.length; index++) {
                    var tmpUrl = url[index];
                    !this.checkLoadUrl(tmpUrl) && this.__loadList.push({ url: tmpUrl, calllBacks: calllBacks, times: 0, data: data, method: method, responseType: responseType, headers: headers });
                }
            }
            else {
                !this.checkLoadUrl(url) && this.__loadList.push({ url: url, calllBacks: calllBacks, times: 0, data: data, method: method, responseType: responseType, headers: headers });
            }
        }
        this.check();
    };
    Loader.prototype.abort = function (url) {
        if (!url)
            return;
        this.__loadList.remove(url);
        this.__httpRequestList.foreach(function (http) {
            if (http.url && http.url() == url) {
                http.abort();
                return true;
            }
        });
    };
    return Loader;
}());
exports.Loader = Loader;


/***/ }),

/***/ "./src/core/util/Timer.ts":
/*!********************************!*\
  !*** ./src/core/util/Timer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var LinkList_1 = __webpack_require__(/*! ../ADT/LinkList */ "./src/core/ADT/LinkList.ts");
var Timer = /** @class */ (function () {
    function Timer() {
        this.__eventList = new LinkList_1.LinkList();
        this.__currTimer = Date.now();
        this.__currFrame = 0;
        this.__lastTimer = Date.now();
        this.__scale = 1;
    }
    Timer.prototype.check = function (caller, listener) {
        var node = null;
        if (this.__eventList) {
            this.__eventList.foreach(function (data) {
                if (data.caller == caller && data.listener == listener) {
                    node = data;
                    return true;
                }
            });
        }
        return node;
    };
    Timer.prototype.update = function () {
        if (this.__scale <= 0)
            return;
        var frame = this.__currFrame = this.__currFrame + this.__scale;
        var now = Date.now();
        var timer = this.__currTimer = this.__currTimer + (now - this.__lastTimer) * this.__scale;
        this.__lastTimer = now;
        if (this.__eventList.length() > 0) {
            this.__eventList.foreach(function (node) {
                if (node) {
                    if (node.removeTag)
                        return { remove: node.removeTag };
                    if (node.listener) {
                        var t = node.userFrame ? frame : timer;
                        if (t >= node.exeTime) {
                            if (node.repeat) {
                                node.exeTime += node.delay;
                                node.listener && node.listener.call(node.caller, node.args);
                            }
                            else {
                                node.listener && node.listener.call(node.caller, node.args);
                                return { remove: true };
                            }
                        }
                    }
                    else {
                        return { remove: true };
                    }
                }
            });
        }
    };
    //delay 毫秒
    Timer.prototype.loop = function (delay, caller, listener, args, userFrame, repeat) {
        if (args === void 0) { args = null; }
        if (userFrame === void 0) { userFrame = false; }
        if (repeat === void 0) { repeat = true; }
        var node = this.check(caller, listener);
        if (node) {
            node.delay = delay;
            node.args = args;
            node.userFrame = userFrame;
            node.exeTime = (userFrame ? this.__currFrame : this.__currTimer) + delay;
            node.repeat = repeat;
            node.removeTag = false;
            return;
        }
        this.__eventList.push({ caller: caller, listener: listener, args: args, delay: delay, userFrame: userFrame, exeTime: (userFrame ? this.__currFrame : this.__currTimer) + delay, repeat: repeat, removeTag: false });
    };
    Timer.prototype.once = function (delay, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.loop(delay, caller, listener, args, false, false);
    };
    Timer.prototype.frameOnce = function (delay, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.loop(delay, caller, listener, args, true, false);
    };
    Timer.prototype.frameLoop = function (delay, caller, listener, args) {
        if (args === void 0) { args = null; }
        this.loop(delay, caller, listener, args, true, true);
    };
    Timer.prototype.clearAll = function (caller) {
        if (this.__eventList.length() == 0)
            return;
        this.__eventList.foreach(function (node) {
            if (node.caller == caller) {
                node.removeTag = true;
            }
        });
    };
    Timer.prototype.clear = function (caller, listener) {
        if (this.__eventList.length() == 0)
            return;
        if (!listener)
            return;
        this.__eventList.foreach(function (node) {
            if (node.caller == caller && node.listener == listener) {
                node.removeTag = true;
            }
        });
    };
    return Timer;
}());
exports.Timer = Timer;


/***/ }),

/***/ "./src/core/util/Util.ts":
/*!*******************************!*\
  !*** ./src/core/util/Util.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getPath = function (url) {
        var ofs = url.lastIndexOf('/');
        return ofs > 0 ? url.substr(0, ofs + 1) : "";
    };
    Util.getUrlPath = function () {
        return Util.getPath(location.protocol + "//" + location.host + location.pathname);
    };
    Util.formatURL = function (url) {
        if (!Util._basePath)
            Util._basePath = Util.getUrlPath();
        return Util._basePath + url;
    };
    Util.handler = function (caller, func, args) {
        return function () {
            func && func.call(caller, args);
        };
    };
    Util._basePath = null;
    return Util;
}());
exports.Util = Util;


/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimer = exports.setEventDispatcher = exports.setLoader = exports.g_renderList = exports.g_resizeList = exports.g_mousedownList = exports.gl = exports.g_mainCanvas = exports.g_timer = exports.g_eventDispatcher = exports.g_loader = void 0;
var LinkList_1 = __webpack_require__(/*! ./core/ADT/LinkList */ "./src/core/ADT/LinkList.ts");
var EventDispatcher_1 = __webpack_require__(/*! ./core/util/EventDispatcher */ "./src/core/util/EventDispatcher.ts");
var Loader_1 = __webpack_require__(/*! ./core/util/Loader */ "./src/core/util/Loader.ts");
var Timer_1 = __webpack_require__(/*! ./core/util/Timer */ "./src/core/util/Timer.ts");
exports.g_loader = new Loader_1.Loader();
exports.g_eventDispatcher = new EventDispatcher_1.EventDispatcher();
exports.g_timer = new Timer_1.Timer();
exports.g_mainCanvas = document.getElementById('webgl');
exports.gl = window["getWebGLContext"](exports.g_mainCanvas);
exports.g_mousedownList = new LinkList_1.LinkList();
exports.g_resizeList = new LinkList_1.LinkList();
exports.g_renderList = new LinkList_1.LinkList();
function setLoader(loader) {
    loader && (exports.g_loader = loader);
}
exports.setLoader = setLoader;
function setEventDispatcher(eventDispatcher) {
    eventDispatcher && (exports.g_eventDispatcher = eventDispatcher);
}
exports.setEventDispatcher = setEventDispatcher;
function setTimer(timer) {
    timer && (exports.g_timer = timer);
}
exports.setTimer = setTimer;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__(/*! ./global */ "./src/global.ts");
var Main_1 = __webpack_require__(/*! ./main/Main */ "./src/main/Main.ts");
function resizeCanvas() {
    var canvas = global_1.g_mainCanvas;
    canvas["width"] = window.innerWidth;
    canvas["height"] = window.innerHeight;
    global_1.g_resizeList && global_1.g_resizeList.foreach(function (view) {
        if (typeof (view.onResize) == "function") {
            view.onResize();
        }
    });
    global_1.gl && global_1.gl.viewport(0, 0, canvas["width"], canvas["height"]); //画布改变要改变视口变换
}
function onMouseDown(ev) {
    global_1.g_mousedownList && global_1.g_mousedownList.foreach(function (view) {
        if (typeof (view.onMouseDown) == "function") {
            view.onMouseDown(ev);
        }
    });
}
function addListeners() {
    window.addEventListener("resize", function () {
        resizeCanvas();
    });
    global_1.g_mainCanvas && global_1.g_mainCanvas.addEventListener("mousedown", function (ev) {
        onMouseDown(ev);
    });
}
function render() {
    if (!global_1.gl)
        return;
    global_1.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    global_1.gl.clear(global_1.gl.COLOR_BUFFER_BIT);
    if (global_1.g_renderList && typeof (global_1.g_renderList) == "object") {
        global_1.g_renderList.foreach(function (program) {
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
        global_1.g_timer && global_1.g_timer.update();
        window.requestAnimationFrame(loop);
    }
}
function enterMain() {
    new Main_1.Main();
}
function main() {
    resizeCanvas();
    addListeners();
    initHtml();
    enterMain();
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
var Util_1 = __webpack_require__(/*! ../core/util/Util */ "./src/core/util/Util.ts");
var global_1 = __webpack_require__(/*! ../global */ "./src/global.ts");
var Test1GLProgram_1 = __webpack_require__(/*! ../test/Test1GLProgram */ "./src/test/Test1GLProgram.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.initProgram();
        //this.initTestProgram()
    }
    Main.prototype.initProgram = function () {
        global_1.g_loader.send([Util_1.Util.formatURL("res/awesomeface.png"), Util_1.Util.formatURL("res/awesomeface.png")], { oncomplete: function (url, data) {
                //console.dir(data)
                //console.dir("kkkksnsnsnsnns")
            } });
        global_1.g_eventDispatcher.on("test", this, this.initTestProgram);
        global_1.g_eventDispatcher.on("test", this, this.initTestProgram2);
        global_1.g_eventDispatcher.event("test");
        var tf = function (arg) {
            console.dir(arg);
        };
        global_1.g_timer.frameLoop(5, null, tf, [1, 2, 3]);
        global_1.g_timer.loop(4000, null, function (arg) {
            global_1.g_timer.clear(null, tf);
        }, [1, 2, 3]);
    };
    Main.prototype.initTestProgram2 = function () {
        console.dir("initTestProgram2====");
    };
    Main.prototype.initTestProgram = function () {
        console.dir("initTestProgram1111111");
        global_1.g_loader.abort(Util_1.Util.formatURL("res/awesomeface.png"));
        global_1.g_eventDispatcher.off("test", this, this.initTestProgram);
        global_1.g_eventDispatcher.off("test", this, this.initTestProgram2);
        var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
            'void main() {\n' +
            '  gl_Position = a_Position;\n' +
            '  gl_PointSize = 10.0;\n' +
            '}\n';
        var FSHADER_SOURCE = 'void main() {\n' +
            '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
            '}\n';
        var program = new Test1GLProgram_1.Test1GLProgram(global_1.gl, VSHADER_SOURCE, FSHADER_SOURCE);
        global_1.g_renderList.push(program);
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
var global_1 = __webpack_require__(/*! ../global */ "./src/global.ts");
var Test1GLProgram = /** @class */ (function (_super) {
    __extends(Test1GLProgram, _super);
    function Test1GLProgram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.g_points = [];
        return _this;
    }
    Test1GLProgram.prototype.init = function () {
        this.a_Position = this.getAttribLocation('a_Position');
        global_1.g_mousedownList && global_1.g_mousedownList.push(this);
    };
    Test1GLProgram.prototype.onMouseDown = function (ev) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        x = ((x - rect.left) - global_1.g_mainCanvas["width"] / 2) / (global_1.g_mainCanvas["width"] / 2);
        y = (global_1.g_mainCanvas["height"] / 2 - (y - rect.top)) / (global_1.g_mainCanvas["height"] / 2);
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