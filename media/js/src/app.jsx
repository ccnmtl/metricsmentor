import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { SimulationOne } from './simulationOne/simulationOne';
import { SimulationTwo } from './simulationTwo/simulationTwo';

const isSuperUser = window.MetricsMentor.currentUser.is_superuser;

export const App = () => {
    const [isFaculty, setIsFaculty] = useState(null);

    useEffect(() => {
        const appContainer = document.querySelector('#react-root');
        const facultyStatus = appContainer ?
            appContainer.dataset.isFaculty === 'True' : false;
        setIsFaculty(facultyStatus);
    }, []);

    if (isFaculty === null) {
        return <div>Loading...</div>;
    }

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
