import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import ChainsContainer from "./ChainComps/ChainsContainer";
import Container from "./Container";

export default function ManageChains() {
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/login";
    }
  });
  return <Container children={<ChainsContainer />} />;
}
