import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { SimulationOne } from './simulationOne';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='course/:courseId/simulations/'
                    element={<Dashboard />} />
                <Route path='course/:courseId/simulations/1/'
                    element={<SimulationOne />} />

            </Routes>
        </Router>
    );
};
