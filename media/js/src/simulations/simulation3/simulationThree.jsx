import React from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';

export const SimulationThree = () => {
    return (
        <div className="simulation">
            <div className="simulation__workspace">
                Work space
            </div>
            <div className="simulation__graphspace">
                <SkedasticityScatterPlot initialSlope={2} initialIntercept={5}
                    N={50} />
            </div>
        </div>
    );
};
