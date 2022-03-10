import { LinkList } from "./core/ADT/LinkList"
import { EventDispatcher } from "./core/util/EventDispatcher"
import { Loader } from "./core/util/Loader"
import { Timer } from "./core/util/Timer"

export let g_loader:Loader =new Loader()
export let g_eventDispatcher:EventDispatcher=new EventDispatcher()
export let g_timer :Timer=new Timer()

export let g_mainCanvas=document.getElementById('webgl')

export let gl=window["getWebGLContext"](g_mainCanvas);

export let g_mousedownList=new LinkList()
export let g_resizeList=new LinkList()
export let g_renderList=new LinkList()

export function setLoader(loader:Loader){
    loader  && (g_loader=loader)
}

export function setEventDispatcher(eventDispatcher:EventDispatcher){
    eventDispatcher && (g_eventDispatcher=eventDispatcher)
}

export function setTimer(timer :Timer){
    timer && (g_timer=timer)
}





