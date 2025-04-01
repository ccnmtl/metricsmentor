import React from 'react';
import { GenericModal } from '../../Modal';
import { STATIC_URL } from '../../utils/utils';


export const CriticalValueModal = () => {
    return (
        <GenericModal
            modalId="criticalValModal"
            title="Critical Values for F-test Distribution"
            bodyContent={<>
                <figure className="modal-graph modal-graph--mcoll-f-test">
                    <img src={`${STATIC_URL}/img/cv-f-test.png`}
                        alt="cv-f-test.png" />
                </figure>
            </>}
        />
    );
};