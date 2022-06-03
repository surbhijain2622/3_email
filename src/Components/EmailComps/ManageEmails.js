import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "./Container";
import EmailGroupTable from "./EmailGroupComps/EmailGroupTable.jsx";

export default function ManageEmails() {
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <Container children={<EmailGroupTable />} />
    </div>
  );
}
