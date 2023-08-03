var W=Object.defineProperty;var i=(e,r)=>W(e,"name",{value:r,configurable:!0});function u(e,r){if(typeof e!="function")throw new TypeError(`obj: ${r} of type (${e?.constructor?.name}), expected (Function)'`)}i(u,"default");var m=i((e,r)=>{u(r),Object.keys(e).forEach(t=>r(e[t],t,e))},"loop"),y=i((e,r)=>{u(r);for(let t in e)r(e[t],t,e)},"loopProto"),s=i((e,r,t=!1,f=!1)=>{u(r);var n;for(Object.getOwnPropertyNames(e).forEach(c=>r(e[c],c,e)),t&&Object.getOwnPropertySymbols(e).forEach(c=>r(e[c],c,e)),f&&(n=Object.getPrototypeOf(e));n;)Object.getOwnPropertyNames(n).forEach(c=>e[c]===n[c]&&r(n[c],c,e)),t&&Object.getOwnPropertySymbols(n).forEach(c=>e[c]===n[c]&&r(n[c],c,e)),n=Object.getPrototypeOf(n)},"loopStrict");var a=i(e=>{if(Array.isArray(e))return e;if(typeof e=="string")return e.split(".");throw new TypeError("obj: path of type ("+e?.constructor?.name+"), expected (Array) or (String)")},"getPath"),O=i((e,r)=>{r=a(r);var t=e,f;for(let n=0;n<r.length;n++){if(f=r[n],t==null)return t;t=t[f]}return t},"get"),x=i((e,r,t)=>{if(r=a(r),r.length!==0){var f=e,n;for(let c=0;c<r.length;c++){if(n=r[c],c===r.length-1)return f[n]=t,t;(f[n]===void 0||f[n]===null)&&(f[n]={}),f=f[n]}}},"set"),h=i((e,r)=>{if(r=a(r),r.length===0)return!1;var t=e,f;for(let n=0;n<r.length;n++){if(f=r[n],n===r.length-1)return delete t[f],!0;if(t[f]===void 0||t[f]===null)return!1;t=t[f]}},"remove"),g=i((e,r,t,...f)=>{if(u(t,"updater"),r=a(r),r.length!==0){var n=e,c;for(let o=0;o<r.length;o++){if(c=r[o],o===r.length-1)return n[c]=t(n[c],r,e,...f),n[c];(n[c]===void 0||n[c]===null)&&(n[c]={}),n=n[c]}}},"update");var T=i((e,r)=>{var t=typeof r=="function"?r:f=>f===r;for(let f in e)if(t(e[f],f,e))return e[f]},"find"),P=i((e,r)=>{var t=typeof r=="function"?r:f=>f===r;for(let f in e)if(t(e[f],f,e))return f},"findKey"),k=i((e,r,t=!1)=>{var f,n=typeof r=="function"?r:c=>c===r;return Object.keys(e).forEach(c=>{n(e[c],c,e)&&(f=t?c:e[c])}),f},"findTyped"),E=i((e,r,t=!1,f=!1)=>{var n=[],c=typeof r=="function"?r:o=>o===r;if(f)Object.keys(e).forEach(o=>{c(e[o],o,e)&&n.push(t?o:e[o])});else for(let o in e)c(e[o],o,e)&&n.push(t?o:e[o]);return n},"findMultiple");var w=i((e,r)=>{u(r,"mapper");var t={};for(let f in e)t[f]=r(e[f],f,e);return t},"map"),A=i((e,r)=>{u(r,"mapper");var t=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(f=>{t[f]=r(e[f],f,e)}),t},"mapTyped"),F=i((e,r)=>{u(r,"mapper");var t={};for(let f in e)t[r(f,e[f],e)]=e[f];return t},"mapKeys"),K=i((e,r)=>{u(r,"mapper");var t=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(f=>{t[r(f,e[f],e)]=e[f]}),t},"mapKeysTyped"),S=i((e,r)=>{u(r,"mapper");var t={};for(let n in e){var f=r(e[n],n,e);t[f[0]]=f[1]}return t},"reshape"),M=i((e,r)=>{u(r,"mapper");var t=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(f=>{var n=r(e[f],f,e);t[n[0]]=n[1]}),t},"reshapeTyped");var N=i((e,r)=>{u(r,"predicate");var t={};for(let f in e)r(e[f],f,e)&&(t[f]=e[f]);return t},"filter"),$=i((e,r)=>{u(r,"predicate");var t=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(f=>{r(e[f],f,e)&&(t[f]=e[f])}),t},"filterTyped"),B=i(e=>{var r={};for(let t in e)e[t]&&(r[t]=e[t]);return r},"clean"),D=i(e=>{var r=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(t=>{e[t]&&(r[t]=e[t])}),r},"cleanTyped");var p=i((e,r,t=!1)=>{if(t&&typeof t!="function")throw new TypeError("obj: copyFn of type ("+t?.constuctor?.name+"), expected (Function)");if(r===void 0)return t?t(e):e;if(typeof e!="object"||e===null||typeof r!="object"||r===null)return r;var f={...e};for(let n in r)f[n]=p(e[n],r[n]);if(t)for(let n in e)r[n]===void 0&&(f[n]=t(e[n]));return f},"mergeDeep"),v=i((e,r,t,f=!1)=>{if(f&&typeof f!="function")throw new TypeError("obj: copyFn of type ("+f?.constuctor?.name+"), expected (Function)");if(r===void 0)return f?f(e):e;if(typeof e!="object"||e===null||typeof r!="object"||r===null||t===void 0)return r;var n={...e};for(let c in r)t[c]!==!1&&(n[c]=v(e[c],r[c],t[c],f));if(f)for(let c in e)r[c]===void 0&&(n[c]=f(e[c]));return n},"mergeByMap");var q=i((e,r,t)=>{u(r,"reducer");for(let f in e)t=r(t,e[f],f,e);return t},"reduce"),z=i((e,r,t)=>(u(r,"reducer"),Object.keys(e).forEach(f=>{t=r(t,e[f],f,e)}),t),"reduceTyped");var C=i((e,r)=>{u(r,"predicate");for(let t in e)if(r(e[t],t,e))return!0;return!1},"some"),G=i((e,r)=>{u(r,"predicate");var t=!1;return Object.keys(e).forEach(f=>{t=t?!0:r(e[f],f,e)}),t},"someTyped"),H=i((e,r)=>{u(r,"predicate");for(let t in e)if(!r(e[t],t,e))return!1;return!0},"every"),I=i((e,r)=>{u(r,"predicate");var t=!0;return Object.keys(e).forEach(f=>{t=t?r(e[f],f,e):!1}),t},"everyTyped");var l=i(e=>{if(!Array.isArray(e))throw new TypeError("obj: props of type ("+e?.constructor?.name+"), expected (Array)")},"checkProps"),J=i((e,r)=>{l(r);var t={};return r.forEach(f=>{t[f]=e[f]}),t},"pick"),L=i((e,r)=>{l(r);var t=Object.create(Object.getPrototypeOf(e));return r.forEach(f=>{t[f]=e[f]}),t},"pickTyped"),Q=i((e,r)=>{l(r);var t={};for(let f in e)r.includes(f)||(t[f]=e[f]);return t},"omit"),R=i((e,r)=>{l(r);var t=Object.create(Object.getPrototypeOf(e));return Object.keys(e).forEach(f=>{r.includes(f)||(t[f]=e[f])}),t},"omitTyped");var U=i(e=>{for(let r in e)typeof e[r]=="function"&&(e[r]=e[r].bind(e));return e},"bindAll"),V=i(e=>(Object.getOwnPropertyNames(r=>{typeof e[r]=="function"&&(e[r]=e[r].bind(e))}),e),"bindAllTyped");var X=i(()=>{var e=i(r=>function(...t){return r(this,...t)},"handle");for(let r in d)Object.defineProperty(Object.prototype,"$"+r,{value:e(d[r]),enumerable:!1})},"extendNative"),d={loop:m,loopProto:y,loopStrict:s,get:O,set:x,remove:h,update:g,find:T,findKey:P,findTyped:k,findMultiple:E,map:w,mapTyped:A,mapKeys:F,mapKeysTyped:K,reshape:S,reshapeTyped:M,filter:N,filterTyped:$,clean:B,cleanTyped:D,mergeDeep:p,mergeByMap:v,reduce:q,reduceTyped:z,some:C,someTyped:G,every:H,everyTyped:I,pick:J,pickTyped:L,omit:Q,omitTyped:R,bindAll:U,bindAllTyped:V,extendNative:X},ze=d;export{U as bindAll,V as bindAllTyped,B as clean,D as cleanTyped,ze as default,H as every,I as everyTyped,X as extendNative,N as filter,$ as filterTyped,T as find,P as findKey,E as findMultiple,k as findTyped,O as get,m as loop,y as loopProto,s as loopStrict,w as map,F as mapKeys,K as mapKeysTyped,A as mapTyped,v as mergeByMap,p as mergeDeep,Q as omit,R as omitTyped,J as pick,L as pickTyped,q as reduce,z as reduceTyped,h as remove,S as reshape,M as reshapeTyped,x as set,C as some,G as someTyped,g as update};
