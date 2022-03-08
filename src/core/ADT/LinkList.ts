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

    public getPrevious(__previous){
        return this.__previous
    }

    public setData(__data){
        this.__data=__data
    }

    public getData(__data){
        return this.__data
    }

    public clear(){
        this.__next=null
        this.__next=null
        this.__data=null
    }

}


export class LinkList {
    private __header
    private __ender

    constructor(){
        this.__header=null
        this.__ender=null
    }

    public push(data){
        if(!data) return
        let node=new LinkNode()
        node.setData(data)
        if(this.__header==null){
            this.__header=this.__ender=node
        }else{
            if(this.__ender){
                this.__ender.setNext(node)
                node.setPrevious(this.__ender)
                this.__ender=node
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
            return data
        }
    }

    public unshift(data){
        if(!data) return
        let node=new LinkNode()
        node.setData(data)
        if(this.__header==null){
            this.__header=this.__ender=node
        }else{
            if(this.__header){
                this.__header.setPrevious(node)
                node.setNext(this.__header)
                this.__header=node
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

}