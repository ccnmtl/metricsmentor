import React from 'react';
import cvTable from '../../../img/critical-values-table.png';

export const CriticalValueModal = () => {

    return (
        <div className="modal fade" id="criticalValModal" tabIndex="-1"
            aria-labelledby="criticalValModalLabel" aria-hidden="true"
            data-bs-backdrop="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="criticalValModalLabel">
                        P Values
                        </h5>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={cvTable} alt="Description"
                            className="img-fluid" />
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