class LinkNode{
    private __next
    private __previous
    private __data
    constructor(){
        this.clear()
    }

    public setNext(__next){
        this.__next=__next
    }

    public getNext(){
        return this.__next
    }

    public setPrevious(__previous){
        this.__previous=__previous
    }

    public getPrevious(){
        return this.__previous
    }

    public setData(__data){
        this.__data=__data
    }

    public getData(){
        return this.__data
    }

    public clear(){
        this.__next=null
        this.__previous=null
        this.__data=null
    }

}


export class LinkList {
    private __header
    private __ender
    private __count

    constructor(){
        this.__header=null
        this.__ender=null
        this.__count=0
    }

    public push(data){
        if(!data) return
        if(this.findNode(data)) return
        let node=new LinkNode()
        node.setData(data)
        if(this.__header==null){
            this.__header=this.__ender=node
            this.__count+=1
        }else{
            if(this.__ender){
                this.__ender.setNext(node)
                node.setPrevious(this.__ender)
                this.__ender=node
                this.__count+=1
            }
        }
    }

    public pop(){
        if(this.__ender){
            let pre=this.__ender.getPrevious()
            let node=this.__ender
            let data=node.getData()
            if(pre){
                pre.setNext(null)
                node.setPrevious(null)
                this.__ender=pre
            }else{
                this.__header=this.__ender=null
            }
            this.__count-=1
            return data
        }
    }

    public shift(){
        if(this.__header){
            let next=this.__header.getNext()
            let node=this.__header
            let data=node.getData()
            if(next){
                next.setPrevious(null)
                node.setNext(null)
                this.__header=next
            }else{
                this.__header=this.__ender=null
            }
            this.__count-=1
            return data
        }
    }

    public unshift(data){
        if(!data) return
        if(this.findNode(data)) return
        let node=new LinkNode()
        node.setData(data)
        if(this.__header==null){
            this.__header=this.__ender=node
            this.__count+=1
        }else{
            if(this.__header){
                this.__header.setPrevious(node)
                node.setNext(this.__header)
                this.__header=node
                this.__count+=1
            }
        }
    }

    public print(){
        if(this.__header){
            let node=this.__header
            let list=[]
            while(node){
                list.push(node.getData())
                node=node.getNext()
            }
            console.dir(list)
        }
    }

    //支持动态删除
    public foreach(func){
        if(func){
            let node=this.__header
            while(node){
                let isbreak=func(node.getData())  //当前节点可能被删除
                if(isbreak){
                    if(typeof(isbreak)=="object"){
                        if(isbreak.remove){
                            let nextNode=node.getNext()  //可能存在bug,如果下一个节点被当前回调删除，即遍历会终止 nextNode 的 __next为 null
                            this.removeNode(node)
                            node=nextNode
                        }
                        if(isbreak.break){
                            break
                        }
                    }else{
                        break
                    }
                }else{
                    node=node.getNext() 
                }
            }
        }
    }

    public findNode(data){
        if(data){
            let node=this.__header
            while(node){
                if(node.getData()==data){
                    return node
                }else{
                    node=node.getNext()
                }
            }  
            return  null
        }
    }

    public removeNode(node){
        if(node && node instanceof LinkNode){
            let pre=node.getPrevious()
            let next=node.getNext()
            if(!pre){ //第一个
                this.__header=next
                if(next){
                    next.setPrevious(null)
                }else{
                    this.__ender=null
                }
            }else{
                pre.setNext(next)
                if(next){
                    next.setPrevious(pre)
                }else{
                    this.__ender=pre
                }
            }
            this.__count-=1
            node.clear()
        }
    }

    public remove(data){
        if(data){
            let node=this.__header
            while(node){
                if(node.getData()==data){
                    this.removeNode(node)
                    break
                }else{
                    node=node.getNext()
                }
            }  
        }
    }

    public length(){
        return this.__count
    }

}