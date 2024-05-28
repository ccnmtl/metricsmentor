import React from 'react';
import pvalue1 from '../../../img/pvalue-table-page01.png';
import pvalue2 from '../../../img/pvalue-table-page02.png';

export const PvalueModal = () => {

    return (
        <div className="modal fade" id="pvalueModal" tabIndex="-1"
            aria-labelledby="pvalueModalLabel" aria-hidden="true"
            data-bs-backdrop="false">
            <div className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: '80%' }}>
                <div className="modal-content" style={{ height: '80vh' }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="pvalueModalLabel">
                        P Values
                        </h5>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div id="pvalueCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button"
                                    data-bs-target="#pvalueCarousel"
                                    data-bs-slide-to="0" className="active"
                                    aria-current="true" aria-label="Slide 1">

                                </button>
                                <button type="button"
                                    data-bs-target="#pvalueCarousel"
                                    data-bs-slide-to="1" aria-label="Slide 2">

                                </button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={pvalue1} alt="First slide"
                                        style={{ objectFit: 'contain' }}
                                        className="d-block w-100" />
                                </div>
                                <div className="carousel-item">
                                    <img src={pvalue2} alt="Second slide"
                                        style={{objectFit: 'contain' }}
                                        className="d-block w-100" />
                                </div>
                            </div>
                            <button className="carousel-control-prev"
                                type="button" data-bs-slide="prev"
                                data-bs-target="#pvalueCarousel">
                                <span className="carousel-control-prev-icon"
                                    aria-hidden="true"></span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                            <button className="carousel-control-next"
                                type="button" data-bs-slide="next"
                                data-bs-target="#pvalueCarousel">
                                <span className="carousel-control-next-icon"
                                    aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            data-bs-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};