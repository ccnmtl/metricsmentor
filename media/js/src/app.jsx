import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { SimulationOne } from './simulationOne/simulationOne';
import { SimulationTwo } from './simulationTwo/simulationTwo';

const isSuperUser = window.MetricsMentor.currentUser.is_superuser;
const appContainer = document.querySelector('#rect-root');
const isFaculty = appContainer ? appContainer.dataset.isFaculty : null;

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='course/:courseId/simulations/'
                    element={<Dashboard
                        isSuperUser={isSuperUser}
                        isFaculty={isFaculty}/>} />
                {(isSuperUser || isFaculty) && (
                    <Route path='course/:courseId/simulations/1/'
                        element={<SimulationOne />} />
                )}
                {(isSuperUser || isFaculty) && (
                    <Route path='course/:courseId/simulations/2/'
                        element={<SimulationTwo />} />
                )}
            </Routes>
        </Router>
    );
};
