import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const Dashboard = () => {

    let { courseId } = useParams();

    return (
        <div className='card' style={{width: '18rem'}}>
            <div className='card-body'>
                <h5 className='card-title'>Simulation 1</h5>
                <p className='card-text'>
                    Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Link to={`/course/${courseId}/simulations/1/`}
                    className='btn btn-primary'>
                    Go
                </Link>
            </div>
        </div>
    );
};
