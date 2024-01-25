import React from 'react';

export const Dashboard = () => {

    return (
        <div className='card' style={{width: '18rem'}}>
            <div className='card-body'>
                <h5 className='card-title'>Simulation 1</h5>
                <p className='card-text'>
                    Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href='/simulations/1/' className='btn btn-primary'>
                    Go
                </a>
            </div>
        </div>
    );
};
