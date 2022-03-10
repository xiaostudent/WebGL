import { LinkList } from "../ADT/LinkList"

export class EventDispatcher{

    private __eventList={}

    public constructor(){

    }

    private check(list, caller, listener){
        let node=null
        if(list){
            list.foreach((data)=>{
                if(data.caller==caller && data.listener==listener){
                    node=data
                    return true
                }
            })
        }
        return node
    }

    public on(type, caller, listener, args = null,time=-1){
        if(!type) return
        this.__eventList[type] || (this.__eventList[type]=new LinkList())
        let node =this.check(this.__eventList[type], caller, listener)
        if(node){    
            node.removeTag=false
            node.time=time
            return
        } 
        this.__eventList[type].push({caller:caller,listener:listener,args:args,removeTag:false,time:time})
    }

    public once(type, caller, listener, args = null){
        if(!type) return
        this.on(type, caller, listener, args,1)
    }

    public off(type, caller, listener){ //采取标记删除
        if(!type) return
        if(!this.__eventList[type]) return
        this.__eventList[type].foreach((data)=>{
            if(data.caller==caller && data.listener==listener){
                data.removeTag=true
                return true
            }
        })
    }

    public offAllCaller(caller){
        if(!caller) return
        for (const key in this.__eventList) {
            const list = this.__eventList[key];
            if(list && list instanceof LinkList){
                list.foreach((data)=>{
                    if(data.caller==caller){
                        data.removeTag=true
                    }
                })
            }
        }
    }
    
    public event(type, data = null){
        if(this.__eventList[type]){
            let list=this.__eventList[type]
            if(list.length()>0){
                list.foreach((node)=>{
                    if(node.removeTag){ //标记删除
                        return {remove:node.removeTag}
                    }else{
                        if(node.time){
                            node.listener && node.listener.call(node.caller,node.args,data)
                            node.time>0 && (node.time-=1)
                            node.time==0 && (node.removeTag=true)
                        }
                        return {remove:node.removeTag}
                    }
                })
                list.print()
            }
        }
    }

}