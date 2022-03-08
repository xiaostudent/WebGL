import { LinkList } from "./core/ADT/LinkList";
import { Main } from "./main/Main";


function resizeCanvas(){
	let canvas = document.getElementById('webgl');
	canvas["width"]=window.innerWidth
	canvas["height"]=window.innerHeight
	window["mainCanvas"]=canvas
	window["resizeList"] && window["resizeList"].foreach((view)=>{
		if(typeof(view.onResize)=="function"){
			view.onResize()
		}
	})
	window["gl"] && window["gl"].viewport(0, 0, canvas["width"], canvas["height"]);  //画布改变要改变视口变换
}

function onMouseDown(ev){
	window["mousedownList"] && window["mousedownList"].foreach((view)=>{
		if(typeof(view.onMouseDown)=="function"){
			view.onMouseDown(ev)
		}
	})
}

function addListeners(){
	window["resizeList"]=new LinkList()
	window["mousedownList"]=new LinkList()
	window.addEventListener("resize", () => {
		resizeCanvas()
	})

	window["mainCanvas"] && window["mainCanvas"].addEventListener("mousedown", (ev) => {
		onMouseDown(ev)
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
  window["renderList"]=new LinkList()
}

function render(){
	if(!window["gl"]) return
    window["gl"].clearColor(0.0, 0.0, 0.0, 1.0);
    window["gl"].clear(window["gl"].COLOR_BUFFER_BIT)
	if(window["renderList"] && typeof(window["renderList"])=="object"){
		window["renderList"].foreach((program)=>{
			if(typeof(program.render)=="function"){
				program.render()
			}
		})
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

function enterMain(){
	new Main()
}


function main() {
	resizeCanvas()
	addListeners()
	initWebgl()
	initHtml()
	enterMain()
}

main()
