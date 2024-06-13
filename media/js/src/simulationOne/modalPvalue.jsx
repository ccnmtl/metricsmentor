import React from 'react';
import { Katex } from '../katexComponent';

export const STATIC_URL = window.MetricsMentor.staticUrl;

export const PvalueModal = () => {

    return (<>
        <div className="modal fade"
            id="pvalueModal"
            tabIndex={-1}
            aria-labelledby="pvalueModalLabel"
            aria-hidden="true"
            data-bs-backdrop="false">
            <div
                className="modal-dialog modal-dialog-centered
                    modal-custom modal-dialog-scrollable">
                <div className="modal-content modal-content-pvalue">
                    <div className="modal-header">
                        <h5 className="modal-title"
                            id="pvalueModalLabel">
                            Standard normal distribution table
                        </h5>
                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <figure className="modal-graph modal-graph--pvalue">
                            <img src={`${STATIC_URL}/img/p-value-curve.svg`}
                                alt="p-value graph" />
                        </figure>
                        <div className="table-container">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th rowSpan={2}
                                            className="colheader">
                                            <Katex tex={'z'} />
                                        </th>
                                        <th colSpan={10}
                                            className="colheader">
                                            Second decimal value of
                                            <Katex tex={'z'}
                                                className="katex-inline" />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="colheader">0</th>
                                        <th className="colheader">1</th>
                                        <th className="colheader">2</th>
                                        <th className="colheader">3</th>
                                        <th className="colheader">4</th>
                                        <th className="colheader">5</th>
                                        <th className="colheader">6</th>
                                        <th className="colheader">7</th>
                                        <th className="colheader">8</th>
                                        <th className="colheader">9</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="rowheader">-2.9</th>
                                        <td>0.0019</td>
                                        <td>0.0018</td>
                                        <td>0.0018</td>
                                        <td>0.0017</td>
                                        <td>0.0016</td>
                                        <td>0.0016</td>
                                        <td>0.0015</td>
                                        <td>0.0015</td>
                                        <td>0.0014</td>
                                        <td>0.0014</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.8</th>
                                        <td>0.0026</td>
                                        <td>0.0025</td>
                                        <td>0.0024</td>
                                        <td>0.0023</td>
                                        <td>0.0023</td>
                                        <td>0.0022</td>
                                        <td>0.0021</td>
                                        <td>0.0021</td>
                                        <td>0.0020</td>
                                        <td>0.0019</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.7</th>
                                        <td>0.0035</td>
                                        <td>0.0034</td>
                                        <td>0.0033</td>
                                        <td>0.0032</td>
                                        <td>0.0031</td>
                                        <td>0.0030</td>
                                        <td>0.0029</td>
                                        <td>0.0028</td>
                                        <td>0.0027</td>
                                        <td>0.0026</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.6</th>
                                        <td>0.0047</td>
                                        <td>0.0045</td>
                                        <td>0.0044</td>
                                        <td>0.0043</td>
                                        <td>0.0041</td>
                                        <td>0.0040</td>
                                        <td>0.0039</td>
                                        <td>0.0038</td>
                                        <td>0.0037</td>
                                        <td>0.0036</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.5</th>
                                        <td>0.0062</td>
                                        <td>0.0060</td>
                                        <td>0.0059</td>
                                        <td>0.0057</td>
                                        <td>0.0055</td>
                                        <td>0.0054</td>
                                        <td>0.0052</td>
                                        <td>0.0051</td>
                                        <td>0.0049</td>
                                        <td>0.0048</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.4</th>
                                        <td>0.0082</td>
                                        <td>0.0080</td>
                                        <td>0.0078</td>
                                        <td>0.0075</td>
                                        <td>0.0073</td>
                                        <td>0.0071</td>
                                        <td>0.0069</td>
                                        <td>0.0068</td>
                                        <td>0.0066</td>
                                        <td>0.0064</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.3</th>
                                        <td>0.0107</td>
                                        <td>0.0104</td>
                                        <td>0.0102</td>
                                        <td>0.0099</td>
                                        <td>0.0096</td>
                                        <td>0.0094</td>
                                        <td>0.0091</td>
                                        <td>0.0089</td>
                                        <td>0.0087</td>
                                        <td>0.0084</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.2</th>
                                        <td>0.0139</td>
                                        <td>0.0136</td>
                                        <td>0.0132</td>
                                        <td>0.0129</td>
                                        <td>0.0125</td>
                                        <td>0.0122</td>
                                        <td>0.0119</td>
                                        <td>0.0116</td>
                                        <td>0.0113</td>
                                        <td>0.0110</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.1</th>
                                        <td>0.0179</td>
                                        <td>0.0174</td>
                                        <td>0.0170</td>
                                        <td>0.0166</td>
                                        <td>0.0162</td>
                                        <td>0.0158</td>
                                        <td>0.0154</td>
                                        <td>0.0150</td>
                                        <td>0.0146</td>
                                        <td>0.0143</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-2.0</th>
                                        <td>0.0228</td>
                                        <td>0.0222</td>
                                        <td>0.0217</td>
                                        <td>0.0212</td>
                                        <td>0.0207</td>
                                        <td>0.0202</td>
                                        <td>0.0197</td>
                                        <td>0.0192</td>
                                        <td>0.0188</td>
                                        <td>0.0183</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.9</th>
                                        <td>0.0287</td>
                                        <td>0.0281</td>
                                        <td>0.0274</td>
                                        <td>0.0268</td>
                                        <td>0.0262</td>
                                        <td>0.0256</td>
                                        <td>0.0250</td>
                                        <td>0.0244</td>
                                        <td>0.0239</td>
                                        <td>0.0233</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.8</th>
                                        <td>0.0359</td>
                                        <td>0.0351</td>
                                        <td>0.0344</td>
                                        <td>0.0336</td>
                                        <td>0.0329</td>
                                        <td>0.0322</td>
                                        <td>0.0314</td>
                                        <td>0.0307</td>
                                        <td>0.0301</td>
                                        <td>0.0294</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.7</th>
                                        <td>0.0446</td>
                                        <td>0.0436</td>
                                        <td>0.0427</td>
                                        <td>0.0418</td>
                                        <td>0.0409</td>
                                        <td>0.0401</td>
                                        <td>0.0392</td>
                                        <td>0.0384</td>
                                        <td>0.0375</td>
                                        <td>0.0367</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.6</th>
                                        <td>0.0548</td>
                                        <td>0.0537</td>
                                        <td>0.0526</td>
                                        <td>0.0516</td>
                                        <td>0.0505</td>
                                        <td>0.0495</td>
                                        <td>0.0485</td>
                                        <td>0.0475</td>
                                        <td>0.0465</td>
                                        <td>0.0455</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.5</th>
                                        <td>0.0668</td>
                                        <td>0.0655</td>
                                        <td>0.0643</td>
                                        <td>0.0630</td>
                                        <td>0.0618</td>
                                        <td>0.0606</td>
                                        <td>0.0594</td>
                                        <td>0.0582</td>
                                        <td>0.0571</td>
                                        <td>0.0559</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.4</th>
                                        <td>0.0808</td>
                                        <td>0.0793</td>
                                        <td>0.0778</td>
                                        <td>0.0764</td>
                                        <td>0.0749</td>
                                        <td>0.0735</td>
                                        <td>0.0721</td>
                                        <td>0.0708</td>
                                        <td>0.0694</td>
                                        <td>0.0681</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.3</th>
                                        <td>0.0968</td>
                                        <td>0.0951</td>
                                        <td>0.0934</td>
                                        <td>0.0918</td>
                                        <td>0.0901</td>
                                        <td>0.0885</td>
                                        <td>0.0869</td>
                                        <td>0.0853</td>
                                        <td>0.0838</td>
                                        <td>0.0823</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.2</th>
                                        <td>0.1151</td>
                                        <td>0.1131</td>
                                        <td>0.1112</td>
                                        <td>0.1093</td>
                                        <td>0.1075</td>
                                        <td>0.1056</td>
                                        <td>0.1038</td>
                                        <td>0.1020</td>
                                        <td>0.1003</td>
                                        <td>0.0985</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.1</th>
                                        <td>0.1357</td>
                                        <td>0.1335</td>
                                        <td>0.1314</td>
                                        <td>0.1292</td>
                                        <td>0.1271</td>
                                        <td>0.1251</td>
                                        <td>0.1230</td>
                                        <td>0.1210</td>
                                        <td>0.1190</td>
                                        <td>0.1170</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-1.0</th>
                                        <td>0.1587</td>
                                        <td>0.1562</td>
                                        <td>0.1539</td>
                                        <td>0.1515</td>
                                        <td>0.1492</td>
                                        <td>0.1469</td>
                                        <td>0.1446</td>
                                        <td>0.1423</td>
                                        <td>0.1401</td>
                                        <td>0.1379</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.9</th>
                                        <td>0.1841</td>
                                        <td>0.1814</td>
                                        <td>0.1788</td>
                                        <td>0.1762</td>
                                        <td>0.1736</td>
                                        <td>0.1711</td>
                                        <td>0.1685</td>
                                        <td>0.1660</td>
                                        <td>0.1635</td>
                                        <td>0.1611</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.8</th>
                                        <td>0.2119</td>
                                        <td>0.2090</td>
                                        <td>0.2061</td>
                                        <td>0.2033</td>
                                        <td>0.2005</td>
                                        <td>0.1977</td>
                                        <td>0.1949</td>
                                        <td>0.1922</td>
                                        <td>0.1894</td>
                                        <td>0.1867</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.7</th>
                                        <td>0.2420</td>
                                        <td>0.2389</td>
                                        <td>0.2358</td>
                                        <td>0.2327</td>
                                        <td>0.2296</td>
                                        <td>0.2266</td>
                                        <td>0.2236</td>
                                        <td>0.2206</td>
                                        <td>0.2177</td>
                                        <td>0.2148</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.6</th>
                                        <td>0.2743</td>
                                        <td>0.2709</td>
                                        <td>0.2676</td>
                                        <td>0.2643</td>
                                        <td>0.2611</td>
                                        <td>0.2578</td>
                                        <td>0.2546</td>
                                        <td>0.2514</td>
                                        <td>0.2483</td>
                                        <td>0.2451</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.5</th>
                                        <td>0.3085</td>
                                        <td>0.3050</td>
                                        <td>0.3015</td>
                                        <td>0.2981</td>
                                        <td>0.2946</td>
                                        <td>0.2912</td>
                                        <td>0.2877</td>
                                        <td>0.2843</td>
                                        <td>0.2810</td>
                                        <td>0.2776</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.4</th>
                                        <td>0.3446</td>
                                        <td>0.3409</td>
                                        <td>0.3372</td>
                                        <td>0.3336</td>
                                        <td>0.3300</td>
                                        <td>0.3264</td>
                                        <td>0.3228</td>
                                        <td>0.3192</td>
                                        <td>0.3156</td>
                                        <td>0.3121</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.3</th>
                                        <td>0.3821</td>
                                        <td>0.3783</td>
                                        <td>0.3745</td>
                                        <td>0.3707</td>
                                        <td>0.3669</td>
                                        <td>0.3632</td>
                                        <td>0.3594</td>
                                        <td>0.3557</td>
                                        <td>0.3520</td>
                                        <td>0.3483</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.2</th>
                                        <td>0.4207</td>
                                        <td>0.4168</td>
                                        <td>0.4129</td>
                                        <td>0.4090</td>
                                        <td>0.4052</td>
                                        <td>0.4013</td>
                                        <td>0.3974</td>
                                        <td>0.3936</td>
                                        <td>0.3897</td>
                                        <td>0.3859</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.1</th>
                                        <td>0.4602</td>
                                        <td>0.4562</td>
                                        <td>0.4522</td>
                                        <td>0.4483</td>
                                        <td>0.4443</td>
                                        <td>0.4404</td>
                                        <td>0.4364</td>
                                        <td>0.4325</td>
                                        <td>0.4286</td>
                                        <td>0.4247</td>
                                    </tr>
                                    <tr>
                                        <th className="rowheader">-0.0</th>
                                        <td>0.5000</td>
                                        <td>0.4960</td>
                                        <td>0.4920</td>
                                        <td>0.4880</td>
                                        <td>0.4840</td>
                                        <td>0.4801</td>
                                        <td>0.4761</td>
                                        <td>0.4721</td>
                                        <td>0.4681</td>
                                        <td>0.4641</td>
                                    </tr>
                                </tbody>
                            </table>
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