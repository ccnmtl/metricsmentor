import React from 'react';
import PropTypes from 'prop-types';

export const GenericModal = ({
    modalId,
    title,
    bodyContent,
    footerContent,
    backdrop = 'false',
    contentClassName = 'modal-content modal-content-glossary'
}) => {
    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex={-1}
            aria-labelledby={`${modalId}Label`}
            aria-hidden="true"
            data-bs-backdrop={backdrop}
        >
            <div
                className="modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable">
                <div className={contentClassName}>
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${modalId}Label`}>
                            {title}
                        </h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            data-cy={`${modalId}-close`}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body px-4">{bodyContent}</div>
                    <div className="modal-footer">
                        {footerContent || (
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

GenericModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bodyContent: PropTypes.node.isRequired,
    footerContent: PropTypes.node,
    backdrop: PropTypes.string,
    dialogClassName: PropTypes.string,
    contentClassName: PropTypes.string
};