var V=Object.defineProperty;var c=(r,e)=>V(r,"name",{value:e,configurable:!0});var y=c((r,e)=>{if(!Array.isArray(r))throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Array)`)},"checkarr"),C=c((r,e)=>{if(typeof r!="function")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Function)`)},"checkfn"),g=c((r,e="str")=>{if(typeof r!="string")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (String)`)},"checkstr"),M=c((r,e)=>{throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (String) or (Array)`)},"throwNotStrOrArr"),I=c(r=>{if(r?.constructor?.name!=="Command")throw new TypeError(`cli: command of type (${r?.constructor?.name}), expected (Command)`)},"checkcommand"),F=c((r,e,t=!1)=>{if(typeof r!="number")throw new TypeError(`cli: ${e} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<(t?0:1))throw new TypeError(`cli: ${e} is (${r}), expected positive integer`)},"checkpInt");var W=class{constructor(e,t,i="",s="",l={}){this.command=e;var o,a,n,f,h=!0,p=!1;if(typeof t=="object"&&t!==null)({name:o,description:i,Default:s,type:a,choices:n,converter:f,required:h,variadic:p}={name:"",description:"",Default:"",type:"",choices:[],converter:d=>d,required:!0,variadic:!1,...t});else{if({type:a,choices:n,converter:f}={type:"",choices:[],converter:d=>d,...l},g(t,"expression"),t.startsWith("<"))h=!0,o=t.slice(1,-1);else if(t.startsWith("["))h=!1,o=t.slice(1,-1);else throw new SyntaxError("cli: argument expression ("+t+") is not wrapped with [] or <>");o.startsWith("...")&&(p=!0,o=o.slice(3))}if(g(o,"name"),this.name=o,g(i,"description"),this.description=i,e.variadicArg){if(p)throw new Error("cli: adding variadic argument ("+o+") in presence of other");if(e.variadicArg.required)throw new Error("cli: adding argument ("+o+") in presence of required variadic argument");if(!h)throw new Error("cli: adding optional argument ("+o+") in presence of optional variadic argument")}if(p&&h&&e.optionalArgs.length!==0)throw new Error("cli: adding required variadic argument ("+o+") in presence of optional arguments");this.Default=s===""&&p?[]:s,y(n,"choices"),this.choices=n,g(a,"type"),this.type=a,C(f,"converter"),this.converter=f,this.required=h,this.variadic=p,p?e.variadicArg=this:h?e.requiredArgs.push(this):e.optionalArgs.push(this)}ofType(e){return g(e,"type"),this.type=e,this}setChoices(e){return y(e,"choices"),this.choices=e,this}setConverter(e){return C(e,"converter"),this.converter=e,this}argument(...e){return this.command.argument(...e)}option(...e){return this.command.option(...e)}handle(...e){return this.command.handle(...e)}};c(W,"Argument");var k=class{constructor(e,t,i="",s="",l="",o={}){this.command=e;var a="",n=[],f,h,p,d,w,m="",A,u,$,q,N=!1;if(t?.constructor===Object)({shortName:a,longNames:n,argName:m,description:s,Default:l,defaultFalse:f,defaultTrue:h,category:p,type:d,choices:w,converter:A,conflict:u,depends:$,required:q,variadic:N}={shortName:"",longNames:[],argName:"",description:"",Default:"",defaultFalse:!1,defaultTrue:!0,category:"",type:"",choices:[],converter:v=>v,conflict:[],depends:[],required:!1,variadic:!1,...t});else{if({defaultFalse:f,defaultTrue:h,category:p,type:d,choices:w,converter:A,conflict:u,depends:$}={defaultFalse:!1,defaultTrue:!0,category:"",type:"",choices:[],converter:v=>v,conflict:[],depends:[],...o},g(i,"argument expression"),i!==""){if(i.startsWith("<"))q=!0,m=i.slice(1,-1);else if(i.startsWith("["))q=!1,m=i.slice(1,-1);else throw new SyntaxError("cli: option argument expression ("+i+") is not wrapped with [] or <>");m.startsWith("...")&&(N=!0,m=m.slice(3))}y(t,"names"),t.forEach((v,B)=>{if(typeof v!="string")throw new TypeError("cli: name at index ("+B+") of type ("+v?.constructor?.name+"), expected (String)");if(v.startsWith("-")){if(v.startsWith("--"))return n.push(v.slice(2));if(v=v.slice(1),a)throw new Error("cli: adding short option name ("+v+") in presence of another ("+a+")");if(v.length!==1)throw new SyntaxError("cli: short option name ("+v+") of length ("+v.length+"), expected (1)");a=v}else throw new SyntaxError("cli: option name ("+v+") didnt start with - or --")})}g(a,"shortName"),y(n,"longNames"),this.shortName=a,this.longNames=n,g(m,"argName"),this.argName=m,g(s,"description"),this.description=s,g(p,"category"),this.category=p,this.CCName=(n[0]||a||"").replace(/-./g,v=>v.slice(1).toUpperCase()),this.Default=l===""&&N?[]:l,this.defaultFalse=f,this.defaultTrue=h,y(w,"choices"),this.choices=w,g(d,"type"),this.type=d,C(A,"converter"),this.converter=A,y(u,"conflict"),this.conflict=u,y($,"dependencies"),this.depends=$,this.required=q,this.variadic=N,e.opts.push(this),e.optMap[a]=this,n.forEach(v=>e.optMap[v]=this)}ofType(e){return g(e,"type"),this.type=e,this}setChoices(e){return y(e,"choices"),this.choices=e,this}setConverter(e){return C(e,"converter"),this.converter=e,this}setConflict(e){return y(e,"conflict"),this.conflict=e,this}setDepends(e){return y(e,"dependencies"),this.depends=e,this}argument(...e){return this.command.argument(...e)}option(...e){return this.command.option(...e)}handle(...e){return this.command.handle(...e)}};c(k,"Option");var D=[{type:"header"},{type:"usage"},{type:"arguments"},{type:"options",category:""},{type:"commands"}],T=c((r,e)=>{var t=[];return r.split(" ").forEach((i,s)=>{s===0||t[t.length-1].length+i.length+1>e?t.push(i):t[t.length-1]+=" "+i}),t},"splitIntoLines"),j=c(r=>{var e=r.name||r.argName,t=r.variadic?"...":"";return r.required?`<${t}${e}>`:`[${t}${e}]`},"handleArgExp"),O=c((r,e)=>{I(e);var t=r.config.helpMaxWidth;console.log(`
`+e.helpLayout.map(i=>{if(typeof i=="string")return T(i,t).join(`
`);if(typeof i=="string")return T(i(e),t).join(`
`);if(i?.type==="header")return z(e,t);if(i?.type==="usage")return G(e,t);if(i?.type==="arguments")return K(e,t);if(i?.type==="options")return Y(e,i.category,t);if(i?.type==="commands")return Z(e,t);throw new Error("cli: undefined help section type ("+i?.type+")")}).filter(Boolean).join(`

`))},"help"),z=c((r,e)=>`${r.name}: ${r.summary}`+(r.description?T(`
`+r.description,e).join(`
`):""),"handleHeader"),G=c((r,e)=>{for(var t=[r.name],i=r;i.root;)i=i.root,t.push(i.name);var s=r.requiredArgs,l=r.optionalArgs,o=r.variadicArg;return T(`usage: ${t.reverse().join(" ")} ${s.length?s.map(j).join(" ")+" ":""}${l.length?l.map(j).join(" ")+" ":""}${o?j(o)+" ":""}${r.opts.length?"[options]":""}`,e)},"handleUsage"),S=c((r,e,t)=>{var i="",s=Math.min(r.reduce((n,f)=>n>f[0].length?n:f[0].length,0),e),l=t-s-4;for(let n=0;n<r.length;n++){var o=T(r[n][0],s),a=T(r[n][1],l);for(let f=0,h=Math.max(o.length,a.length);f<h;f++)i+="  "+(o[f]||"").padEnd(s),i+="  "+(a[f]||"")+`
`}return i.slice(0,-1)},"table2"),J=c(r=>{var e=[];return r.type&&e.push("type: "+r.type),String(r.Default)&&e.push("default: "+r.Default),r.choices.length&&e.push("choices: ("+r.choices.join(", ")+")"),e.length?r.description+" ("+e.join(", ")+")":r.description},"handleArgDesc"),K=c((r,e)=>r.requiredArgs.length===0&&r.optionalArgs.length===0&&!r.variadicArg?"":`arguments:
`+S([...r.requiredArgs,...r.optionalArgs,r.variadicArg].map(t=>[j(t),J(t)]),20,e),"handleArgs"),Q=c(r=>{var e=(r.shortName?"-"+r.shortName+", ":"")+r.longNames.map(t=>"--"+t).join(", ");return e+(r.argName?" "+j(r):"")},"handleOptName"),X=c(r=>{var e=[];r.type&&e.push("type: "+r.type);var t=[];return String(r.Default)&&t.push(r.Default),r.defaultTrue!==!0&&t.push("specified: "+r.defaultTrue),r.defaultFalse!==!1&&t.push("negated: "+r.defaultFalse),t.length&&e.push("default: ("+t.join(", ")+")"),r.choices.length&&e.push("choices: ("+r.choices.join(", ")+")"),r.conflict.length&&e.push("conflict: ("+r.conflict.join(", ")+")"),r.depends.length&&e.push("dependencies: ("+r.depends.join(", ")+")"),e.length?r.description+" ("+e.join(", ")+")":r.description},"handleOptDesc"),Y=c((r,e,t)=>{var i=r.opts.filter(s=>s.category===e);return i.length===0?"":(e||"options")+`:
`+S(i.map(s=>[Q(s),X(s)]),40,t)},"handleOpts"),Z=c((r,e)=>r.commands.length===0?"":`commands:
`+S(r.commands.map(t=>[t.name,t.summary]),20,e),"handleCommands");var x=class{constructor(e,t,i="",s=()=>{}){this.root=e;var l="",o=[],a=D,n=[],f=[],h=[];typeof t=="object"&&t!==null&&({name:t,description:l,summary:i,aliases:o,helpLayout:a,args:n,opts:f,commands:h,handler:s}={name:"",description:"",summary:"",aliases:[],helpLayout:D,args:[],opts:[],commands:[],handler:()=>{},...t}),g(t,"name"),this.name=t,g(i,"summary"),this.summary=i,g(l,"description"),this.description="",y(o,"aliases"),this.aliases=o,y(a,"helpLayout"),this.helpLayout=a,this.requiredArgs=[],this.optionalArgs=[],this.opts=[],this.optMap={},this.variadicArg=null,y(n,"arguments"),n.forEach(p=>this.argument(p)),y(f,"options"),f.forEach(p=>this.option(p)),s!==void 0&&C(s,"handler"),this.handler=s||(()=>{}),this.commands=[],this.commandMap={},h.forEach(p=>this.command(p)),e&&(e.commands.push(this),e.commandMap[t]=this,o.forEach(p=>e.commandMap[p]=this))}describe(e,t){return t?[t,e]=[e,t]:t=this.summary,g(e,"description"),this.description=e,g(t,"summary"),this.summary=t,this}addAlias(e){return typeof e=="string"?(this.aliases.push(e),this.root&&(this.root.commandMap[e]=this)):Array.isArray(e)?(this.aliases.push(...e),this.root&&e.forEach(t=>this.root.commandMap[t]=this)):M(e,"alias"),this}handle(e){return C(e,"handler"),this.handler=e,this}command(...e){return new x(this,...e)}argument(...e){return new W(this,...e)}option(...e){return new k(this,...e)}};c(x,"Command");var R=/[^"\s]+(?:"[^"]*")?|(?:"[^"]*")/g,_=c(r=>r.replace(/-./g,e=>e.slice(1).toUpperCase()),"toCamelCase"),H=c((d,e)=>{var t=0,{passRemainingArgs:i,allowUnknownOpts:s}=e.config,l;Array.isArray(d)?l=d:typeof d=="string"?l=d.match(R)||[]:M(d,"args");for(var o=e.rootCommand,a=o.commandMap[l[t]];a;)o=a,t++,a=o.commandMap[l[t]];if(l.length===t&&e.config.logHelpIfEmptyArgs)return e.help(o);var n=o.requiredArgs,f=o.optionalArgs,h=o.variadicArg,p=o.opts,d={};n.forEach(u=>d[u.name]=u.Default),f.forEach(u=>d[u.name]=u.Default),h&&(d[h.name]=h.Default),p.forEach(u=>d[u.CCName]=u.Default);var w=0,m=0,A=[];for(void 0;t<l.length;t++){let u=l[t];if(u==="-h")return e.help(o);if(u==="-v")return console.log(e.version);if(u==="--"){d["--"]=l.slice(t+1).join(" ");break}else u.startsWith("-")?t=re(u,o,d,t,l,A,s,e):[w,m]=P(u,o,d,w,m,i,e)}w!==n.length&&e.error("argument: unspecified required arguments ("+n.map(u=>u.name).slice(w).join(", ")+")"),h?.required&&d[h.name]===h.Default&&e.error("argument: unspecified required variadic argument ("+h.name+")"),p.forEach(u=>{var $=u.conflict.filter(N=>A.includes(N));$.length&&e.error("option: option ("+u.CCName+") can not be used with ("+$.join(", ")+")");var q=u.depends.filter(N=>!A.includes(N));q.length&&e.error("option: option ("+u.CCName+") requires ("+q.join(", ")+") to be specified")}),o.handler(d)},"parse"),E=c((r,e,t,i)=>(r.startsWith('"')&&(r=r.slice(1,-1)),e.choices.length!==0&&!e.choices.includes(r)&&i.error((t?"argument":"option")+": invalid choice ("+r+") for "+(t?"argument ("+e.name:"option ("+e.CCName)+"), expected ("+e.choices.join(", ")+")"),e.converter(r,e,i)),"argToValue"),P=c((r,e,t,i,s,l,o)=>{var a;if(i!==e.requiredArgs.length)return a=e.requiredArgs[i],t[a.name]=E(r,a,!0,o),[i+1,0];if(s!==e.optionalArgs.length)return a=e.optionalArgs[s],t[a.name]=E(r,a,!0,o),[i,s+1];if(e.variadicArg){a=e.variadicArg;let n=E(r,a,!0,o);return t[a.name]?t[a.name].push(n):t[a.name]=[n],[i,s]}return l&&(t["--"]?t["--"].push(r):t["--"]=[r]),[i,s]},"handleArgument"),ee=c((r,e,t,i,s,l,o,a,n,f)=>(r.split(/(.)/).forEach(h=>{if(h!==""){var p=e.optMap[h];if(p)t?l[p.CCName]=p.defaultFalse:i?l[p.CCName]=E(i,p,!1,a):s.startsWith("-")?l[p.CCName]=p.defaultTrue:l[p.CCName]=E(s,p,!1,a),n.push(p.CCName);else{if(!f)return a.error("option: option ("+h+") is undefined");t?l[h]=!1:i?l[h]=i.startsWith('"')?i.slice(1,-1):i:s.startsWith("-")?l[h]=!0:l[h]=s.startsWith('"')?s.slice(1,-1):s}}}),s.startsWith("-")&&!i||t?o:o+1),"handleMultiShortOption"),re=c((r,e,t,i,s,l,o,a)=>{var n,f,h,p=!1,d=!1,w=s[i+1]||"-";if([n,f]=r.split("="),n.startsWith("--")?n=n.slice(2):(n=n.slice(1),d=!0),n.startsWith("no-")&&(n=n.slice(3),p=!0),d&&n.length!==1)if(/\d/.test(n[1]))[n,f]=[n.slice(0,1),n.slice(1)];else return ee(n,e,p,f,w,t,i,a,l,o);var m=e.optMap[n];if(m)if(p)h=m.defaultFalse;else if(m.argName==="")h=m.defaultTrue;else if(f)h=E(f,m,!1,a);else if(m.variadic){var A=[];for(i++;i<s.length&&!s[i].startsWith("-");i++)A.push(s[i]);h=A.map(u=>E(u,m,!1,a)),A.length===0&&m.required&&a.error("option: required variadic option ("+n+") argument not specified")}else w.startsWith("-")?(h=m.defaultTrue,m.required&&a.error("option: required option ("+n+") argument is not specified")):(h=E(w,m,!1,a),i++);else return o||a.error("option: option ("+n+") is undefined"),p?h=!1:f?h=f.startsWith('"')?f.slice(1,-1):f:h=!0,t[_(n)]=h,i;return t[m.CCName]=h,l.push(m.CCName),i},"handleOption");var b=class{constructor(e="",t="",i="0.0.0",s,l){g(e,"name"),this.name=e,g(i,"version"),this.version=i,this.config={logHelpIfEmptyArgs:!0,passRemainingArgs:!0,allowUnknownOpts:!0,helpMaxWidth:80,...s},F(this.config.helpMaxWidth,"helpMaxWidth"),this.rootCommand=new x(void 0,l||e,t)}command(...e){return new x(this.rootCommand,...e)}argument(...e){return this.rootCommand.argument(...e)}option(...e){return this.rootCommand.option(...e)}handle(e){return this.rootCommand.handle(e),this}describe(...e){return this.rootCommand.describe(...e),this}error(e){console.error(e),process.exit()}help(e=this.rootCommand){O(this,e)}parse(e=process.argv.slice(2)){H(e,this)}};c(b,"CLI");var te=c((r,e,t,i,s)=>new b(r,e,t,i,s),"make");var L=te;var U=c((r,e,t="runner")=>{var i=L(t,"run tests","",{logHelpIfEmptyArgs:!1});return i.argument("[...suites]","suites to run",[""]).option(["-t","--tags"],"<...tags>","include only tests that include these tags").option(["-i","--interval"],"<ms>","interval",20,{type:"number in ms"}).handle(({suites:s,tags:l,interval:o})=>r(s,{tags:l,interval:o},e)),i},"cliInputter"),De=U;globalThis.$test&&($test.cliInputter=U);export{De as default};
