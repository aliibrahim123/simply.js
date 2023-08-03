var v=Object.defineProperty;var e=(r,o)=>v(r,"name",{value:o,configurable:!0});var f=(r,o)=>{for(var a in o)v(r,a,{get:o[a],enumerable:!0})};var n={};f(n,{Default:()=>P,ansi256:()=>z,ansiRGB:()=>Q,bgAnsi256:()=>ur,bgAnsiRGB:()=>mr,bgBlack:()=>X,bgBlackBright:()=>xr,bgBlue:()=>tr,bgBlueBright:()=>ir,bgCyan:()=>ar,bgCyanBright:()=>fr,bgDefault:()=>V,bgGreen:()=>rr,bgGreenBright:()=>lr,bgMagenta:()=>or,bgMagentaBright:()=>vr,bgRed:()=>Z,bgRedBright:()=>nr,bgWhite:()=>pr,bgWhiteBright:()=>cr,bgYellow:()=>er,bgYellowBright:()=>sr,black:()=>D,blackBright:()=>H,blue:()=>W,blueBright:()=>Y,bold:()=>b,cyan:()=>J,cyanBright:()=>_,dim:()=>h,green:()=>L,greenBright:()=>O,hidden:()=>$,inverse:()=>w,italic:()=>g,magenta:()=>F,magentaBright:()=>j,noBold:()=>k,noDim:()=>T,noHidden:()=>I,noInverse:()=>C,noItalic:()=>E,noOverline:()=>S,noStrikethrough:()=>N,noUnderline:()=>A,overline:()=>d,red:()=>G,redBright:()=>M,reset:()=>m,strikethrough:()=>B,underline:()=>y,white:()=>K,whiteBright:()=>q,yellow:()=>R,yellowBright:()=>U});var c=e((r,o="str")=>{if(typeof r!="string")throw new TypeError(`cli: ${o} of type (${r?.constructor?.name}), expected (String)`)},"checkstr");var p=e((r,o,a=!1)=>{if(typeof r!="number")throw new TypeError(`cli: ${o} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<(a?0:1))throw new TypeError(`cli: ${o} is (${r}), expected positive integer`)},"checkpInt"),x=e((r,o,a=!1)=>{if(typeof r!="number")throw new TypeError(`cli: ${o} of type (${r?.constructor?.name}), expected (Number)`);if(!Number.isInteger(r)||r<0||r>(a?256:255))throw new TypeError(`cli: ${o} is (${r}), expected unsigned byte`)},"checkbyte");var m="\x1B[0m",t=e((r=!1,o,a)=>r===!1?"\x1B["+o+"m":"\x1B["+o+"m"+r+"\x1B["+a+"m","format"),b=e((r=!1)=>t(r,1,22),"bold"),h=e((r=!1)=>t(r,2,22),"dim"),g=e((r=!1)=>t(r,3,23),"italic"),y=e((r=!1)=>t(r,4,24),"underline"),d=e((r=!1)=>t(r,53,55),"overline"),w=e((r=!1)=>t(r,7,27),"inverse"),$=e((r=!1)=>t(r,8,28),"hidden"),B=e((r=!1)=>t(r,9,29),"strikethrough"),k="\x1B[22m",T="\x1B[22m",E="\x1B[23m",A="\x1B[24m",S="\x1B[55m",C="\x1B[27m",I="\x1B[28m",N="\x1B[29m",P="\x1B[39m",D=e((r=!1)=>t(r,30,39),"black"),G=e((r=!1)=>t(r,31,39),"red"),L=e((r=!1)=>t(r,32,39),"green"),R=e((r=!1)=>t(r,33,39),"yellow"),W=e((r=!1)=>t(r,34,39),"blue"),F=e((r=!1)=>t(r,35,39),"magenta"),J=e((r=!1)=>t(r,36,39),"cyan"),K=e((r=!1)=>t(r,37,39),"white"),H=e((r=!1)=>t(r,90,39),"blackBright"),M=e((r=!1)=>t(r,91,39),"redBright"),O=e((r=!1)=>t(r,92,39),"greenBright"),U=e((r=!1)=>t(r,93,39),"yellowBright"),Y=e((r=!1)=>t(r,94,39),"blueBright"),j=e((r=!1)=>t(r,95,39),"magentaBright"),_=e((r=!1)=>t(r,96,39),"cyanBright"),q=e((r=!1)=>t(r,97,39),"whiteBright"),z=e((r,o=!1)=>(x(r,"index",!0),t(o,"38;5;"+r,39)),"ansi256"),Q=e((r,o,a,l=!1)=>(x(r,"red"),x(o,"green"),x(a,"blue"),t(l,`38;2;${r};${o};${a}`,39)),"ansiRGB"),V="\x1B[49m",X=e((r=!1)=>t(r,40,49),"bgBlack"),Z=e((r=!1)=>t(r,41,49),"bgRed"),rr=e((r=!1)=>t(r,42,49),"bgGreen"),er=e((r=!1)=>t(r,43,49),"bgYellow"),tr=e((r=!1)=>t(r,44,49),"bgBlue"),or=e((r=!1)=>t(r,45,49),"bgMagenta"),ar=e((r=!1)=>t(r,46,49),"bgCyan"),pr=e((r=!1)=>t(r,47,49),"bgWhite"),xr=e((r=!1)=>t(r,100,49),"bgBlackBright"),nr=e((r=!1)=>t(r,101,49),"bgRedBright"),lr=e((r=!1)=>t(r,102,49),"bgGreenBright"),sr=e((r=!1)=>t(r,103,49),"bgYellowBright"),ir=e((r=!1)=>t(r,104,49),"bgBlueBright"),vr=e((r=!1)=>t(r,105,49),"bgMagentaBright"),fr=e((r=!1)=>t(r,106,49),"bgCyanBright"),cr=e((r=!1)=>t(r,107,49),"bgWhiteBright"),ur=e((r,o=!1)=>(x(r,"index",!0),t(o,"48;5;"+r,49)),"bgAnsi256"),mr=e((r,o,a,l=!1)=>(x(r,"red"),x(o,"green"),x(a,"blue"),t(l,`48;2;${r};${o};${a}`,49)),"bgAnsiRGB");var br={get(r,o,a){if(!(o in n)||typeof n[o]!="function")throw new ReferenceError("cli: style ("+o+") is undefined");return n[o].length!==0&&(r.lastStyleWasParametric=!0),r.styles.push([o]),a},apply(r,o,a){return r.lastStyleWasParametric?(r.styles[r.styles.length-1].push(...a),r.lastStyleWasParametric=!1,r.proxy):r.styles.reduce((l,i)=>n[i[0]](...i.slice(1),l),a[0])}},u=e(()=>{var r=new Proxy(()=>{},br);return r.proxy=r,r.styles=[],r},"styler");var s={};f(s,{backward:()=>wr,down:()=>yr,eraseAll:()=>Dr,eraseFrom:()=>Nr,eraseLine:()=>Rr,eraseLineFrom:()=>Gr,eraseLineTo:()=>Lr,eraseTo:()=>Pr,forward:()=>dr,hide:()=>Ar,moveTo:()=>hr,moveToCol:()=>kr,nextLine:()=>$r,prevLine:()=>Br,restorePos:()=>Er,savePos:()=>Tr,scrollDown:()=>Ir,scrollUp:()=>Cr,show:()=>Sr,up:()=>gr});var hr=e((r,o)=>(p(r,"line"),p(o,"column"),`\x1B[${r};${o}H`),"moveTo"),gr=e(r=>(p(r,"line"),"\x1B["+r+"A"),"up"),yr=e(r=>(p(r,"line"),"\x1B["+r+"B"),"down"),dr=e(r=>(p(r,"column"),"\x1B["+r+"C"),"forward"),wr=e(r=>(p(r,"column"),"\x1B["+r+"D"),"backward"),$r=e(r=>(p(r,"line"),"\x1B["+r+"E"),"nextLine"),Br=e(r=>(p(r,"line"),"\x1B["+r+"F"),"prevLine"),kr=e(r=>(p(r,"column"),"\x1B["+r+"G"),"moveToCol"),Tr="\x1B[s",Er="\x1B[u",Ar="\x1B[?25l",Sr="\x1B[?25h",Cr=e(r=>(p(r,"line"),"\x1B["+r+"S"),"scrollUp"),Ir=e(r=>(p(r,"line"),"\x1B["+r+"T"),"scrollDown"),Nr="\x1B[0J",Pr="\x1B[1J",Dr="\x1B[2J",Gr="\x1B[0K",Lr="\x1B[1K",Rr="\x1B[2K";var Wr=e((r,...o)=>(c(r,"name"),"\x1B["+o.join(";")+r),"code"),Qr={code:Wr,style:n,styler:u,cursor:s};export{P as Default,z as ansi256,Q as ansiRGB,wr as backward,ur as bgAnsi256,mr as bgAnsiRGB,X as bgBlack,xr as bgBlackBright,tr as bgBlue,ir as bgBlueBright,ar as bgCyan,fr as bgCyanBright,V as bgDefault,rr as bgGreen,lr as bgGreenBright,or as bgMagenta,vr as bgMagentaBright,Z as bgRed,nr as bgRedBright,pr as bgWhite,cr as bgWhiteBright,er as bgYellow,sr as bgYellowBright,D as black,H as blackBright,W as blue,Y as blueBright,b as bold,Wr as code,s as cursor,J as cyan,_ as cyanBright,Qr as default,h as dim,yr as down,Dr as eraseAll,Nr as eraseFrom,Rr as eraseLine,Gr as eraseLineFrom,Lr as eraseLineTo,Pr as eraseTo,dr as forward,L as green,O as greenBright,$ as hidden,Ar as hide,w as inverse,g as italic,F as magenta,j as magentaBright,hr as moveTo,kr as moveToCol,$r as nextLine,k as noBold,T as noDim,I as noHidden,C as noInverse,E as noItalic,S as noOverline,N as noStrikethrough,A as noUnderline,d as overline,Br as prevLine,G as red,M as redBright,m as reset,Er as restorePos,Tr as savePos,Ir as scrollDown,Cr as scrollUp,Sr as show,B as strikethrough,n as style,u as styler,y as underline,gr as up,K as white,q as whiteBright,R as yellow,U as yellowBright};
