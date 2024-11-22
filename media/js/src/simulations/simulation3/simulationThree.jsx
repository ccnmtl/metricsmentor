import React, { useState } from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';
import { MulticollinearityScatterPlot } from './multicollinearityPlot';
import DATA from './generatedData.json';


export const SimulationThree = () => {

    const [stage, setStage] = useState(0);

    const handleStage = (e) => setStage(parseInt(e.target.value));

    return (
        <div className="simulation">
            <div className="simulation__workspace">
                Work space
            </div>
            <div className="simulation__graphspace">
                {['Skedasticity', 'Multicollinearity'].map((label, index) => (
                    <button onClick={handleStage} key={index} value={index}
                        className={'btn btn-light m-1'} disabled={stage===index}
                    >
                        {label}</button>))}
                {stage === 0 && <SkedasticityScatterPlot initialSlope={2}
                    initialIntercept={5} N={50} />}
                {stage === 1 && <MulticollinearityScatterPlot data={DATA} />}
            </div>
        </div>
    );
};
