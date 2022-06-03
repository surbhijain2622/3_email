import React from 'react'
import Container from '../Container';
import HandleAddMail from './HandleAddMail';

export default function AddMailCred() {
    return (
        <div>
            <Container children={<HandleAddMail/>}/>
        </div>
    )
}
