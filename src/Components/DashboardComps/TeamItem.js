import React from 'react'

export default function TeamItem(props) {
    return (
        <div className="team-item">
            <div class="team-item-icon">
                <span class="material-icons" style={{fontSize:"2.5rem"}}>{props.icon}</span>
            </div>
            <div className="team-item-card">
                <p>{props.text}</p>
            </div>
        </div>
    )
}
