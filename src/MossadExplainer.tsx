import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const scenes = [
  {title:'THE MOSSAD', sub:'Israel’s foreign intelligence service', accent:'#e7bd61'},
  {title:'A NEW STATE', sub:'Founded in 1949, after Israel was established', accent:'#6cc7d0'},
  {title:'INTELLIGENCE', sub:'Collecting information beyond its borders', accent:'#e7bd61'},
  {title:'COVERT OPERATIONS', sub:'Secret missions shaped its reputation', accent:'#df806f'},
  {title:'A SHADOW AGENCY', sub:'Its work is often hidden from public view', accent:'#6cc7d0'},
  {title:'THE MOSSAD', sub:'Intelligence, secrecy, and global reach', accent:'#e7bd61'},
];
const Stickman: React.FC<{x:number; y:number; scale?:number; color?:string}> = ({x,y,scale=1,color='#f3f0e8'}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={color} strokeWidth="10" strokeLinecap="round" fill="none">
    <circle cx="0" cy="-72" r="24" fill={color} stroke="none"/>
    <path d="M0 -46 L0 38 M0 -20 L-36 8 M0 -20 L38 3 M0 38 L-30 82 M0 38 L32 82"/>
  </g>
);
export const MossadExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sceneIndex = Math.min(scenes.length-1, Math.floor(frame/(5*fps)));
  const local = frame%(5*fps);
  const s = scenes[sceneIndex];
  const fade = interpolate(local,[0,14,135,149],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const drift = interpolate(frame,[0,899],[0,80]);
  return <AbsoluteFill style={{background:'#101923',color:'#f5f2ea',fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 72% 45%, #263b4a 0%, #101923 65%)'}}/>
    <div style={{position:'absolute',left:100,top:90,fontSize:24,letterSpacing:7,color:'#aab8c2'}}>HISTORY / EXPLAINER</div>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <path d="M960 150 C1120 260 1200 390 1110 520 C1030 650 1240 750 1440 890" stroke="#547184" strokeWidth="3" fill="none" strokeDasharray="12 16" opacity=".5"/>
      <circle cx={1160+drift*.45} cy="430" r="190" fill="none" stroke={s.accent} strokeWidth="2" opacity=".2"/>
      <Stickman x={1160+drift*.45} y={690} scale={1.65}/>
      <path d="M0 900 Q450 840 900 900 T1920 890 L1920 1080 L0 1080Z" fill="#172734"/>
      <path d="M0 960 H1920" stroke="#3c5667" strokeWidth="3"/>
    </svg>
    <div style={{position:'absolute',left:120,top:330,width:920,opacity:fade,transform:`translateY(${interpolate(local,[0,30],[35,0],{extrapolateRight:'clamp'})}px)`}}>
      <div style={{fontSize:22,letterSpacing:6,color:s.accent,marginBottom:25}}>30-SECOND HISTORY</div>
      <div style={{fontSize:88,fontWeight:800,lineHeight:1.02,maxWidth:900}}>{s.title}</div>
      <div style={{fontSize:34,lineHeight:1.35,color:'#cbd5dc',marginTop:28,maxWidth:800}}>{s.sub}</div>
    </div>
    <div style={{position:'absolute',left:120,right:120,bottom:70,height:5,background:'#344653'}}>
      <div style={{height:'100%',width:`${frame/899*100}%`,background:'#e7bd61'}}/>
    </div>
    <div style={{position:'absolute',right:120,bottom:105,fontSize:18,color:'#9aabb6',letterSpacing:3}}>PAST POLITICS</div>
  </AbsoluteFill>;
};
