import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const C = {bg:'#101820', panel:'#172632', ink:'#f5f0e6', muted:'#b6c2c8', gold:'#e6b85c', red:'#d66d5e', blue:'#70b8ca', green:'#8cb89c'};
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};

const Stick: React.FC<{x:number;y:number;s?:number;color?:string;pose?:number}> = ({x,y,s=1,color=C.ink,pose=0}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="0" cy="-76" r="24" fill={color} stroke="none"/>
    <path d="M0 -49 L0 30" />
    <path d={pose%2===0 ? "M0 -25 L-34 4 M0 -25 L35 -3" : "M0 -25 L-30 -4 M0 -25 L28 12"}/>
    <path d={pose%2===0 ? "M0 30 L-27 78 M0 30 L30 78" : "M0 30 L-35 68 M0 30 L24 82"}/>
  </g>
);
const Label: React.FC<{x:number;y:number;children:React.ReactNode;size?:number;color?:string;weight?:number}> = ({x,y,children,size=26,color=C.muted,weight=600}) =>
  <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} letterSpacing="2">{children}</text>;

const MapScene: React.FC<{f:number}> = ({f}) => {
  const pulse = 12 + Math.sin(f/8)*5;
  return <g>
    <path d="M1020 190 L1160 145 L1280 220 L1390 195 L1510 280 L1460 410 L1530 520 L1420 650 L1280 620 L1190 720 L1070 630 L1000 490 L1050 360Z" fill="#263d4a" stroke="#6f8792" strokeWidth="4"/>
    <path d="M1090 260 Q1260 340 1430 300 M1050 470 Q1260 420 1480 520 M1210 180 Q1180 430 1320 640" stroke="#55717f" strokeWidth="3" fill="none" strokeDasharray="9 13"/>
    <circle cx="1220" cy="365" r={pulse+8} fill="none" stroke={C.gold} strokeWidth="3" opacity=".55"/>
    <circle cx="1220" cy="365" r="11" fill={C.gold}/>
    <circle cx="1390" cy="500" r="10" fill={C.red}/>
    <path d={`M1220 365 Q1310 ${250+Math.sin(f/12)*30} 1390 500`} fill="none" stroke={C.gold} strokeWidth="5" strokeDasharray="12 12"/>
    <Label x={1160} y={410} size={20} color={C.ink}>INTELLIGENCE</Label>
  </g>;
};

const SceneArt: React.FC<{scene:number;f:number}> = ({scene,f}) => {
  const walk = Math.sin(f/5)*16;
  if(scene===0) return <g>
    <rect x="1060" y="250" width="560" height="420" rx="18" fill="#1a2b36" stroke="#47606d" strokeWidth="3"/>
    <path d="M1120 340 H1560 M1120 420 H1560 M1120 500 H1560" stroke="#334b59" strokeWidth="3"/>
    <MapScene f={f}/>
    <Stick x={980+walk} y={760} s={1.1} pose={Math.floor(f/8)}/>
  </g>;
  if(scene===1) return <g>
    <circle cx="1320" cy="440" r="230" fill="#1d3542" stroke={C.blue} strokeWidth="5"/>
    <path d="M1160 300 Q1320 180 1480 300 Q1540 440 1480 580 Q1320 700 1160 580 Q1100 440 1160 300Z" fill="none" stroke="#587887" strokeWidth="4"/>
    <path d="M1090 440 H1550 M1320 210 V670" stroke="#587887" strokeWidth="3" strokeDasharray="10 12"/>
    <path d="M1220 330 Q1320 260 1410 360 T1390 520" fill="none" stroke={C.gold} strokeWidth="7" strokeDasharray="14 12"/>
    <Stick x={1320} y={760} s={1.15} pose={Math.floor(f/9)}/>
  </g>;
  if(scene===2) return <g>
    <rect x="1040" y="230" width="610" height="430" rx="20" fill="#1b2d38" stroke="#58717e" strokeWidth="3"/>
    <rect x="1090" y="280" width="230" height="145" rx="10" fill="#263f4b"/>
    <rect x="1350" y="280" width="245" height="145" rx="10" fill="#263f4b"/>
    <rect x="1090" y="455" width="505" height="150" rx="10" fill="#223945"/>
    <path d="M1120 380 L1190 320 L1260 370 M1380 380 L1440 330 L1540 385" fill="none" stroke={C.gold} strokeWidth="5"/>
    <path d="M1130 520 H1550 M1130 555 H1480 M1130 590 H1510" stroke="#718894" strokeWidth="5"/>
    <Stick x={970+walk} y={760} s={1.05} pose={Math.floor(f/8)}/>
    <Stick x={1690-walk} y={760} s={1.05} color={C.blue} pose={Math.floor(f/8)+1}/>
  </g>;
  if(scene===3) return <g>
    <rect x="1050" y="250" width="590" height="390" rx="20" fill="#1c2d38" stroke="#506976" strokeWidth="3"/>
    <path d="M1120 550 L1240 420 L1360 470 L1510 330" stroke={C.gold} strokeWidth="8" fill="none" strokeDasharray="15 12"/>
    {[ [1120,550],[1240,420],[1360,470],[1510,330] ].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="15" fill={i===3?C.red:C.gold}/><circle cx={x} cy={y} r="28" fill="none" stroke={C.gold} opacity=".4"/></g>)}
    <Stick x={1320} y={770} s={1.2} pose={Math.floor(f/7)}/>
  </g>;
  if(scene===4) return <g>
    <path d="M1040 690 V380 L1180 290 L1320 380 V690Z" fill="#223844" stroke="#637b86" strokeWidth="4"/>
    <rect x="1190" y="460" width="95" height="230" fill="#101820"/>
    {[1080,1140,1200,1260].map(x=><rect key={x} x={x} y="420" width="32" height="42" fill={C.gold} opacity=".8"/>)}
    <Stick x={1450} y={770} s={1.2} color={C.blue} pose={Math.floor(f/8)}/>
    <circle cx="1450" cy="615" r={70+Math.sin(f/8)*8} fill="none" stroke={C.blue} strokeWidth="3" opacity=".4"/>
  </g>;
  return <g>
    <MapScene f={f}/>
    <Stick x={980+walk} y={760} s={1.15} pose={Math.floor(f/7)}/>
    <Stick x={1650-walk} y={760} s={1.15} color={C.blue} pose={Math.floor(f/7)+1}/>
    <path d="M1080 820 H1600" stroke={C.gold} strokeWidth="4" strokeDasharray="10 14"/>
  </g>;
};

const headings = [
  ['THE MOSSAD','A new intelligence service emerges'],
  ['BEYOND BORDERS','Information gathered far from home'],
  ['THE WORK','Sources. Reports. Patterns.'],
  ['CONNECTING CLUES','Small details can change the picture'],
  ['COVERT OPERATIONS','Some missions become public. Many do not.'],
  ['POWER IN SECRECY','An agency shaped by what the world cannot see'],
];
const accents = [C.gold,C.blue,C.gold,C.red,C.blue,C.gold];

export const MossadOneMinute: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scene = Math.min(5,Math.floor(frame/(10*fps)));
  const local = frame%(10*fps);
  const fade = interpolate(local,[0,18,270,299],[0,1,1,0],clamp);
  const slide = interpolate(local,[0,24],[55,0],{...clamp});
  const zoom = interpolate(local,[0,299],[1,1.055],clamp);
  return <AbsoluteFill style={{background:C.bg,fontFamily:'Arial, Helvetica, sans-serif',color:C.ink}}>
    <Audio src={staticFile('voice.mp3')} volume={1}/>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 72% 48%, #263d49 0%, #101820 66%)'}}/>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position:'absolute',inset:0}}>
      <g opacity=".16" stroke="#6d8794" strokeWidth="2">
        {Array.from({length:14},(_,i)=><path key={i} d={`M${i*150} 0 V1080`}/> )}
        {Array.from({length:8},(_,i)=><path key={i} d={`M0 ${i*150} H1920`}/> )}
      </g>
      <g transform={`translate(${(1-zoom)*960} ${(1-zoom)*540}) scale(${zoom})`}><SceneArt scene={scene} f={local}/></g>
      <rect x="0" y="0" width="1920" height="1080" fill="url(#shade)"/>
      <defs><linearGradient id="shade" x1="0" x2="1"><stop offset="0" stopColor="#101820" stopOpacity=".98"/><stop offset=".52" stopColor="#101820" stopOpacity=".78"/><stop offset="1" stopColor="#101820" stopOpacity=".08"/></linearGradient></defs>
      <g opacity={fade} transform={`translate(0 ${slide})`}>
        <Label x={130} y={270} size={24} color={accents[scene]}>PAST POLITICS  /  01 MINUTE HISTORY</Label>
        <text x="125" y="410" fill={C.ink} fontSize="92" fontWeight="900" letterSpacing="-2">{headings[scene][0]}</text>
        <text x="130" y="485" fill={C.muted} fontSize="34" fontWeight="500">{headings[scene][1]}</text>
        <path d="M130 530 H700" stroke={accents[scene]} strokeWidth="6"/>
      </g>
      <text x="130" y="930" fill="#91a4af" fontSize="22" letterSpacing="5">HISTORY • INTELLIGENCE • GEOPOLITICS</text>
      <text x="1785" y="930" fill="#91a4af" fontSize="22" textAnchor="end">{String(Math.floor(frame/fps)).padStart(2,'0')} / 60</text>
      <rect x="130" y="970" width="1660" height="5" fill="#344954"/>
      <rect x="130" y="970" width={1660*frame/1799} height="5" fill={C.gold}/>
    </svg>
  </AbsoluteFill>;
};
