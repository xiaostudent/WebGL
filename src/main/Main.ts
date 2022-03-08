import { Test1GLProgram } from "../test/Test1GLProgram";

export class Main{

    constructor(){
        this.initProgram()
        this.initTestProgram()
    }


    public initProgram(){

    }


    public initTestProgram(){
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
        let program=new Test1GLProgram(gl,VSHADER_SOURCE,FSHADER_SOURCE)
        window["renderList"].push(program)
    }

}