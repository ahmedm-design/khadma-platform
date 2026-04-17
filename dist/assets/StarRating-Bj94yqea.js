import{c as i,j as t,h as x}from"./index-BsjW5P6d.js";import{S as p}from"./star-DhRkjWfS.js";/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=i("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);function y({value:l=0,max:a=5,size:c="sm",interactive:r=!1,onChange:e}){const o={sm:"w-4 h-4",md:"w-5 h-5",lg:"w-6 h-6"}[c]||"w-4 h-4";return t.jsx("div",{className:"flex items-center gap-0.5",children:Array.from({length:a},(s,m)=>m+1).map(s=>t.jsx(p,{className:x(o,"transition-colors",s<=l?"text-amber-400 fill-amber-400":"text-slate-300 dark:text-slate-600",r&&"cursor-pointer hover:text-amber-400 hover:fill-amber-400"),onClick:()=>r&&(e==null?void 0:e(s))},s))})}export{k as C,y as S};
