import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../utils/axios';
import { requests } from '../../utils/requests';
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
} from "../../../store/modules/application/app.action";

import '@pathofdev/react-tag-input/build/index.css';
import TagsInput from './TagsInput';

export default function EmailGroupForm() {
	const history = useHistory();

	const [emailFormData, setEmailFormData] = useState({
		groupName: '',
		to: [],
		cc: [],
		bcc: [],
	});

	const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const sendEmailFormData = async (event) => {
		event.preventDefault();

		try {
			dispatch(showLoader());
			const response = await axios.post(
				requests['createEmailGroup'],
				emailFormData
			);

			if (response.status === 200) {
				alert(`Email group ${emailFormData.groupName} created successfully.`);

				setEmailFormData({
					groupName: '',
					to: [],
					cc: [],
					bcc: [],
				});
				dispatch(hideLoader());
				history.push(`/email/manage`);
			} else {
				alert('Something went wrong. Please try again.');
				dispatch(hideLoader());
			}
		} catch (error) {
			alert('Something went wrong. Please try again.');
			console.log(error);
			dispatch(hideLoader());
		}
	};

	const changeHandler = (event) => {
		const file = event.target.files[0];
		new Response(file).json().then(
			(data) => {
				var newLists = {};
				if (data.to) newLists.to = data.to;
				if (data.cc) newLists.cc = data.cc;
				if (data.bcc) newLists.bcc = data.bcc;

				console.log(newLists);

				setEmailFormData((previous) => {
					return {
						...previous,
						...newLists,
					};
				});
			},
			(err) => {
				alert('The uploaded file could not be parsed. ');
			}
		);
		dispatch(showLoader());
		setSelectedFile(file);
		setIsSelected(true);
		dispatch(hideLoader());
	};

	const changeGroupName = (event) => {
		const newGroupName = event.target.value;
		setEmailFormData((previous) => {
			return {
				...previous,
				groupName: newGroupName,
			};
		});
	};

	const selectedTags = (tags, list) => {
		switch (list) {
			case 'to': {
				setEmailFormData((previous) => {
					return {
						...previous,
						to: tags,
					};
				});
				break;
			}
			case 'cc': {
				setEmailFormData((previous) => {
					return {
						...previous,
						cc: tags,
					};
				});
				break;
			}
			case 'bcc': {
				setEmailFormData((previous) => {
					return {
						...previous,
						bcc: tags,
					};
				});
				break;
			}
		}
	};

	return (
		<div className='inner'>
			<h1>Create Email Group</h1>
			<div class='form-container'>
				<form id='email-form'>
					<div class='form-group'>
						<label for='groupName'>Group Name</label>
						<input
							type='text'
							class='text-input'
							id='groupName'
							name='groupName'
							value={emailFormData.groupName}
							onChange={changeGroupName}
						/>
					</div>
					<div class='form-group'>
						<label for='to'>TO</label>

						<TagsInput
							selectedTags={selectedTags}
							list='to'
							tags={emailFormData.to}
						/>
					</div>
					<div class='form-group'>
						<label for='cc'>CC</label>
						<div class='textarea-cont'>
							<TagsInput
								selectedTags={selectedTags}
								list='cc'
								tags={emailFormData.cc}
							/>
						</div>
					</div>
					<div class='form-group'>
						<label for='bcc'>BCC</label>
						<div class='textarea-cont'>
							<TagsInput
								selectedTags={selectedTags}
								list='bcc'
								tags={emailFormData.bcc}
							/>
						</div>
					</div>
					<div class='submit-sec'>
						<div class='upload-sec'>
							<input
								type='file'
								name='file'
								id='file'
								onChange={changeHandler}
							/>
							<label for='file' className='submit-cont save-btn'>
								<span class='material-icons'>cloud_upload</span>
								Upload with JSON
							</label>
						</div>
						<div class='submit-cont' onClick={sendEmailFormData}>
							<a href='' class='save-btn'>
								Save
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
