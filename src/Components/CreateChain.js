import {React, useEffect} from 'react'
import { useSelector } from "react-redux";
import Container from './Container'
import ChainForm from './ChainComps/ChainForm'
import { useParams } from 'react-router'

export default function CreateChain() {
    const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/login";
    };
  });
    const { chainId } = useParams();

    return (
        <Container children={<ChainForm chainId={chainId}/>}></Container>
    )
}
