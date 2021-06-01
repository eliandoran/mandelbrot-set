!function(){var e={hsl_red:{title:"Red (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(0, 90%, ${100*t}%)`}},hsl_green:{title:"Green (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(150, 90%, ${100*t}%)`}},hsl_cyan:{title:"Cyan (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(190, 90%, ${100*t}%)`}},hsl_blue:{title:"Blue (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(210, 90%, ${100*t}%)`}},hsl_purple:{title:"Purple (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(270, 90%, ${100*t}%)`}},hsl_magenta:{title:"Magenta (HSL)",getColorScheme:e=>t=>{e.fillStyle=`hsl(310, 90%, ${100*t}%)`}},greyscale:{title:"Greyscale",getColorScheme:e=>t=>{let n=255*t;e.fillStyle=`rgb(${n}, ${n}, ${n})`}}};function t(e,t,n){let o=t,i=n;for(let l=0;l<e;l++){const c=2*o*i+n;if(o=o*o-i*i+t,i=c,o*i>5)return l/e}return 0}!function(t){const n=t.canvasEl,o=document.getElementById("color-scheme"),i=document.getElementById("zoom-in"),l=document.getElementById("zoom-out"),c=document.getElementById("zoom-reset"),a=document.getElementById("selection"),s=document.getElementById("num-iterations-value"),r=document.getElementById("num-iterations-button"),d={numIterations:100,magnificationFactor:250,panX:2,panY:1.5,scheme:"hsl_blue"};function u(){setTimeout((()=>{t.draw(n,d)}),0)}!function(e,t,n){let o,i,l=!1,c=0,a=0,s=0,r=0;function d(){l&&(t.style.display="block",t.style.left=`${c}px`,t.style.top=`${a}px`,t.style.width=`${s}px`,t.style.height=`${r}px`)}function u(e){return e.clientX&&e.clientY?{x:e.clientX,y:e.clientY}:e.targetTouches&&e.targetTouches.length>0?{x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY}:null}function m(e){const{x:t,y:n}=u(e);l=!0,c=t,a=n,s=0,r=0,d(),o=t,i=n}function h(e){if(e.preventDefault(),!l)return;const{x:t,y:n}=u(e);t>=o?(c=o,s=t-o):(c=t,s=o-t),n>=i?(a=i,r=n-i):(a=n,r=i-n),d()}function f(e){t.style.display="none",l=!1,d(),s>=30&&r>=30&&n({x:c,y:a,width:s,height:r})}e.addEventListener("mousedown",m),e.addEventListener("mousemove",h),e.addEventListener("mouseup",f),e.addEventListener("touchstart",m),e.addEventListener("touchmove",h,{passive:!1}),e.addEventListener("touchend",f)}(n,a,(e=>{const t=d.magnificationFactor,n=(window.innerWidth,window.innerHeight,d.panY,e.x*t-d.panX),o=(e.y,d.panY,(n+e.width*t)/n);d.panX-=e.x/t,d.panY-=e.y/t,d.magnificationFactor+=t*o,u()})),function(){const t=d.scheme;o.innerHTML="";for(const n of Object.keys(e)){const i=document.createElement("option");i.innerText=e[n].title,i.value=n,i.selected=n===t,o.appendChild(i)}}(),s.value=d.numIterations,o.onchange=function(e){const t=e.target.value;d.scheme=t,u()},i.onclick=()=>{d.magnificationFactor+=50,d.panX+=0,d.panY+=0,u()},l.onclick=()=>{d.magnificationFactor-=50,d.panX-=.2,d.panY-=.2,u()},c.onclick=()=>{d.magnificationFactor=250,d.panX=2,d.panY=1.5,u()},r.onclick=e=>{const t=parseInt(s.value,10);t>0&&(d.numIterations=t,u())},u()}({canvasEl:document.getElementById("drawing"),draw:function(n,o){const i=document.getElementById("info-pane");n.className="loading";const l=window.innerWidth,c=window.innerHeight;n.width=l,n.height=c;const a=o.scheme,s=o.numIterations,r=n.getContext("2d",{alpha:!1}),d=e[a].getColorScheme(r),u=Date.now();r.fillStyle="#00000",r.fillRect(0,0,l,c);const m=o.magnificationFactor,h=o.panX,f=o.panY;function g(e){i.innerHTML=e.join("<br/>")}function y(e){g(["Rendering Mandelbrot Set...",`${Math.round(100*e)}%`])}function p(){const e=0/m-h,t=0/m-f,n=l/m-h,o=c/m-h,i=Date.now()-u;g([`Viewport size: ${l}x${c}`,`Magnification factor: ${m.toFixed(2)}`,`Pan: (${h.toFixed(4)}, ${f.toFixed(4)})`,`Abs. coords: (${e.toFixed(4)} ${t.toFixed(4)}) (${n.toFixed(4)} ${o.toFixed(4)})`,`Render time: ${i} ms`])}const $=40*(Math.floor(c/40)-1);for(let e=0;e<c;e+=40)setTimeout((()=>{for(let o=e;o<e+40;o++){for(let e=0;e<l;e++){const n=t(s,e/m-h,o/m-f);d(n),r.fillRect(e,o,1,1)}if(o>=$)n.className="",p();else{y(e/c)}}}),0);y(0)}})}();
//# sourceMappingURL=index.63fefd8d.js.map