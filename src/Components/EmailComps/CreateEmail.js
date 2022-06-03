<<<<<<< HEAD:src/Components/CreateEmail.js
import {React, useEffect} from 'react'
import { useSelector } from "react-redux";
import Container from './Container';
=======
import React from 'react';

import Container from '../Container';
>>>>>>> dev:src/Components/EmailComps/CreateEmail.js
import EmailGroupForm from './EmailGroupComps/EmailGroupForm.jsx';

export default function CreateEmail() {
	const authToken = useSelector((state) => state.auth.token);
	useEffect(() => {
		if (!authToken) {
		  // dispatch(logOutSuccess({}));
		  window.location.href = "/login";
		};
	  });
	return (
		<div>
			<Container children={<EmailGroupForm />} />
		</div>
	);
}
