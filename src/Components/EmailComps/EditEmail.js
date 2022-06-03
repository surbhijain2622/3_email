import React from 'react';

import Container from '../Container';
import EditForm from './EmailGroupComps/EditForm.jsx';

export default function EditEmail() {
	return (
		<div>
			<Container children={<EditForm />} />
		</div>
	);
}
