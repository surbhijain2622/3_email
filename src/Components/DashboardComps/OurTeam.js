import React from 'react'
import TeamItem from './TeamItem'

export default function OurTeam() {
    
    const teamItems = [
        {
            icon: "code",
            text: "We use the most recent technology to ensure high end productivty."
        },
        {
            icon: "people",
            text: "Provide support and accountability towards our clients for queries and concerns."
        },
        {
            icon: "pending_actions",
            text: "Our developers work around the hours to ensure client satisfaction."
        },
    ]
    
    return (
        <div>
            <div class="top center w-50">
                    <h1>Our Team</h1>
                    <p class="center sub-head-text">Great things in business are never done by one person; they're done by a team of people.</p>
                </div>
                <div class="sub-content-box team-items">
                    <div class="d-flex center">
                        {teamItems.map((teamItem, index)=><TeamItem key={index} icon={teamItem.icon} text={teamItem.text}></TeamItem>)}
                    </div>
                </div>
        </div>
    )
}
