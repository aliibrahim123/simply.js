var Lr=Object.defineProperty;var t=(r,e)=>Lr(r,"name",{value:e,configurable:!0});var c=t((r,e)=>e?r?.constructor===e:i=>r?.constructor===i,"isOfType"),y=t((r,e)=>e?r instanceof e:i=>r instanceof i,"isInstanceOf"),x=t(r=>typeof r=="string","isStringP"),l=t(r=>r?.constructor===String,"isString"),u=t(r=>typeof r=="number","isNumberP"),m=t(r=>r?.constructor===Number,"isNumber"),h=t(r=>typeof r=="boolean","isBooleanP"),g=t(r=>r?.constructor===Boolean,"isBoolean"),d=t(r=>typeof r=="bigint","isBigIntP"),b=t(r=>r?.constructor===BigInt,"isBigInt"),v=t(r=>typeof r=="symbol","isSymbol"),A=t(r=>r===null||typeof r!="object"&&typeof r!="function","isPrimitive"),N=t(r=>r===null,"isNull"),S=t(r=>r===void 0,"isUndefined"),O=t(r=>r==null,"isNill"),k=t(r=>r!==void 0,"isDefined"),I=t(r=>!!r,"isTruthy"),E=t(r=>!r,"isFalsy"),w=t(r=>r===!0,"isTrue"),B=t(r=>r===!1,"isFalse"),P=t(r=>typeof r=="object"||r!==null,"isObject"),T=t(r=>r?.constructor===Object,"isPlainObject"),j=Array.isArray,W=t(r=>typeof r?.length=="number"||typeof r?.size=="number","isArrayLike"),F=t(r=>{var e=typeof r?.length=="number"?r?.length:r?.size;return Number.isInteger(e)&&e>=0&&e<=Number.MAX_SAFE_INTEGER},"isSafeArrayLike"),L=t(r=>r instanceof ArrayBuffer,"isArrayBuffer"),R=t(r=>r instanceof TypedArray,"isTypedArray"),D=t(r=>r instanceof DataView,"isDataView"),U=t(r=>r instanceof Blob,"isBlob"),M=t(r=>r instanceof Date,"isDate"),C=t(r=>r instanceof RegExp,"isRegExp"),s=Number.isInteger,$=Number.isNaN,z=Number.isFinite,V=Number.isSafeInteger,_=t(r=>typeof r=="function","isFunction"),G=t(r=>r instanceof Promise,"isPromise"),X=t(r=>!!r?.prototype,"isConstructor"),q=t(r=>r instanceof Error,"isError"),H=t(r=>r instanceof Map,"isMap"),J=t(r=>r instanceof Set,"isSet"),K=t(r=>r instanceof WeakMap,"isWeakMap"),Q=t(r=>r instanceof WeakSet,"isWeakSet"),Y=t(r=>r?.length===0||r?.size===0||typeof r=="object"&&Object.keys(r).length===0,"isEmpty"),Z=t(r=>s(r)&&r>=-128&&r<=127,"isInt8"),rr=t(r=>s(r)&&r>=-32768&&r<=32767,"isInt16"),er=t(r=>s(r)&&r>=-2147483648&&r<=2147483647,"isInt32"),tr=t(r=>s(r)&&r>=0&&r<=255,"isUint8"),ir=t(r=>s(r)&&r>=0&&r<=65535,"isUint16"),or=t(r=>s(r)&&r>=0&&r<=4294967295,"isUint32"),Rr=Function.prototype.toString,nr=t(r=>typeof r=="function"&&Rr.call(r).includes("[native code]"),"isNative");var sr=Symbol("match:carry-check"),o=t((r,e=sr)=>{if(e===sr)return i=>o(i,r);if(typeof e=="function")return e(r);if(Array.isArray(e))return Array.isArray(r)&&e.every((i,n)=>o(i,r[n]));if(typeof e=="object"&&e!==null){if(e instanceof RegExp)return typeof r=="string"&&e.test(r);if(typeof r!="object"||r===null)return!1;if(e instanceof Date)return r instanceof Date&&Number(r)===Number(e);for(let i in e)if(!o(e[i],r[i]))return!1;return!0}return Object.is(e,r)},"check"),p=t((r,e,i)=>{if(!Array.isArray(e))throw new TypeError(`match: predicates of type (${e?.constructor?.name}), expected (Array)`);for(let n=0;n<e.length;n++){let a=e[n];if(!Array.isArray(a))throw new TypeError(`match: predicate at index (${n}) of type (${a?.constructor?.name}), expected (Array)`);if(o(r,a[0]))return typeof a[1]=="function"?a[1](r):a[1]}return typeof i=="function"?i(r):i},"handle"),ar=t(r=>(...e)=>p(r,e.slice(0,-1),e[e.length-1]),"match");var pr=t(r=>r,"otherwise");var fr=t(r=>e=>o(e,r),"is"),cr=t(r=>e=>e===r,"isStrictly"),yr=t(r=>e=>e==r,"isLosely"),xr=t(r=>e=>e!==r,"isNotStrictly"),lr=t(r=>e=>e!=r,"isNotLosely"),ur=t(r=>e=>e!=null&&e[r]!==void 0,"has"),mr=t(r=>e=>e!=null&&e.hasOwnProperty(r),"hasOwn"),hr=t((r,e,...i)=>n=>n!=null&&typeof n[r]=="function"&&o(n[r](...i),e),"callAndCheck");var gr=t(r=>e=>e>r,"gt"),dr=t(r=>e=>e<r,"lt"),br=t(r=>e=>e>=r,"gte"),vr=t(r=>e=>e<=r,"lte"),Ar=t((r,e)=>i=>i>r&&i<e,"inRange");var Nr=t(r=>{if(r.length===0)throw new TypeError("match: arguments length of (0)")},"checkargs"),Sr=t(r=>e=>e?.length===r||e?.size===r,"ofLength"),Or=t((r,e)=>i=>Array.isArray(i)&&i.includes(r,e),"includes"),kr=t((...r)=>Nr(r)&&(e=>{if(!e)return!1;for(let i=0;i<r.length;i++)if(!o(e[i],r[i]))return!1;return!0}),"firstOf"),Ir=t((...r)=>Nr(r)&&(e=>{if(!e)return!1;for(let i=0;i<r.length;i++)if(!o(e[e.length-(r.length-i)],r[i]))return!1;return!0}),"lastOf"),Er=t(r=>e=>Array.isArray(e)&&e.length&&e.every(i=>o(i,r)),"every"),wr=t(r=>e=>Array.isArray(e)&&e.length&&e.some(i=>o(i,r)),"some");var Br=t(r=>e=>typeof e=="string"&&e.startsWith(r),"startsWith"),Pr=t(r=>e=>typeof e=="string"&&e.endsWith(r),"endsWith"),Tr=t(r=>{if(typeof r!="string"&&!(r instanceof RegExp))throw new TypeError("match: matcher of type ("+r?.constructor?.name+"), expected (String) or (RegExp)");return typeof r=="string"?e=>e.includes(r):e=>r.test(e)},"matchString");var jr=t(r=>e=>!o(e,r),"not"),Wr=t((...r)=>e=>r.some(i=>o(e,i)),"anyOff"),Fr=t((...r)=>e=>r.every(i=>o(e,i)),"allOff");var f={match:ar,handle:p,check:o,otherwise:pr,is:fr,isStrictly:cr,isLosely:yr,isNotStrictly:xr,isNotLosely:lr,has:ur,hasOwn:mr,callAndCheck:hr,not:jr,allOff:Fr,anyOff:Wr,gt:gr,lt:dr,gte:br,lte:vr,inRange:Ar,ofLength:Sr,includes:Or,firstOf:kr,lastOf:Ir,every:Er,some:wr,startsWith:Br,endsWith:Pr,matchString:Tr,isOfType:c,isInstanceOf:y,isStringP:x,isString:l,isNumberP:u,isNumber:m,isBooleanP:h,isBoolean:g,isBigIntP:d,isBigInt:b,isSymbol:v,isPrimitive:A,isNull:N,isUndefined:S,isNill:O,isDefined:k,isTruthy:I,isFalsy:E,isTrue:w,isFalse:B,isObject:P,isPlainObject:T,isArray:j,isArrayLike:W,isSafeArrayLike:F,isArrayBuffer:L,isTypedArray:R,isDataView:D,isBlob:U,isDate:M,isRegExp:C,isInteger:s,isNaN:$,isFinite:z,isSafeInteger:V,isFunction:_,isPromise:G,isConstructor:X,isError:q,isMap:H,isSet:J,isWeakMap:K,isWeakSet:Q,isEmpty:Y,isInt8:Z,isInt16:rr,isInt32:er,isUint8:tr,isUint16:ir,isUint32:or,isNative:nr};globalThis.$match=f;var ce=f;export{Fr as allOff,Wr as anyOff,hr as callAndCheck,o as check,ce as default,Pr as endsWith,Er as every,kr as firstOf,gr as gt,br as gte,p as handle,ur as has,mr as hasOwn,Ar as inRange,Or as includes,fr as is,j as isArray,L as isArrayBuffer,W as isArrayLike,b as isBigInt,d as isBigIntP,U as isBlob,g as isBoolean,h as isBooleanP,X as isConstructor,D as isDataView,M as isDate,k as isDefined,Y as isEmpty,q as isError,B as isFalse,E as isFalsy,z as isFinite,_ as isFunction,y as isInstanceOf,rr as isInt16,er as isInt32,Z as isInt8,s as isInteger,yr as isLosely,H as isMap,$ as isNaN,nr as isNative,O as isNill,lr as isNotLosely,xr as isNotStrictly,N as isNull,m as isNumber,u as isNumberP,P as isObject,c as isOfType,T as isPlainObject,A as isPrimitive,G as isPromise,C as isRegExp,F as isSafeArrayLike,V as isSafeInteger,J as isSet,cr as isStrictly,l as isString,x as isStringP,v as isSymbol,w as isTrue,I as isTruthy,R as isTypedArray,ir as isUint16,or as isUint32,tr as isUint8,S as isUndefined,K as isWeakMap,Q as isWeakSet,Ir as lastOf,dr as lt,vr as lte,ar as match,Tr as matchString,jr as not,Sr as ofLength,pr as otherwise,wr as some,Br as startsWith};
