import{r as R,j as t}from"./index-DFFB5JpH.js";import{P as q}from"./index-RMGVEQ_l.js";import{B as v}from"./Box-Bl1unST0.js";import{g as w,a as M,f as N,s as d,e as O,h as n,c as z,m as b,i as p,l as D,j as T,k as P,n as $}from"./createSimplePaletteValueFilter-B1PeVHaH.js";import{u as A}from"./index-CaRGT8Zy.js";function S(e){return w("MuiLinearProgress",e)}M("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","bar1","bar2","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);const y=4,h=$`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`,U=typeof h!="string"?P`
        animation: ${h} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,C=$`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`,K=typeof C!="string"?P`
        animation: ${C} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,x=$`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`,E=typeof x!="string"?P`
        animation: ${x} 3s infinite linear;
      `:null,W=e=>{const{classes:r,variant:a,color:i}=e,m={root:["root",`color${n(i)}`,a],dashed:["dashed",`dashedColor${n(i)}`],bar1:["bar","bar1",`barColor${n(i)}`,(a==="indeterminate"||a==="query")&&"bar1Indeterminate",a==="determinate"&&"bar1Determinate",a==="buffer"&&"bar1Buffer"],bar2:["bar","bar2",a!=="buffer"&&`barColor${n(i)}`,a==="buffer"&&`color${n(i)}`,(a==="indeterminate"||a==="query")&&"bar2Indeterminate",a==="buffer"&&"bar2Buffer"]};return z(m,S,r)},k=(e,r)=>e.vars?e.vars.palette.LinearProgress[`${r}Bg`]:e.palette.mode==="light"?D(e.palette[r].main,.62):T(e.palette[r].main,.5),X=d("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,r[`color${n(a.color)}`],r[a.variant]]}})(b(({theme:e})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(e.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:k(e,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),F=d("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.dashed,r[`dashedColor${n(a.color)}`]]}})(b(({theme:e})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(e.palette).filter(p()).map(([r])=>{const a=k(e,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`}}})]})),E||{animation:`${x} 3s infinite linear`}),V=d("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.bar,r.bar1,r[`barColor${n(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&r.bar1Indeterminate,a.variant==="determinate"&&r.bar1Determinate,a.variant==="buffer"&&r.bar1Buffer]}})(b(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(e.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:(e.vars||e).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${y}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${y}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:U||{animation:`${h} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),_=d("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.bar,r.bar2,r[`barColor${n(a.color)}`],(a.variant==="indeterminate"||a.variant==="query")&&r.bar2Indeterminate,a.variant==="buffer"&&r.bar2Buffer]}})(b(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(e.palette).filter(p()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(e.vars||e).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(e.palette).filter(p()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:k(e,r),transition:`transform .${y}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:K||{animation:`${C} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),G=R.forwardRef(function(r,a){const i=N({props:r,name:"MuiLinearProgress"}),{className:m,color:B="primary",value:g,valueBuffer:L,variant:s="indeterminate",...I}=i,l={...i,color:B,variant:s},f=W(l),j=A(),u={},c={bar1:{},bar2:{}};if((s==="determinate"||s==="buffer")&&g!==void 0){u["aria-valuenow"]=Math.round(g),u["aria-valuemin"]=0,u["aria-valuemax"]=100;let o=g-100;j&&(o=-o),c.bar1.transform=`translateX(${o}%)`}if(s==="buffer"&&L!==void 0){let o=(L||0)-100;j&&(o=-o),c.bar2.transform=`translateX(${o}%)`}return t.jsxs(X,{className:O(f.root,m),ownerState:l,role:"progressbar",...u,ref:a,...I,children:[s==="buffer"?t.jsx(F,{className:f.dashed,ownerState:l}):null,t.jsx(V,{className:f.bar1,ownerState:l,style:c.bar1}),s==="determinate"?null:t.jsx(_,{className:f.bar2,ownerState:l,style:c.bar2})]})});function H({value:e}){return t.jsxs(v,{display:"flex",alignItems:"center",gap:1,children:[t.jsx(v,{width:"100%",mr:1,children:t.jsx(G,{variant:"determinate",value:e,"aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":100})}),t.jsx(v,{minWidth:50,children:t.jsx("p",{className:"text-nowrap text-xs",children:`${Math.round(e)} marks`})})]})}H.propTypes={value:q.number.isRequired};export{H as L};
