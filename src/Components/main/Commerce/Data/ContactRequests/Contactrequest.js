import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { API } from '../../../../../data';
import { isAutheticated } from '../../../../auth/authhelper';

function Contactrequest() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [phoneNo, setphoneNo] = useState('');
	const { token } = isAutheticated();

	async function saveContact() {
		if (phoneNo.length > 10 || phoneNo < 10) {
			return swal('Oops!', 'Invalid Phone Number', 'error');
		}
		if (
			!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
				email,
			)
		)
			return swal('Oops!', 'Please Fill Valid Email Address', 'error');
		let contact = await axios.post(
			`${API}/api/contact/add_Contact`,
			{
				name,
				email,
				phoneNo,
				message,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log(contact.data);
		if (contact.data.message === 'Success') {
			swal('Success!', 'Contact Request Added Successfully', 'success');
			setTimeout(() => {
				window.location.href = '/contact-request';
			}, 3000);
		}
	}

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
								<h4 class="mb-0">Data Collection - Contact Requests</h4>
								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item">Data Collection - Contact Requests</li>
										<li class="breadcrumb-item">Add Contact Request Manually</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-12">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-md-12 col-lg-6 col-xl-6">
											<h1 class="text-left head-small">Add Contact Request Manually</h1>

											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Name
															</label>
															<input
																value={name}
																onChange={(e) => setName(e.target.value)}
																type="text"
																class="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Email
															</label>
															<input
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																type="text"
																class="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Phone Number
															</label>
															<input
																value={phoneNo}
																onChange={(e) => setphoneNo(e.target.value)}
																type="text"
																class="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Message
															</label>
															<textarea
																value={message}
																onChange={(e) => setMessage(e.target.value)}
																class="form-control input-field"
																rows="5"
															/>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-lg-12">
														<div class="form-group text-left">
															<button
																onClick={saveContact}
																type="button"
																class="
                                      btn btn-success btn-login
                                      waves-effect waves-light
                                      mr-3
                                    ">
																Save
															</button>
														</div>
													</div>
												</div>
											</form>
										</div>
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

export default Contactrequest;
