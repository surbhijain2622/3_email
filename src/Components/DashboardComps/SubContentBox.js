import React from 'react'

export default function SubContentBox(props) {
    return (
        <div class="sub-content-box">
            <div class="d-flex center">
                {props.content()}
            </div>
        </div>
    )
}
