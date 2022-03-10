import { GLProgram } from "../core/gl/GLProgram";
import { g_mainCanvas, g_mousedownList } from "../global";

export class Test1GLProgram extends GLProgram{

	g_points = [];
	a_Position

	public init(): void {
		this.a_Position= this.getAttribLocation('a_Position');
		g_mousedownList && g_mousedownList.push(this)
	}

	public onMouseDown(ev){
		var x = ev.clientX;
		var y = ev.clientY; 
		var rect = ev.target.getBoundingClientRect() ;
		x = ((x - rect.left) - g_mainCanvas["width"]/2)/(g_mainCanvas["width"]/2);
		y = (g_mainCanvas["height"]/2 - (y - rect.top))/(g_mainCanvas["height"]/2);
		console.dir([x,y])
		this.g_points.push(x); this.g_points.push(y);
	}

	public render(): void {
		this.useProgram()
		let  len = this.g_points.length;
		for(var i = 0; i < len; i += 2) {
			this.__gl.vertexAttrib3f(this.a_Position, this.g_points[i], this.g_points[i+1], 0.0);
			this.__gl.drawArrays(this.__gl.POINTS, 0, 1);
		  }	
	}
}