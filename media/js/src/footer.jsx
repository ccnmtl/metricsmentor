import React from 'react';
import footerLogo from '../../img/logo-ctl.svg';

export const Footer = () => {

    return (

        <footer>
            <div className="container">
                <ul className="nav navlist--footer">
                    <li className="nav-item">
                        <a href="/about/">About Metrics Mentor</a>
                    </li>
                    <li className="nav-item">
                        <a href="/contact/">Contact Us</a>
                    </li>
                </ul>
                <p className="ll-license text-center mt-3 fs-6">Metrics Mentor open-source code is on <a itemProp="license" rel="license noopener noreferrer" href="https://github.com/ccnmtl/metricsmentor">Github</a> <span className="text-nowrap">with <a itemProp="license" rel="license noopener noreferrer" href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a> license.</span></p>
                <div className="row my-5">
                    <div itemScope itemType="http://schema.org/EducationalOrganization" className='text-center py-3'>
                        <a href="https://ctl.columbia.edu" rel="noopener noreferrer" target="_blank" itemProp="url"><img src={footerLogo} className="footer__logo img-fluid" alt="" itemProp="logo" /><span className="visually-hidden" itemProp="name">Center for Teaching and Learning at Columbia University</span></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};
