import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../../data';
import { isAutheticated } from '../../../../auth/authhelper';
import qrcode from 'qrcode';

function ViewCafeOwner() {
	const { id } = useParams();

	let [owner, setOwner] = useState({
		createdAt: '',
		_id: '',
		username: '',
		email: '',
		cafeName: '',
		firstName: '',
		lastName: '',
		location: '',
		city: '',
		country: '',
		phoneNumber: '',
		qrcode: '',
	});

	const { token } = isAutheticated();

	const getOwner = useCallback(async () => {
		try {
			let info = await axios.get(`${API}/owner/getOwner/${id}`, {
				headers: {
					Authorization: `Client ${token}`,
				},
			});
			setOwner(info.data.user);

			const qrcodeImg = await qrcode.toDataURL(info.data.user._id);

			setOwner((prevState) => ({ ...prevState, qrcode: qrcodeImg }));
		} catch (error) {
			console.log(error);
		}
	}, [id, token]);

	useEffect(() => {
		getOwner();
	}, [getOwner]);

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
								<h4 class="mb-0">Cafe Owner</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item active">Data Collection - Cafe Owner</li>
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
												<a href="/cafe-owners">
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
														<strong>Cafe Name</strong>
													</td>
													<td>{owner.cafeName}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Name</strong>
													</td>
													<td>{`${owner.firstName} ${owner.lastName}`}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Email</strong>
													</td>
													<td>{owner.email}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Phone Number</strong>
													</td>
													<td>{owner.phoneNumber}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Location</strong>
													</td>
													<td>{owner.location}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>City</strong>
													</td>
													<td>{owner.city}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Country</strong>
													</td>
													<td>{owner.country}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Receieved on</strong>
													</td>
													<td>{moment(owner.createdAt).format('Do MMMM YYYY')}</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Qr Code</strong>
													</td>
													<td>
														<img alt={owner.username} src={owner.qrcode} />
													</td>
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

export default ViewCafeOwner;
