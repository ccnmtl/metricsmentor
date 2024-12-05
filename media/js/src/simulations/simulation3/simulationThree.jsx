import React, { useState } from 'react';
import { SkedasticityScatterPlot } from './skedasticityPlot';
import { MulticollinearityScatterPlot } from './multicollinearityPlot';
import DATA from './generatedData.json';
import { Katex } from '../../utils/katexComponent';


export const SimulationThree = () => {

    const [stage, setStage] = useState(0);

    const handleStage = (e) => setStage(parseInt(e.target.value));

    return (
        <div className="simulation">
            <div className="simulation__workspace">
                {stage == 1 &&
                // Temporary Data Display, TO BE REFINED
                    <ul>
                        {[
                            `corr(y, x_1) = ${DATA.x1.rvalue}`,
                            `corr(x_1, x_2) = ${DATA.x2.rvalue}`,
                            `SE(\\hat \\beta_1) HTS-robust =  
                                ${DATA.x2.stderr}`,
                            `corr(x_1, x_3) =  ${DATA.x3.rvalue}`,
                            `SE(\\hat \\beta_1) HTS-robust = 
                                ${DATA.x3.stderr}`
                        ].map((fx,idx) => (
                            <li key={idx}><Katex tex={fx} /></li>
                        ))}
                    </ul>
                }
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
