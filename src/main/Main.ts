import { HttpRequest } from "../core/util/HttpRequest";
import { Util } from "../core/util/Util";
import { gl, g_eventDispatcher, g_loader, g_renderList, g_timer } from "../global";
import { Test1GLProgram } from "../test/Test1GLProgram";

export class Main{

    constructor(){
        this.initProgram()
        //this.initTestProgram()
    }


    public initProgram(){
        g_loader.send([Util.formatURL("res/awesomeface.png"),Util.formatURL("res/awesomeface.png")],{oncomplete:(url,data)=>{
            //console.dir(data)
            //console.dir("kkkksnsnsnsnns")
        }})
        g_eventDispatcher.on("test",this,this.initTestProgram)
        g_eventDispatcher.on("test",this,this.initTestProgram2)
        g_eventDispatcher.event("test")

        let tf=(arg)=>{
            console.dir(arg)
        }
        g_timer.frameLoop(5,null,tf,[1,2,3])

        g_timer.loop(4000,null,(arg)=>{
            g_timer.clear(null,tf)
        },[1,2,3])
    }

    public initTestProgram2(){
        console.dir("initTestProgram2====")
    }


    public initTestProgram(){
        console.dir("initTestProgram1111111")
        g_loader.abort(Util.formatURL("res/awesomeface.png"))
        g_eventDispatcher.off("test",this,this.initTestProgram)
        g_eventDispatcher.off("test",this,this.initTestProgram2)
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
    
        let program=new Test1GLProgram(gl,VSHADER_SOURCE,FSHADER_SOURCE)
        g_renderList.push(program)
    }

}