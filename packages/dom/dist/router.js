var b=Object.defineProperty;var n=(t,e)=>b(t,"name",{value:e,configurable:!0});var c=n((t,e)=>{if(typeof t!="string")throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr"),p=n((t,e)=>{if(typeof t!="function")throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (Function)`)},"checkfn"),L=n((t,e)=>{if(!Array.isArray(t))throw new TypeError(`events: ${e} of type (${t?.constructor?.name}), expected (Array)`)},"checkarr"),d=class{constructor(e={},r={}){this.opts={addUndifined:!0,...e},this.events={};for(let o in r)this.add(o),L(r[o],"listners"),r[o].forEach(i=>this.on(o,i))}add(e){if(c(e,"name"),e in this.events)throw new ReferenceError(`events: adding defined event (${e})`);return this.events[e]=[],this}has(e){return c(e,"name"),e in this.events}on(e,r){if(typeof e=="object"){for(let o in e)this.on(o,e[o]);return this}if(c(e,"name"),p(r,"listner"),e in this.events)this.events[e].push(r);else if(this.opts.addUndifined)this.events[e]=[r];else throw new ReferenceError(`events: undefined event (${e})`);return this}off(e,r){if(c(e,"name"),p(r,"listner"),e in this.events)r?this.events[e].splice(this.events[e].indexOf(r),1):this.events[e]=[];else throw new ReferenceError(`events: undefined event (${e})`);return this}once(e,r){c(e,"name"),p(r,"listner");var o=n((...i)=>{r(...i),this.off(e,o)},"onceFn");return this.on(e,o)}trigger(e,...r){if(c(e,"name"),e in this.events)this.events[e].forEach(o=>o(...r));else throw new ReferenceError(`events: undefined event (${e})`);return this}};n(d,"EventEmmiter");var y=n((t,e)=>new d(t,e),"default");var m=n((t,e)=>{if(!(t instanceof Node))throw new TypeError(`dom: ${e} of type (${t?.constructor?.name}), expected (Node)`)},"checknode"),v=n((t,e)=>{if(typeof t!="string")throw new TypeError(`dom: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr");var a=n((t,e=document)=>(v(t,"query"),m(e,"root"),Array.from(e.querySelectorAll(t))),"query"),u=n(t=>{v(t,"string");var e=document.createElement("div");return e.innerHTML=t,e.children.length===1?e.children[0]:Array.from(e.children)},"construct");var w=Symbol("router:visit"),E=n(t=>{var e=t.opts.attr;a("a"+(e?`[${e}]`:"")).forEach(r=>{r[w]||r.href.includes(location.origin)&&(r.addEventListener("click",o=>{o.preventDefault(),t.go(r.href)}),r[w]=!0)}),t.events.trigger("attach",t)},"attach");var x=n((t,e)=>{if(!(t instanceof Element))throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (Element)`)},"checkel"),l=n((t,e)=>{if(typeof t!="string")throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (String)`)},"checkstr"),$=n((t,e)=>{if(typeof t!="function")throw new TypeError(`router: ${e} of type (${t?.constructor?.name}), expected (Function)`)},"checkfn");var T=n((t,e)=>{var{events:r,lastUrl:o,opts:i}=t;e.pathname!==o.pathname?N(t,r,i,e):e.hash?R(e,r):setTimeout(()=>scroll(0,0),0)},"handleRoute"),N=n(async(t,e,r,o)=>{e.trigger("before-fetch",t,o);var i=await fetch(o).then(h=>h,h=>h);if(e.trigger("after-fetch",t,o,i),i instanceof Error||!i.ok)return U(t,i,o,e);var s=await i.text();s=new DOMParser().parseFromString(s,"text/html"),r.transitions&&document.startViewTransition?document.startViewTransition(()=>g(t,s,e,o)):g(t,s,e,o)},"startUpdate"),g=n((t,e,r,o)=>{r.trigger("before-update",t,e,o),o!==location&&history.pushState(history.state,document.title,o.href),H(e),a("[preserve-on-route]").forEach(i=>a("[preserve-on-route][id="+i.id+"]",e)[0]?.replaceWith?.(i)),document.body.replaceChildren(...e.body.childNodes),r.trigger("after-update",t,o),o.hash&&setTimeout(()=>a(o.hash)[0]?.scrollIntoView?.({behavior:"smooth"}),1),t.attachToDom()},"handleUpdate"),U=n((t,e,r,o)=>{var i=t.opts.errorPage(e,r);x(i,"error page"),document.body.replaceChildren(i),o.trigger("error",t,r,e),history.pushState(history.state,e instanceof Error?e.name:e.statusText,r.href)},"handleError"),R=n((t,e)=>{var r=a(t.hash)[0];r&&setTimeout(()=>r.scrollIntoView({behavior:"smooth"}),1),t!==location&&history.pushState(history.state,document.title,t.href)},"handleHash"),A=n(t=>t.reduce((e,r)=>(e[r.tagName]?e[r.tagName].push(r):e[r.tagName]=[r],e),{}),"groupElsByTagName"),B=n(t=>{var e=document.createElement(t.tagName.toLowerCase());return Array.from(t.attributes).forEach(r=>e.setAttribute(r.name,r.value)),e},"clone"),H=n(t=>{var e=document.head,r=A(Array.from(e.children)),o=A(Array.from(t.head.children));r.BASE&&r.BASE[0].remove(),o.BASE&&e.prepend(o.BASE[0]),new Set(Object.keys(r).concat(Object.keys(o))).forEach(i=>{if(i!=="BASE"){if(i==="SCRIPT"||i==="LINK")return o[i].forEach(s=>!r[i].some(h=>h.id===s.id)&&e.append(B(s)));r[i]&&r[i].forEach(s=>s.remove()),o[i]&&o[i].forEach(s=>e.append(s))}})},"handleHead");var k=n((t,e)=>t instanceof Error?u(`<div>
		<h1 style="color: red">${t.name}: ${t.message}:</h1>url: ${e}
	<div>`):u(`<div>
		<h1 style="color: red">${t.statusText} (${t.status}):</h1>url: ${e}
	</div>`),"errorPage");var f=class{constructor(e={}){this.opts={transitions:!0,attr:"",errorPage:k,...e},l(this.opts.attr,"attribute"),$(this.opts.errorPage,"error page"),this.events=y(),this.events.add("before-fetch"),this.events.add("after-fetch"),this.events.add("before-update"),this.events.add("after-update"),this.events.add("attach"),this.events.add("error"),this.events.add("route"),window.addEventListener("popstate",()=>this.go("")),this.lastUrl=location}on(e,r){this.events.on(e,r)}off(e,r){this.events.off(e,r)}once(e,r){this.events.once(e,r)}attachToDom(){E(this)}go(e){l(e,"url");var r=e===""?location:new URL(e,location.href);this.events.trigger("route",this,r),T(this,r),this.lastUrl=new URL(r.href)}back(){history.back()}forward(){history.forward()}};n(f,"ZRRouter");var S=n(t=>new f(t),"$router");S.ZRRouter=f;var se=S;export{f as ZRRouter,se as default};