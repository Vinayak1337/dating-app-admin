import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../../data';
import { isAutheticated } from '../../../../auth/authhelper';

function Viewcontact() {
	const { id } = useParams();
	let [contactinfo, setContactinfo] = useState('');
	const { token } = isAutheticated();

	function convertDate(inputFormat) {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'June',
			'July',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(' ');
	}

	const getContactInfo = useCallback(async () => {
		let info = await axios.get(`${API}/api/contact/get_Contact/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setContactinfo(info.data.Contact);
		console.log(info);
	}, [id, token]);

	useEffect(() => {
		getContactInfo();
	}, [getContactInfo]);
	return (
		<div className="main-content">
			<div class="page-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12">
							<div
								class="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  ">
								<h4 class="mb-0">Contact Request</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item active">Data Collection - Contact Request</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-12">
							<div class="card">
								<div class="card-body">
									<div class="row ml-0 mr-0 mb-10">
										<div class="col-sm-12 col-md-6" />

										<div class="col-sm-12 col-md-6">
											<div class="dropdown d-block">
												<a href="/contact-request">
													<button
														type="button"
														class="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														Back
													</button>
												</a>
											</div>
										</div>
									</div>
									<div class="table-responsive table-shoot">
										<table class="table table-centered table-nowrap mb-0">
											<tbody>
												<tr>
													<td width="20%">
														<strong>Name</strong>
													</td>
													<td>{contactinfo.name}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Email</strong>
													</td>
													<td>{contactinfo.email}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Phone Number</strong>
													</td>
													<td>{contactinfo.phoneNo}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Message</strong>
													</td>
													<td>{contactinfo.message}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Receieved on</strong>
													</td>
													<td>{convertDate(contactinfo.createdAt)}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Sent From</strong>
													</td>
													<td>-</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Viewcontact;
