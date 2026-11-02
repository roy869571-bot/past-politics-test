import React from 'react';
import {Composition} from 'remotion';
import {MossadOneMinute} from './MossadOneMinute';
export const Root: React.FC = () => <Composition id="MossadOneMinute" component={MossadOneMinute} durationInFrames={1800} fps={30} width={1920} height={1080} />;
