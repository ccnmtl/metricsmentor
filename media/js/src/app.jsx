import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './containers/dashboard';
import { SimulationOne } from './simulations/simulation1/simulationOne';
import { SimulationTwo } from './simulations/simulation2/simulationTwo';
import { SimulationThree } from './simulations/simulation3/simulationThree';
import { SimulationFour } from './simulations/simulation4/simulationFour';
import { getCoursePk } from './utils/utils';

const isSuperUser = window.MetricsMentor.currentUser.is_superuser;
const coursePk = getCoursePk();

export const App = () => {
    const [initialVisibleSims, setInitialVisibleSims] = useState([]);
    const [isFaculty, setIsFaculty] = useState(null);

    useEffect(() => {
        const appContainer = document.querySelector('#react-root');
        const facultyStatus = appContainer ?
            appContainer.dataset.isFaculty === 'True' : false;
        setIsFaculty(facultyStatus);

        if (appContainer && appContainer.dataset.visibleSimulations) {
            try {
                const parsed = JSON.parse(
                    appContainer.dataset.visibleSimulations);
                setInitialVisibleSims(parsed);
            } catch (e) {
                console.error('Failed to parse visible simulations', e);
            }
        }
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
                        isFaculty={isFaculty}
                        initialVisibleSims={initialVisibleSims} />} />
                {(isSuperUser || isFaculty || coursePk === 6
                || initialVisibleSims.includes(1)) && (
                    <Route path='course/:courseId/simulations/1/'
                        element={<SimulationOne />} />
                )}
                {(isSuperUser || isFaculty || coursePk === 6
                || initialVisibleSims.includes(2)) && (
                    <Route path='course/:courseId/simulations/2/'
                        element={<SimulationTwo />} />
                )}
                {(isSuperUser || isFaculty || coursePk === 6
                || initialVisibleSims.includes(3)) && (
                    <Route path='course/:courseId/simulations/3/'
                        element={<SimulationThree />} />
                )}
                {(isSuperUser || isFaculty || coursePk === 6
                || initialVisibleSims.includes(4)) && (
                    <Route path='course/:courseId/simulations/4/'
                        element={<SimulationFour />} />
                )}
            </Routes>
        </Router>
    );
};
