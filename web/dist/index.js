function c(){try{const e=localStorage.getItem("buckets");return JSON.parse(e)}catch(e){return console.error(e),[]}}function s(e){const t={},n=Array.from(e.attributes);for(let o of n)t[o.nodeName]=o.nodeValue;return t}console.log({script:document.currentScript});document.addEventListener("click",(e)=>{if(!(e.target instanceof HTMLElement))return;const t=e.target,n=s(t),o=c(),r=o.slice(),d=o.findIndex((a)=>a.identifier===n.id);r[d]={coordinates:{x:e.clientX,y:e.clientY},dimensions:{h:t.clientHeight,w:t.clientWidth},createdAt:new Date,eventType:"click",updatedAt:new Date,meta:n,identifier:n.id},localStorage.setItem("buckets",JSON.stringify(r))});document.addEventListener("error",()=>{});document.addEventListener("resize",()=>{});document.addEventListener("keypress",()=>{});document.addEventListener("mousemove",()=>{});document.addEventListener("DOMContentLoaded",()=>{});document.addEventListener("touchstart",()=>{});document.addEventListener("touchmove",()=>{});document.addEventListener("touchend",()=>{});
