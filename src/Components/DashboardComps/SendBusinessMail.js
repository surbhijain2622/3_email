import React from 'react'
import SubContentBox from './SubContentBox'
import {Link} from 'react-router-dom';

export default function SendBusinessMail() {
    
    function content(){
        return (<>
        <div class="left">
            <img src="https://eep.io/images/yzco4xsimv0y/1NIsKMRR8bNuZlQVfWPePQ/4c81beeea56054b45be98988dcb359a8/ILLO_Hero_Transactional-Target-1520.png?fm=webp&q=80" className="chain-mail-img"></img>
        </div>
        <div class="right">
            <div>
                <h1 class="sub-heading">Set Up your business mails quickly</h1>
                <p class="center sub-text">Get your business up and running by sending out newsletters, updates to your suscribers</p>
                <div class="dash-btn-container bg-1"><Link to="/chains/manage" class="dash-btn">Manage chains</Link></div>
            </div>
        </div></>)
    }

    return (
        <div>
            <div class="top center w-50">
                <h1>Send business chain mails</h1>
                <p class="center sub-head-text">Preset all mails you wish to send to your clients or subscribers and schedule them as per your need. Send out as many mails with our platform to any number of recipients.</p>
            </div>
            <SubContentBox content={content}></SubContentBox>
        </div>
    )
}
