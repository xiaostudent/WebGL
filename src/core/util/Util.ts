export class Util {
    static _basePath=null

    static getPath(url) {
        var ofs = url.lastIndexOf('/');
        return ofs > 0 ? url.substr(0, ofs + 1) : "";
    }

    static getUrlPath() {
        return Util.getPath(location.protocol + "//" + location.host + location.pathname);
    }

    static formatURL(url) {
        if(!Util._basePath) Util._basePath=Util.getUrlPath()
        return Util._basePath+ url
    }

}