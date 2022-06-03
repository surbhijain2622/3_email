import React from 'react'
import Container from '../Container'
import ChainForm from './ChainForm'
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

export default function CreateChain() {

    const { chainId } = useParams();
    const title = chainId ? "Edit" : "Create";
    const dispatch = useDispatch();

    return (
        <Container children={<ChainForm chainId={chainId} title={title} dispatch={dispatch}/>}></Container>
    )
}
