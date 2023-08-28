var P=Object.defineProperty;var n=(t,e)=>P(t,"name",{value:e,configurable:!0});import m from"../comp/base.js";import{CompError as U}from"../comp/base.js";var s=n((t,e)=>{if(typeof t!="string")throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr"),u=n((t,e)=>{if(typeof t!="function")throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (Function)`)},"checkfn"),I=n((t,e)=>{if(!Array.isArray(t))throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (Array)`)},"checkarr"),d=class{constructor(e={},r={}){this.opts={addUndifined:!0,...e},this.events={};for(let o in r)this.add(o),I(r[o],"listners"),r[o].forEach(i=>this.on(o,i))}add(e){if(s(e,"name"),e in this.events)throw new ReferenceError(`events: adding defined event (${e})`);return this.events[e]=[],this}has(e){return s(e,"name"),e in this.events}on(e,r){if(typeof e=="object"){for(let o in e)this.on(o,e[o]);return this}if(s(e,"name"),u(r,"listner"),e in this.events)this.events[e].push(r);else if(this.opts.addUndifined)this.events[e]=[r];else throw new ReferenceError(`events: undefined event (${e})`);return this}off(e,r){if(s(e,"name"),u(r,"listner"),e in this.events)r?this.events[e].splice(this.events[e].indexOf(r),1):this.events[e]=[];else throw new ReferenceError(`events: undefined event (${e})`);return this}once(e,r){s(e,"name"),u(r,"listner");var o=n((...i)=>{r(...i),this.off(e,o)},"onceFn");return this.on(e,o)}trigger(e,...r){if(s(e,"name"),e in this.events)this.events[e].forEach(o=>o(...r));else throw new ReferenceError(`events: undefined event (${e})`);return this}};n(d,"EventEmmiter");var w=n((t,e)=>new d(t,e),"default");var $=n((t,e)=>{if(!(t instanceof Node))throw new TypeError(`dom: ${e} of type (${t?.constructor?.name}), expected (Node)`)},"checknode"),v=n((t,e)=>{if(typeof t!="string")throw new TypeError(`dom: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr");var a=n((t,e=document)=>(v(t,"query"),$(e,"root"),Array.from(e.querySelectorAll(t))),"query"),y=n(t=>{v(t,"string");var e=document.createElement("div");return e.innerHTML=t,e.children.length===1?e.children[0]:Array.from(e.children)},"construct");var x=Symbol("router:visit"),E=n(t=>{var e=t.opts.attr;a("a"+(e?`[${e}]`:"")).forEach(r=>{r[x]||r.href.includes(location.origin)&&(r.addEventListener("click",o=>{o.preventDefault(),t.go(r.href)}),r[x]=!0)}),t.events.trigger("attach",t)},"attach");var g=n((t,e)=>{if(!(t instanceof Element))throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (Element)`)},"checkel"),l=n((t,e)=>{if(typeof t!="string")throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr"),k=n((t,e)=>{if(typeof t!="function")throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (Function)`)},"checkfn");var S=n((t,e)=>{var{events:r,lastUrl:o,opts:i}=t;e.pathname!==o.pathname?D(t,r,i,e):e.hash?B(e,r):setTimeout(()=>scroll(0,0),0)},"handleRoute"),D=n(async(t,e,r,o)=>{e.trigger("before-fetch",t,o);var i=await fetch(o).then(h=>h,h=>h);if(e.trigger("after-fetch",t,o,i),i instanceof Error||!i.ok)return q(t,i,o,e);var c=await i.text();c=new DOMParser().parseFromString(c,"text/html"),r.transitions&&document.startViewTransition?document.startViewTransition(()=>A(t,c,e,o)):A(t,c,e,o)},"startUpdate"),A=n((t,e,r,o)=>{r.trigger("before-update",t,e,o),o!==location&&history.pushState(history.state,document.title,o.href),H(e),a("[preserve-on-route]").forEach(i=>a("[preserve-on-route][id="+i.id+"]",e)[0]?.replaceWith?.(i)),document.body.replaceChildren(...e.body.childNodes),r.trigger("after-update",t,o),o.hash&&setTimeout(()=>a(o.hash)[0]?.scrollIntoView?.({behavior:"smooth"}),1),t.attachToDom()},"handleUpdate"),q=n((t,e,r,o)=>{var i=t.opts.errorPage(e,r);g(i,"error page"),document.body.replaceChildren(i),o.trigger("error",t,r,e),history.pushState(history.state,e instanceof Error?e.name:e.statusText,r.href)},"handleError"),B=n((t,e)=>{var r=a(t.hash)[0];r&&setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),1),t!==location&&history.pushState(history.state,document.title,t.href)},"handleHash"),T=n(t=>t.reduce((e,r)=>(e[r.tagName]?e[r.tagName].push(r):e[r.tagName]=[r],e),{}),"groupElsByTagName"),F=n(t=>{var e=document.createElement(t.tagName.toLowerCase());return Array.from(t.attributes).forEach(r=>e.setAttribute(r.name,r.value)),e},"clone"),H=n(t=>{var e=document.head,r=T(Array.from(e.children)),o=T(Array.from(t.head.children));r.BASE&&r.BASE[0].remove(),o.BASE&&e.prepend(o.BASE[0]),new Set(Object.keys(r).concat(Object.keys(o))).forEach(i=>{if(i!=="BASE"){if(i==="SCRIPT"||i==="LINK")return o[i].forEach(c=>!r[i].some(h=>h.id===c.id)&&e.append(F(c)));r[i]&&r[i].forEach(c=>c.remove()),o[i]&&o[i].forEach(c=>e.append(c))}})},"handleHead");var b=n((t,e)=>t instanceof Error?y(`<div>
		<h1 style="color: red">${t.name}: ${t.message}:</h1>url: ${e}
	<div>`):y(`<div>
		<h1 style="color: red">${t.statusText} (${t.status}):</h1>url: ${e}
	</div>`),"errorPage");var f=class{constructor(e={}){this.opts={transitions:!0,attr:"",errorPage:b,...e},l(this.opts.attr,"attribute"),k(this.opts.errorPage,"error page"),this.events=w(),this.events.add("before-fetch"),this.events.add("after-fetch"),this.events.add("before-update"),this.events.add("after-update"),this.events.add("attach"),this.events.add("error"),this.events.add("route"),window.addEventListener("popstate",()=>this.go("")),this.lastUrl=location}on(e,r){this.events.on(e,r)}off(e,r){this.events.off(e,r)}once(e,r){this.events.once(e,r)}attachToDom(){E(this)}go(e){l(e,"url");var r=e===""?location:new URL(e,location.href);this.events.trigger("route",this,r),S(this,r),this.lastUrl=new URL(r.href)}back(){history.back()}forward(){history.forward()}};n(f,"ZRRouter");var N=n(t=>new f(t),"$router");N.ZRRouter=f;var L=N;var p=class extends Error{constructor(e="comp: empty"){var r=e.indexOf(":");super(e.slice(r+1).trim()),this.name=e.slice(0,r)}};n(p,"CompError");var R=n((t,e,r="comp")=>{if(typeof t!="string")throw new p(`${r}: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr");var C=n((t="main",e)=>{R(t,"id","router");var r=L(e);return r.on("before-update",()=>m?.root?.remove?.()),r.on("after-update",()=>{var o=a("#"+t)[0];if(!o)throw new U(`router: no element with id (${t})`);var i=o.getAttribute("comp-name");if(!i)throw new U("router: root element have no attribute (comp-name)");m.setRoot(o,i)}),m.router=r,r},"attach");m.attachRouter=C;var Ae=C;export{Ae as default};
