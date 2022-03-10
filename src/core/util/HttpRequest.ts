export class HttpRequest {
    private __http
    private __url

    public constructor(){
        this.__http=new XMLHttpRequest()
    }

    public send(url,calllBacks=null,data = null, method = "get", responseType = "text", headers = null){
        if(!url || !this.__http) return 
        let http=this.__http
        http.open(method, url, true);
        this.__url=url
        let isJson = false;
        let _this = this;
        if (headers) {
            for (let i = 0; i < headers.length; i++) {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        else{
            if (!data || typeof (data) == 'string')
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            else {
                http.setRequestHeader("Content-Type", "application/json");
                isJson = true;
            }
        }
        let restype = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.responseType = restype;
        http.onerror = function (e) {
            let status=_this.__http.status
            let statusText=_this.__http.statusText
            _this.clear();
            if(calllBacks && typeof(calllBacks.onerror)=="function"){
                calllBacks.onerror(status,statusText)
            }
        };
        http.onabort = function (e) {
            _this.clear();
            if(calllBacks && typeof(calllBacks.onabort)=="function"){
                calllBacks.onabort()
            }
        };
        http.onprogress = function (e) {
            let progress=0
            if (e && e.lengthComputable && e.loaded && e.total) progress=e.loaded / e.total
            if(calllBacks && typeof(calllBacks.onprogress)=="function"){
                calllBacks.onprogress(progress)
            }
        };
        http.onload = function (e) {
            let _http = _this.__http;
            let status = _http.status !== undefined ? _http.status : 200;
            let data=_http.response || _http.responseText
            _this.clear();
            if (status === 200 || status === 204 || status === 0) {
                if(calllBacks && typeof(calllBacks.oncomplete)=="function"){
                    calllBacks.oncomplete(data)
                }
            }
            else {
                let statusText=_this.__http.statusText
                _this.clear();
                if(calllBacks && typeof(calllBacks.onerror)=="function"){
                    calllBacks.onerror(status,statusText)
                }
            }
        };
        data || (isJson && (data={}))
        http.send(isJson ? JSON.stringify(data) : data);
    }


    public clear() {
        if(!this.__http) return
        this.__url=this.__http.onerror = this.__http.onabort = this.__http.onprogress = this.__http.onload = null;
    }

    public abort(){
        if(!this.__http) return
        this.__http.abort()
    }

    public url(){
        return this.__url
    }

}