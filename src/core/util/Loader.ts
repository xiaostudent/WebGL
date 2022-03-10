import { LinkList } from "../ADT/LinkList"
import { HttpRequest } from "./HttpRequest"

export class Loader{
    private __loadList
    private __httpRequestList
    private __httpPoolList
    private __maxLoadCount=6
    private __tryTime=3
    public constructor(){
        this.__loadList=new LinkList()
        this.__httpRequestList=new LinkList()
        this.__httpPoolList=new LinkList()
    }

    private push(http){
        if(!http)  return
        http.clear()
        this.__httpRequestList.remove(http)
        this.__httpPoolList.push(http)
    }

    private pop(){
        let http=this.__httpPoolList.shift() || new HttpRequest()
        this.__httpRequestList.push(http)
        return  http
    }

    private checkLoadUrl(url){
        let isIn=false
        this.__loadList.foreach((data)=>{
            if(data.url==url){
                isIn=true
                return isIn
            }
        })
        return isIn
    }

    private check(){
        if(this.__httpRequestList.length()<this.__maxLoadCount){
            let http=this.pop() as HttpRequest
            if(!http) return
            let _this=this
            if(this.__loadList.length()>0){
                let node=this.__loadList.shift()
                if(node && node.url){
                    http.send(node.url,{onerror:(status,statusText)=>{
                        node.times+=1
                        if(node.times<_this.__tryTime){
                            _this.__loadList.push(node)
                        }else{
                            console.dir(node.url+" Request failed Status:" + status + " text:" + statusText)
                        }
                        _this.push(http)
                        _this.check()
                    },onabort:()=>{
                        console.dir(node.url+" Request was aborted by user")
                        _this.push(http)
                        _this.check()
                    },onprogress:(progress)=>{
                        node.calllBacks && typeof(node.calllBacks.onprogress)=="function" && node.calllBacks.onprogress(progress)
                    },oncomplete:(data)=>{
                        _this.push(http)
                        node.calllBacks && typeof(node.calllBacks.oncomplete)=="function" && node.calllBacks.oncomplete(node.url,data)
                        _this.check()
                    }},node.data,node.method,node.responseType,node.headers)
                }
            }
        }
    }


    public send(url,calllBacks,data = null, method = "get", responseType = "text", headers = null){
        if(url){
            if(url instanceof Array){
                for (let index = 0; index < url.length; index++) {
                    const tmpUrl = url[index];
                    !this.checkLoadUrl(tmpUrl) && this.__loadList.push({url:tmpUrl,calllBacks:calllBacks,times:0,data:data,method:method,responseType:responseType,headers:headers})
                }
            }else{
                !this.checkLoadUrl(url) && this.__loadList.push({url:url,calllBacks:calllBacks,times:0,data:data,method:method,responseType:responseType,headers:headers})
            }
            
        }

        this.check()
    }

    public abort(url){
        if(!url) return
        this.__loadList.remove(url)
        this.__httpRequestList.foreach((http)=>{
            if(http.url && http.url()==url){
                http.abort()
                return true
            }
        })
    }
}