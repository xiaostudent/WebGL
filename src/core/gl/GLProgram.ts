export class GLProgram {
    private __gl 
    private __fshader
    private __vshader
    private __program
    private __renderFunction
    constructor(gl,vshader,fshader){
        this.__gl=gl
        this.__fshader=fshader
        this.__vshader=vshader
        gl && this.__fshader && this.__vshader &&  (this.__program=this.createProgram()) && (this.init())
        
    }

    public init(){
      
    }

    public getProgram(){
        return this.__program
    }

    public useProgram(){
        if(this.__program && this.__gl){
            this.__gl.useProgram(this.__program);
            return true
        }
        return false
    }

    public checkAvailable(){
        return this.__program && this.__gl
    }

    public getAttribLocation(name){
        if(!this.checkAvailable()) return -1
        return this.__gl.getAttribLocation(this.__program, name)
    }

    private createProgram(){
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
    }


    private loadShader(type, source) {
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
    }

    public setRenderFunction(func){
      this.__renderFunction=func
    }

    public render(){
        if(this.__renderFunction) this.__renderFunction()
    }

}