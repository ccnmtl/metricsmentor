import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const Dashboard = () => {

    let { courseId } = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className='card m-1' style={{width: '18rem'}}>
                    <div className='card-body'>
                        <h5 className='card-title' data-cy="sim-1">
                            Simulation 1</h5>
                        <p className='card-text'>
                            Lorum ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                        <Link to={`/course/${courseId}/simulations/1/`}
                            className='btn btn-primary' data-cy="sim-1-link">
                            Go
                        </Link>
                    </div>
                </div>
                <div className='card m-1' style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className='card-title' data-cy="sim-2">
                            Simulation 2</h5>
                        <p className='card-text'>
                            Acording to all known laws of avaition, there is no
                            way a bee should be able to fly.
                        </p>
                        <Link to={`/course/${courseId}/simulations/2/`}
                            className='btn btn-primary' data-cy="sim-2-link">
                            Go
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
