var U=Object.defineProperty;var c=(r,e)=>U(r,"name",{value:e,configurable:!0});var y=c((r,e)=>{if(!Array.isArray(r))throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Array)`)},"checkarr"),C=c((r,e)=>{if(typeof r!="function")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Function)`)},"checkfn"),g=c((r,e="str")=>{if(typeof r!="string")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (String)`)},"checkstr"),M=c((r,e)=>{throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (String) or (Array)`)},"throwNotStrOrArr"),F=c(r=>{if(r?.constructor?.name!=="Command")throw new TypeError(`cli: command of type (${r?.constructor?.name}), expected (Command)`)},"checkcommand"),I=c((r,e,t=!1)=>{if(typeof r!="number")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<(t?0:1))throw new TypeError(`cli: ${e} is (${r}), expected positive integer`)},"checkpInt");var W=class{constructor(e,t,i="",n="",l={}){this.command=e;var o,a,s,f,h=!0,p=!1;if(typeof t=="object"&&t!==null)({name:o,description:i,Default:n,type:a,choices:s,converter:f,required:h,variadic:p}={name:"",description:"",Default:"",type:"",choices:[],converter:d=>d,required:!0,variadic:!1,...t});else{if({type:a,choices:s,converter:f}={type:"",choices:[],converter:d=>d,...l},g(t,"expression"),t.startsWith("<"))h=!0,o=t.slice(1,-1);else if(t.startsWith("["))h=!1,o=t.slice(1,-1);else throw new SyntaxError("cli: argument expression ("+t+") is not wrapped with [] or <>");o.startsWith("...")&&(p=!0,o=o.slice(3))}if(g(o,"name"),this.name=o,g(i,"description"),this.description=i,e.variadicArg){if(p)throw new Error("cli: adding variadic argument ("+o+") in presence of other");if(e.variadicArg.required)throw new Error("cli: adding argument ("+o+") in presence of required variadic argument");if(!h)throw new Error("cli: adding optional argument ("+o+") in presence of optional variadic argument")}if(p&&h&&e.optionalArgs.length!==0)throw new Error("cli: adding required variadic argument ("+o+") in presence of optional arguments");this.Default=n===""&&p?[]:n,y(s,"choices"),this.choices=s,g(a,"type"),this.type=a,C(f,"converter"),this.converter=f,this.required=h,this.variadic=p,p?e.variadicArg=this:h?e.requiredArgs.push(this):e.optionalArgs.push(this)}ofType(e){return g(e,"type"),this.type=e,this}setChoices(e){return y(e,"choices"),this.choices=e,this}setConverter(e){return C(e,"converter"),this.converter=e,this}argument(...e){return this.command.argument(...e)}option(...e){return this.command.option(...e)}handle(...e){return this.command.handle(...e)}};c(W,"Argument");var j=class{constructor(e,t,i="",n="",l="",o={}){this.command=e;var a="",s=[],f,h,p,d,w,m="",A,u,$,q,N=!1;if(t?.constructor===Object)({shortName:a,longNames:s,argName:m,description:n,Default:l,defaultFalse:f,defaultTrue:h,category:p,type:d,choices:w,converter:A,conflict:u,depends:$,required:q,variadic:N}={shortName:"",longNames:[],argName:"",description:"",Default:"",defaultFalse:!1,defaultTrue:!0,category:"",type:"",choices:[],converter:v=>v,conflict:[],depends:[],required:!1,variadic:!1,...t});else{if({defaultFalse:f,defaultTrue:h,category:p,type:d,choices:w,converter:A,conflict:u,depends:$}={defaultFalse:!1,defaultTrue:!0,category:"",type:"",choices:[],converter:v=>v,conflict:[],depends:[],...o},g(i,"argument expression"),i!==""){if(i.startsWith("<"))q=!0,m=i.slice(1,-1);else if(i.startsWith("["))q=!1,m=i.slice(1,-1);else throw new SyntaxError("cli: option argument expression ("+i+") is not wrapped with [] or <>");m.startsWith("...")&&(N=!0,m=m.slice(3))}y(t,"names"),t.forEach((v,L)=>{if(typeof v!="string")throw new TypeError("cli: name at index ("+L+") of type ("+v?.constructor?.name+"), expected (String)");if(v.startsWith("-")){if(v.startsWith("--"))return s.push(v.slice(2));if(v=v.slice(1),a)throw new Error("cli: adding short option name ("+v+") in presence of another ("+a+")");if(v.length!==1)throw new SyntaxError("cli: short option name ("+v+") of length ("+v.length+"), expected (1)");a=v}else throw new SyntaxError("cli: option name ("+v+") didnt start with - or --")})}g(a,"shortName"),y(s,"longNames"),this.shortName=a,this.longNames=s,g(m,"argName"),this.argName=m,g(n,"description"),this.description=n,g(p,"category"),this.category=p,this.CCName=(s[0]||a||"").replace(/-./g,v=>v.slice(1).toUpperCase()),this.Default=l===""&&N?[]:l,this.defaultFalse=f,this.defaultTrue=h,y(w,"choices"),this.choices=w,g(d,"type"),this.type=d,C(A,"converter"),this.converter=A,y(u,"conflict"),this.conflict=u,y($,"dependencies"),this.depends=$,this.required=q,this.variadic=N,e.opts.push(this),e.optMap[a]=this,s.forEach(v=>e.optMap[v]=this)}ofType(e){return g(e,"type"),this.type=e,this}setChoices(e){return y(e,"choices"),this.choices=e,this}setConverter(e){return C(e,"converter"),this.converter=e,this}setConflict(e){return y(e,"conflict"),this.conflict=e,this}setDepends(e){return y(e,"dependencies"),this.depends=e,this}argument(...e){return this.command.argument(...e)}option(...e){return this.command.option(...e)}handle(...e){return this.command.handle(...e)}};c(j,"Option");var D=[{type:"header"},{type:"usage"},{type:"arguments"},{type:"options",category:""},{type:"commands"}],k=c((r,e)=>{var t=[];return r.split(" ").forEach((i,n)=>{n===0||t[t.length-1].length+i.length+1>e?t.push(i):t[t.length-1]+=" "+i}),t},"splitIntoLines"),T=c(r=>{var e=r.name||r.argName,t=r.variadic?"...":"";return r.required?`<${t}${e}>`:`[${t}${e}]`},"handleArgExp"),O=c((r,e)=>{F(e);var t=r.config.helpMaxWidth;console.log(`
`+e.helpLayout.map(i=>{if(typeof i=="string")return k(i,t).join(`
`);if(typeof i=="string")return k(i(e),t).join(`
`);if(i?.type==="header")return B(e,t);if(i?.type==="usage")return V(e,t);if(i?.type==="arguments")return G(e,t);if(i?.type==="options")return Q(e,i.category,t);if(i?.type==="commands")return X(e,t);throw new Error("cli: undefined help section type ("+i?.type+")")}).filter(Boolean).join(`

`))},"help"),B=c((r,e)=>`${r.name}: ${r.summary}`+(r.description?k(`
`+r.description,e).join(`
`):""),"handleHeader"),V=c((r,e)=>{for(var t=[r.name],i=r;i.root;)i=i.root,t.push(i.name);var n=r.requiredArgs,l=r.optionalArgs,o=r.variadicArg;return k(`usage: ${t.reverse().join(" ")} ${n.length?n.map(T).join(" ")+" ":""}${l.length?l.map(T).join(" ")+" ":""}${o?T(o)+" ":""}${r.opts.length?"[options]":""}`,e)},"handleUsage"),S=c((r,e,t)=>{var i="",n=Math.min(r.reduce((s,f)=>s>f[0].length?s:f[0].length,0),e),l=t-n-4;for(let s=0;s<r.length;s++){var o=k(r[s][0],n),a=k(r[s][1],l);for(let f=0,h=Math.max(o.length,a.length);f<h;f++)i+="  "+(o[f]||"").padEnd(n),i+="  "+(a[f]||"")+`
`}return i.slice(0,-1)},"table2"),z=c(r=>{var e=[];return r.type&&e.push("type: "+r.type),String(r.Default)&&e.push("default: "+r.Default),r.choices.length&&e.push("choices: ("+r.choices.join(", ")+")"),e.length?r.description+" ("+e.join(", ")+")":r.description},"handleArgDesc"),G=c((r,e)=>r.requiredArgs.length===0&&r.optionalArgs.length===0&&!r.variadicArg?"":`arguments:
`+S([...r.requiredArgs,...r.optionalArgs,r.variadicArg].map(t=>[T(t),z(t)]),20,e),"handleArgs"),J=c(r=>{var e=(r.shortName?"-"+r.shortName+", ":"")+r.longNames.map(t=>"--"+t).join(", ");return e+(r.argName?" "+T(r):"")},"handleOptName"),K=c(r=>{var e=[];r.type&&e.push("type: "+r.type);var t=[];return String(r.Default)&&t.push(r.Default),r.defaultTrue!==!0&&t.push("specified: "+r.defaultTrue),r.defaultFalse!==!1&&t.push("negated: "+r.defaultFalse),t.length&&e.push("default: ("+t.join(", ")+")"),r.choices.length&&e.push("choices: ("+r.choices.join(", ")+")"),r.conflict.length&&e.push("conflict: ("+r.conflict.join(", ")+")"),r.depends.length&&e.push("dependencies: ("+r.depends.join(", ")+")"),e.length?r.description+" ("+e.join(", ")+")":r.description},"handleOptDesc"),Q=c((r,e,t)=>{var i=r.opts.filter(n=>n.category===e);return i.length===0?"":(e||"options")+`:
`+S(i.map(n=>[J(n),K(n)]),40,t)},"handleOpts"),X=c((r,e)=>r.commands.length===0?"":`commands:
`+S(r.commands.map(t=>[t.name,t.summary]),20,e),"handleCommands");var x=class{constructor(e,t,i="",n=()=>{}){this.root=e;var l="",o=[],a=D,s=[],f=[],h=[];typeof t=="object"&&t!==null&&({name:t,description:l,summary:i,aliases:o,helpLayout:a,args:s,opts:f,commands:h,handler:n}={name:"",description:"",summary:"",aliases:[],helpLayout:D,args:[],opts:[],commands:[],handler:()=>{},...t}),g(t,"name"),this.name=t,g(i,"summary"),this.summary=i,g(l,"description"),this.description="",y(o,"aliases"),this.aliases=o,y(a,"helpLayout"),this.helpLayout=a,this.requiredArgs=[],this.optionalArgs=[],this.opts=[],this.optMap={},this.variadicArg=null,y(s,"arguments"),s.forEach(p=>this.argument(p)),y(f,"options"),f.forEach(p=>this.option(p)),n!==void 0&&C(n,"handler"),this.handler=n||(()=>{}),this.commands=[],this.commandMap={},h.forEach(p=>this.command(p)),e&&(e.commands.push(this),e.commandMap[t]=this,o.forEach(p=>e.commandMap[p]=this))}describe(e,t){return t?[t,e]=[e,t]:t=this.summary,g(e,"description"),this.description=e,g(t,"summary"),this.summary=t,this}addAlias(e){return typeof e=="string"?(this.aliases.push(e),this.root&&(this.root.commandMap[e]=this)):Array.isArray(e)?(this.aliases.push(...e),this.root&&e.forEach(t=>this.root.commandMap[t]=this)):M(e,"alias"),this}handle(e){return C(e,"handler"),this.handler=e,this}command(...e){return new x(this,...e)}argument(...e){return new W(this,...e)}option(...e){return new j(this,...e)}};c(x,"Command");var Y=/[^"\s]+(?:"[^"]*")?|(?:"[^"]*")/g,Z=c(r=>r.replace(/-./g,e=>e.slice(1).toUpperCase()),"toCamelCase"),H=c((d,e)=>{var t=0,{passRemainingArgs:i,allowUnknownOpts:n}=e.config,l;Array.isArray(d)?l=d:typeof d=="string"?l=d.match(Y)||[]:M(d,"args");for(var o=e.rootCommand,a=o.commandMap[l[t]];a;)o=a,t++,a=o.commandMap[l[t]];if(l.length===t&&e.config.logHelpIfEmptyArgs)return e.help(o);var s=o.requiredArgs,f=o.optionalArgs,h=o.variadicArg,p=o.opts,d={};s.forEach(u=>d[u.name]=u.Default),f.forEach(u=>d[u.name]=u.Default),h&&(d[h.name]=h.Default),p.forEach(u=>d[u.CCName]=u.Default);var w=0,m=0,A=[];for(void 0;t<l.length;t++){let u=l[t];if(u==="-h")return e.help(o);if(u==="-v")return console.log(e.version);if(u==="--"){d["--"]=l.slice(t+1).join(" ");break}else u.startsWith("-")?t=P(u,o,d,t,l,A,n,e):[w,m]=R(u,o,d,w,m,i,e)}w!==s.length&&e.error("argument: unspecified required arguments ("+s.map(u=>u.name).slice(w).join(", ")+")"),h?.required&&d[h.name]===h.Default&&e.error("argument: unspecified required variadic argument ("+h.name+")"),p.forEach(u=>{var $=u.conflict.filter(N=>A.includes(N));$.length&&e.error("option: option ("+u.CCName+") can not be used with ("+$.join(", ")+")");var q=u.depends.filter(N=>!A.includes(N));q.length&&e.error("option: option ("+u.CCName+") requires ("+q.join(", ")+") to be specified")}),o.handler(d)},"parse"),E=c((r,e,t,i)=>(r.startsWith('"')&&(r=r.slice(1,-1)),e.choices.length!==0&&!e.choices.includes(r)&&i.error((t?"argument":"option")+": invalid choice ("+r+") for "+(t?"argument ("+e.name:"option ("+e.CCName)+"), expected ("+e.choices.join(", ")+")"),e.converter(r,e,i)),"argToValue"),R=c((r,e,t,i,n,l,o)=>{var a;if(i!==e.requiredArgs.length)return a=e.requiredArgs[i],t[a.name]=E(r,a,!0,o),[i+1,0];if(n!==e.optionalArgs.length)return a=e.optionalArgs[n],t[a.name]=E(r,a,!0,o),[i,n+1];if(e.variadicArg){a=e.variadicArg;let s=E(r,a,!0,o);return t[a.name]?t[a.name].push(s):t[a.name]=[s],[i,n]}return l&&(t["--"]?t["--"].push(r):t["--"]=[r]),[i,n]},"handleArgument"),_=c((r,e,t,i,n,l,o,a,s,f)=>(r.split(/(.)/).forEach(h=>{if(h!==""){var p=e.optMap[h];if(p)t?l[p.CCName]=p.defaultFalse:i?l[p.CCName]=E(i,p,!1,a):n.startsWith("-")?l[p.CCName]=p.defaultTrue:l[p.CCName]=E(n,p,!1,a),s.push(p.CCName);else{if(!f)return a.error("option: option ("+h+") is undefined");t?l[h]=!1:i?l[h]=i.startsWith('"')?i.slice(1,-1):i:n.startsWith("-")?l[h]=!0:l[h]=n.startsWith('"')?n.slice(1,-1):n}}}),n.startsWith("-")&&!i||t?o:o+1),"handleMultiShortOption"),P=c((r,e,t,i,n,l,o,a)=>{var s,f,h,p=!1,d=!1,w=n[i+1]||"-";if([s,f]=r.split("="),s.startsWith("--")?s=s.slice(2):(s=s.slice(1),d=!0),s.startsWith("no-")&&(s=s.slice(3),p=!0),d&&s.length!==1)if(/\d/.test(s[1]))[s,f]=[s.slice(0,1),s.slice(1)];else return _(s,e,p,f,w,t,i,a,l,o);var m=e.optMap[s];if(m)if(p)h=m.defaultFalse;else if(m.argName==="")h=m.defaultTrue;else if(f)h=E(f,m,!1,a);else if(m.variadic){var A=[];for(i++;i<n.length&&!n[i].startsWith("-");i++)A.push(n[i]);h=A.map(u=>E(u,m,!1,a)),A.length===0&&m.required&&a.error("option: required variadic option ("+s+") argument not specified")}else w.startsWith("-")?(h=m.defaultTrue,m.required&&a.error("option: required option ("+s+") argument is not specified")):(h=E(w,m,!1,a),i++);else return o||a.error("option: option ("+s+") is undefined"),p?h=!1:f?h=f.startsWith('"')?f.slice(1,-1):f:h=!0,t[Z(s)]=h,i;return t[m.CCName]=h,l.push(m.CCName),i},"handleOption");var b=class{constructor(e="",t="",i="0.0.0",n,l){g(e,"name"),this.name=e,g(i,"version"),this.version=i,this.config={logHelpIfEmptyArgs:!0,passRemainingArgs:!0,allowUnknownOpts:!0,helpMaxWidth:80,...n},I(this.config.helpMaxWidth,"helpMaxWidth"),this.rootCommand=new x(void 0,l||e,t)}command(...e){return new x(this.rootCommand,...e)}argument(...e){return this.rootCommand.argument(...e)}option(...e){return this.rootCommand.option(...e)}handle(e){return this.rootCommand.handle(e),this}describe(...e){return this.rootCommand.describe(...e),this}error(e){console.error(e),process.exit()}help(e=this.rootCommand){O(this,e)}parse(e=process.argv.slice(2)){H(e,this)}};c(b,"CLI");var ee=c((r,e,t,i,n)=>new b(r,e,t,i,n),"make");var je=ee;export{W as Argument,b as CLI,x as Command,j as Option,je as default,ee as make};
