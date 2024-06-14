import React from 'react';
import { Katex } from '../katexComponent';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const CriticalValueModal = () => {

    return (<>
        <div className="modal fade"
            id="criticalValModal"
            tabIndex={-1}
            aria-labelledby="criticalValModalLabel"
            aria-hidden="true"
            data-bs-backdrop="false">
            <div
                className="modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable">
                <div className="modal-content modal-content-cvalue">
                    <div className="modal-header">
                        <h5 className="modal-title"
                            id="criticalValModalLabel">
                            Critical Values for Commonly Used Significance Levels{/* eslint-disable-line max-len */}
                        </h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-cvalue">
                            <figure
                                className="modal-graph modal-graph--cvalue
                                flex-fill">
                                <img src={
                                    `${STATIC_URL}/img/cv-2tail-curve.svg`
                                } alt="critical-value graph" />
                            </figure>
                            <div className="cvalue-text flex-fill">
                                <h3>Two-tailed test (<Katex tex={'{\\neq}'}
                                    className="katex-inline"/> )</h3>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="colheader">
                                                <Katex tex={'\\alpha'}
                                                    className="katex-inline" />:
                                            </th>
                                            <th className="colheader">10%</th>
                                            <th className="colheader">5%</th>
                                            <th className="colheader">1%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="rowheader
                                            text-nowrap">
                                                Reject if
                                                <Katex tex={
                                                    '\\lvert t \\rvert \\gt'
                                                }
                                                className="katex-inline"/>
                                            </th>
                                            <td>&#177;1.64</td>
                                            <td>&#177;1.96</td>
                                            <td>&#177;2.58</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container-cvalue">
                            <figure
                                className="modal-graph modal-graph--cvalue
                                flex-fill">
                                <img src={
                                    `${STATIC_URL}/img/cv-1tail-right-curve.svg`
                                } alt="critical-value graph" />
                            </figure>
                            <div className="cvalue-text flex-fill">
                                <h3>One-tailed test, right side
                                    (<Katex tex={'\\gt'}
                                    className="katex-inline"/> )</h3>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="colheader">
                                                <Katex tex={'\\alpha'}
                                                    className="katex-inline" />:
                                            </th>
                                            <th className="colheader">10%</th>
                                            <th className="colheader">5%</th>
                                            <th className="colheader">1%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="rowheader
                                            text-nowrap">
                                                Reject if
                                                <Katex
                                                    tex={'t \\gt'}
                                                    className="katex-inline"/>
                                            </th>
                                            <td>1.28</td>
                                            <td>1.64</td>
                                            <td>2.33</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container-cvalue">
                            <figure
                                className="modal-graph modal-graph--cvalue
                                flex-fill">
                                <img src={
                                    `${STATIC_URL}/img/cv-1tail-left-curve.svg`
                                } alt="critical-value graph" />
                            </figure>
                            <div className="cvalue-text flex-fill">
                                <h3>One-tailed test, left side
                                    (<Katex tex={'\\lt'}
                                    className="katex-inline"/> )</h3>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="colheader">
                                                <Katex tex={'\\alpha'}
                                                    className="katex-inline" />:
                                            </th>
                                            <th className="colheader">10%</th>
                                            <th className="colheader">5%</th>
                                            <th className="colheader">1%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="rowheader
                                            text-nowrap">
                                                Reject if
                                                <Katex
                                                    tex={'t \\lt'}
                                                    className="katex-inline"/>
                                            </th>
                                            <td>-1.28</td>
                                            <td>-1.64</td>
                                            <td>-2.33</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};