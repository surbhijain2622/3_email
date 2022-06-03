import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { requests } from '../../utils/requests';
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
} from "../../../store/modules/application/app.action";

export default function EmailGroupTable() {
	const history = useHistory();

	const [emailGroups, setEmailGroups] = useState([]);
	const [emailGroupsData, setEmailGroupsData] = useState([]);

	const dispatch = useDispatch();

	useEffect(async () => {
		try {
			dispatch(showLoader());
			const response = await axios.get(requests['getEmailGroups']);
			const data = response.data;
			setEmailGroups(data);

			var newData = data;
			newData.forEach((emailGroup) => {
				var newGroup = emailGroup;
				newGroup.to = emailGroup.to.join(', ');
				newGroup.cc = emailGroup.cc.join(', ');
				newGroup.bcc = emailGroup.bcc.join(', ');
				return newGroup;
			});
			setEmailGroupsData(newData);
			dispatch(hideLoader());
		} catch (error) {
			console.log(error);
			dispatch(hideLoader());
		}
	}, []);

	const editEmailGroup = async (event) => {
		try {
			const emailGroupId = event.target.parentNode.id;
			history.push(`/email/edit/${emailGroupId}`);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteEmailGroup = async (event) => {
		try {
			dispatch(showLoader());
			const emailGroupId = event.target.parentNode.id;
			console.log(emailGroupId);

			const response = await axios.delete(
				`${requests['deleteEmailGroup']}/${emailGroupId}`
			);

			if (response.status === 200) {
				const newEmailGroups = emailGroups.filter(
					(group) => group._id !== emailGroupId
				);

				setEmailGroups(newEmailGroups);
				setEmailGroupsData(newEmailGroups);
				dispatch(hideLoader());
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoader());
		}
	};

	const downloadJson = async (event) => {
		try {
			dispatch(showLoader());
			const emailGroupId = event.target.parentNode.id;

			const emailGroup = emailGroups.find(
				(group) => group._id === emailGroupId
			);

			let filename = `${emailGroup.groupName}.json`;
			let contentType = 'application/json;charset=utf-8;';

			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				var blob = new Blob(
					[
						decodeURIComponent(
							encodeURI(JSON.stringify(emailGroup, null, '\t'))
						),
					],
					{ type: contentType }
				);
				navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				var a = document.createElement('a');
				a.download = filename;
				a.href =
					'data:' +
					contentType +
					',' +
					encodeURIComponent(JSON.stringify(emailGroup, null, '\t'));
				a.target = '_blank';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
			dispatch(hideLoader());
		} catch (error) {
			console.log(error);
			dispatch(hideLoader());
		}
	};

	const columns = [
		{
			name: 'Group Name',
			selector: 'groupName',
			sortable: true,
		},
		{
			name: 'To',
			selector: 'to',
			sortable: true,
		},
		{
			name: 'CC',
			selector: 'cc',
			sortable: true,
		},
		{
			name: 'BCC',
			selector: 'bcc',
			sortable: true,
		},
		{
			name: 'Options',
			right: true,
			cell: (row) => (
				<div data-tag='allowRowEvents' id={row._id}>
					<span class='material-icons' onClick={editEmailGroup}>
						edit
					</span>
					<span class='material-icons' onClick={deleteEmailGroup}>
						delete
					</span>
					<span class='material-icons' onClick={downloadJson}>
						cloud_download
					</span>
				</div>
			),
		},
	];

	return (
		<div>
			<div className='inner'>
				<div className="email-group-title">
					<h1>Manage Email Groups</h1>
					<div className="add-icon add-email-icon">
                        <Link to="/email/add"><i className="material-icons">
                            add_circle
                        </i>
                        </Link>
                    </div>
				</div>
				<DataTable columns={columns} data={emailGroupsData} />
			</div>
		</div>
	);
}
