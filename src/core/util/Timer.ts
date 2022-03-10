import { LinkList } from "../ADT/LinkList"

export class Timer {
    private __eventList
    private __currTimer
    private __currFrame
    private __lastTimer
    private __scale
    public constructor(){
        this.__eventList=new LinkList()
        this.__currTimer = Date.now();
        this.__currFrame = 0;
        this.__lastTimer = Date.now();
        this.__scale=1
    }

    private check(caller, listener){
        let node=null
        if(this.__eventList){
            this.__eventList.foreach((data)=>{
                if(data.caller==caller && data.listener==listener){
                    node=data
                    return true
                }
            })
        }
        return node
    }

    public update(){
        if (this.__scale <= 0) return 
        let frame = this.__currFrame = this.__currFrame + this.__scale;
        let now = Date.now();
        let timer = this.__currTimer = this.__currTimer + (now - this.__lastTimer) * this.__scale;
        this.__lastTimer = now;
        if(this.__eventList.length()>0){
            this.__eventList.foreach((node)=>{
                if(node){
                    if(node.removeTag) return {remove:node.removeTag}
                    if(node.listener){
                        let t=node.userFrame ? frame : timer
                        if(t>=node.exeTime){
                            if(node.repeat){
                                node.exeTime+=node.delay
                                node.listener && node.listener.call(node.caller,node.args)
                            }else{
                                node.listener && node.listener.call(node.caller,node.args)
                                return {remove:true}
                            }
                        }
                    }else{
                        return {remove:true}
                    }
                }
            })
        }

    }

    //delay 毫秒
    public loop(delay, caller, listener, args = null,userFrame=false,repeat=true){
        let node =this.check(caller,listener)
        if(node){
            node.delay=delay
            node.args=args
            node.userFrame=userFrame
            node.exeTime=(userFrame ? this.__currFrame : this.__currTimer)+delay
            node.repeat=repeat
            node.removeTag=false
            return
        }

        this.__eventList.push({caller:caller,listener:listener,args:args,delay:delay,userFrame:userFrame,exeTime:(userFrame ? this.__currFrame : this.__currTimer)+delay,repeat:repeat,removeTag:false})
    }

    public once(delay, caller, listener, args = null){
        this.loop(delay, caller, listener, args,false,false)
    }

    public frameOnce(delay, caller, listener, args = null) {
        this.loop(delay, caller, listener, args,true,false)
    }
    public frameLoop(delay, caller, listener, args = null) {
        this.loop(delay, caller, listener, args,true,true)
    }

    public clearAll(caller){
        if(this.__eventList.length()==0) return
        this.__eventList.foreach((node)=>{
            if(node.caller==caller){
                node.removeTag=true
            }
        })
    }


    public clear(caller, listener){
        if(this.__eventList.length()==0) return
        if(!listener) return
        this.__eventList.foreach((node)=>{
            if(node.caller==caller && node.listener==listener){
                node.removeTag=true
            }
        })
    }

}