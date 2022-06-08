import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useParams } from 'react-router-dom';
import { API } from '../../../../data';
import { isAutheticated } from '../../../auth/authhelper';

function Editshipping() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [rate, setRate] = useState('');
	const [status, setStatus] = useState(false);
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const { id } = useParams();
	const { token } = isAutheticated();

	const getShipping = useCallback(async () => {
		let shipping = await axios.get(`${API}/api/shipping/view_Shipping/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setName(shipping.data.Shipping.name);
		setDescription(shipping.data.Shipping.description);
		setRate(shipping.data.Shipping.rate);
		setStatus(shipping.data.Shipping.status);
		setCountry(shipping.data.Shipping.country);
		setState(shipping.data.Shipping.state);
	}, [id, token]);

	useEffect(() => {
		getShipping();
	}, [getShipping]);
	async function editShipping() {
		const update = await axios.patch(`${API}/api/shipping/update_Shipping/${id}`, {
			name,
			description,
			rate,
			status: status === 'Active' ? true : false,
			country,
			state,
		});
		if (update.data.data) {
			window.location.href = '/shipping';
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
								<h4 class="mb-0">Edit Shipping Rate</h4>
								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item active">Configuration</li>
										<li class="breadcrumb-item active">Edit Shipping Rate</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="form-group text-right">
								<button
									onClick={editShipping}
									type="button"
									class="
                          btn btn-success btn-login
                          waves-effect waves-light
                          mr-3
                        ">
									Save
								</button>

								<a href="/shipping">
									<button
										type="button"
										class="
                          btn btn-success btn-cancel
                          waves-effect waves-light
                          mr-3
                        ">
										Cancel
									</button>
								</a>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-8">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-md-12">
											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Shipping Method Name
															</label>
															<input
																value={name}
																onChange={(e) => setName(e.target.value)}
																type="text"
																class="form-control input-field"
															/>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Description (Optional)
															</label>
															<textarea
																value={description}
																onChange={(e) => setDescription(e.target.value)}
																class="form-control input-field"
																rows="5"
															/>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Rate
															</label>
															<input
																value={rate}
																onChange={(e) => setRate(e.target.value)}
																type="text"
																class="form-control input-field"
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-4">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-md-12">
											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Status
															</label>
															<select
																onChange={(e) => setStatus(e.target.value)}
																value={status ? 'Active' : 'Inactive'}
																class="form-control input-field">
																<option value="">--select--</option>
																<option value="Active">Active</option>
																<option value="Inactive">Inactive</option>
															</select>
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

					<div class="row">
						<div class="col-lg-8">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-md-12">
											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Select Country
															</label>
															<CountryDropdown
																class="form-control input-field"
																value={country}
																onChange={(val) => setCountry(val)}
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label for="basicpill-phoneno-input" class="label-100">
																Select State
															</label>
															{/* <select
                                  name="currency"
                                  value=""
                                  class="form-control input-field"
                                >
                                  <option value="">--select--</option>
                                  <option value="Active">All States</option>
                                  <option value="Inactive">Assam</option>
                                  <option value="Inactive">
                                    Arunachal Pradesh
                                  </option>
                                </select> */}
															<RegionDropdown
																country={country}
																value={state}
																class="form-control input-field"
																onChange={(val) => setState(val)}
															/>
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

export default Editshipping;
