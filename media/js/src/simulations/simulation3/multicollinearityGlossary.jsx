import React from 'react';


export const MulticollinearityGlossary = () => {

    return (<div className="modal fade"
        id="MulticollinearityGlossary"
        tabIndex={-1}
        aria-labelledby="MulticollinearityGlossaryLabel"
        aria-hidden="true"
        data-bs-backdrop="false">
        <div
            className="modal-dialog modal-dialog-centered
                modal-custom modal-dialog-scrollable">
            <div className="modal-content modal-content-ovbtheory">
                <div className="modal-header">
                    <h5 className="modal-title"
                        id="MulticollinearityGlossaryLabel">
                        Glossary for Multicollinearity Module
                    </h5>
                    <button
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div className="modal-body px-4">
                    <p>
                        This is the glossary space for the Multicollinearity
                        Module.
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>);
};