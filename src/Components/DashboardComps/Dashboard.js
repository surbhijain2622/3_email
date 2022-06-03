import React from 'react'
import Container from '../Container'
import SendBusinessMail from './SendBusinessMail'
import TagLine from './TagLine'
import WhatWeOffer from './WhatWeOffer'
import OurTeam from './OurTeam'

export default function Dashboard() {
    return (
        <div>
            <Container children={<TagLine/>} backgroundClass="bg-1" heightClass="h-80vh"/>
            <Container children={<SendBusinessMail/>} backgroundClass="bg-2"/>
            <Container children={<WhatWeOffer/>} backgroundClass="bg-1"/>
            <Container children={<OurTeam/>} backgroundClass="bg-2"/>
        </div>
    )
}
