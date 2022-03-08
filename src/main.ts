import { LinkList } from "./core/ADT/LinkList";
import { MainGLPrograme } from "./main/MainGLProgram";


function resizeCanvas(){
	let canvas = document.getElementById('webgl');
	canvas["width"]=window.innerWidth
	canvas["height"]=window.innerHeight
}

function onMouseDown(){

}

function addListeners(){
	window.addEventListener("resize", () => {
		resizeCanvas()
	})

	window.addEventListener("mousedown", () => {
		onMouseDown()
	})
}

function initWebgl(){
  let canvas = document.getElementById('webgl');
  let gl = window["getWebGLContext"](canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  window["gl"]=gl
}

function render(){
	if(!window["gl"]) return
    window["gl"].clearColor(0.0, 1.0, 0.0, 1.0);
    window["gl"].clear(window["gl"].COLOR_BUFFER_BIT)
	if(window["renderList"] && typeof(window["renderList"])=="object"){
		for (let index = 0; index < window["renderList"].length; index++) {
			const program = window["renderList"][index];
			if(typeof(program.render)=="function"){
				program.render()
			}
		}
	}
}

function initHtml(){
	window.requestAnimationFrame = window.requestAnimationFrame || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["oRequestAnimationFrame"] || window["msRequestAnimationFrame"] || function (fun) {
			return window.setTimeout(fun, 1000 / 60);
	};

	window.requestAnimationFrame(loop);
	function loop() {
		render();
		window.requestAnimationFrame(loop);
	}
}

function initMainProgram(){
	var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' +
	'  gl_PointSize = 10.0;\n' +
	'}\n';

	var FSHADER_SOURCE =
	'void main() {\n' +
	'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';

	var gl = window["gl"]
	let program=new MainGLPrograme(gl,VSHADER_SOURCE,FSHADER_SOURCE)
}


function main() {
	resizeCanvas()
	addListeners()
	initWebgl()
	initHtml()
	initMainProgram()

	let list=new LinkList()
	list.push("1")
	list.push("2")
	list.print()
	console.dir(list.shift())
	list.unshift("3")
	list.print()

}

main()
