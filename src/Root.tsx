import React from 'react';
import {Composition} from 'remotion';
import {MossadExplainer} from './MossadExplainer';
export const Root: React.FC = () => <Composition id="MossadExplainer" component={MossadExplainer} durationInFrames={900} fps={30} width={1920} height={1080} />;
