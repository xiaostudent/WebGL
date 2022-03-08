import { GLProgram } from "../core/gl/GLProgram";

export class MainGLPrograme extends GLProgram{

	g_points = [];
	a_Position

	public init(): void {
		this.a_Position= this.getAttribLocation('a_Position');
	}


}