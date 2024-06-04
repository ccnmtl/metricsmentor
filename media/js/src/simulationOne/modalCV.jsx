import React from 'react';
import cvTable from '../../../img/critical-values-table.png';

export const CriticalValueModal = () => {

    return (<>
        <div className="modal fade"
            id="criticalValModal"
            tabIndex={-1}
            aria-labelledby="criticalValModalLabel"
            aria-hidden="true"
            data-bs-backdrop="false">
            <div
                className='modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable'>
                <div className='modal-content modal-content-cvalue'>
                    <div className='modal-header'>
                        <h5 className='modal-title'
                            id='criticalValModalLabel'>
                            Critical Values for Commonly Used Significance Levels
                        </h5>
                        <button
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='table-container'>
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th className="colheader">&nbsp;</th>
                                        <th className="colheader">10%</th>
                                        <th className="colheader">5%</th>
                                        <th className="colheader">1%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="rowheader">
                                            2-sided test (&ne;)
                                            Reject if |t| &gt;</th>
                                        <td>&#177;1.64</td>
                                        <td>&#177;1.96</td>
                                        <td>&#177;2.58</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">
                                            1-sided test (&gt;)
                                            Reject if t &gt; (right-sided)</th>
                                        <td>1.28</td>
                                        <td>1.64</td>
                                        <td>2.33</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">
                                            1-sided test (&lt;)
                                            Reject if t &lt; (left-sided)</th>
                                        <td>-1.28</td>
                                        <td>-1.64</td>
                                        <td>-2.33</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary'
                            data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};