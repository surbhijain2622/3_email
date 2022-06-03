import React from 'react'
import siteLogo from '../static/images/favicon.svg';

export default function Footer() {
    return (
        <div>
            <footer>
                <div class="footer">
                    <div class="footer-content">
                        <div class="d-flex">
                            <div class="row">
                                <img src={siteLogo} className="footer-sitelogo"/>
                                <h2 style={{color:"white"}}>ChainMailer</h2>
                            </div>
                            <div class="sep-line"></div>
                            <div class="footer-address">
                                <h3>Contact us</h3>
                                <p>Malaviya National Institute of Technology, Jaipur</p>
                                <p>+91-9876543210</p>
                                <p>info@chainmailer.in</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
