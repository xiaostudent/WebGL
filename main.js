function resizeCanvas(){
	let canvas = document.getElementById('webgl');
	canvas.width=window.innerWidth
	canvas.height=window.innerHeight
}

function addListeners(){
	window.addEventListener("resize", () => {
		resizeCanvas()
	})
}

function initWebgl(){
  let canvas = document.getElementById('webgl');
  let gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  window.gl=gl
}

function render(){
  window.gl.clearColor(0.0, 1.0, 0.0, 1.0);
  window.gl.clear(gl.COLOR_BUFFER_BIT)
}

function main() {
	resizeCanvas()
	addListeners()
	initWebgl()
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (fun) {
                return window.setTimeout(fun, 1000 / 60);
    };
	
	window.requestAnimationFrame(loop);
	function loop() {
		render();
		window.requestAnimationFrame(loop);
	}
  
}
