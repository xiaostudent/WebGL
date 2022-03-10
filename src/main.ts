import { gl, g_mainCanvas, g_mousedownList, g_renderList, g_resizeList, g_timer } from "./global";
import { Main } from "./main/Main";


function resizeCanvas(){
	let canvas = g_mainCanvas;
	canvas["width"]=window.innerWidth
	canvas["height"]=window.innerHeight
	g_resizeList && g_resizeList.foreach((view)=>{
		if(typeof(view.onResize)=="function"){
			view.onResize()
		}
	})
	gl && gl.viewport(0, 0, canvas["width"], canvas["height"]);  //画布改变要改变视口变换
}

function onMouseDown(ev){
	g_mousedownList && g_mousedownList.foreach((view)=>{
		if(typeof(view.onMouseDown)=="function"){
			view.onMouseDown(ev)
		}
	})
}

function addListeners(){
	window.addEventListener("resize", () => {
		resizeCanvas()
	})

	g_mainCanvas && g_mainCanvas.addEventListener("mousedown", (ev) => {
		onMouseDown(ev)
	})
}

function render(){
	if(!gl) return
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)
	if(g_renderList && typeof(g_renderList)=="object"){
		g_renderList.foreach((program)=>{
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
		g_timer && g_timer.update()
		window.requestAnimationFrame(loop);
	}
}

function enterMain(){
	new Main()
}


function main() {
	resizeCanvas()
	addListeners()
	initHtml()
	enterMain()
}

main()
