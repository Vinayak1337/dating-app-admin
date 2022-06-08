import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../../../../data';
import moment from 'moment';
import { isAutheticated } from '../../../../auth/authhelper';

const CafeOwner = () => {
	const { token } = isAutheticated();
	const [state, setState] = useState({
		limit: 10,
		owners: [],
	});

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const fetchowners = useCallback(async () => {
		const url = `${API}/owner/getOwners/${state.limit || 10}`;
		console.log(url);
		const res = await axios.get(url, {
			headers: {
				Authorization: `Client ${token}`,
			},
		});

		if (res.status === 200) {
			changeState({ owners: res.data.users });
		}
	}, [state.limit, token]);

	const handleDeleteOwner = () => {};

	useEffect(() => {
		fetchowners();
	}, [fetchowners]);

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
								<h4 class="mb-0">Cafe Owners</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item">Cafe Owners</li>
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
										<div class="col-sm-12 col-md-6">
											<div class="dataTables_length">
												<label class="w-100">
													Show
													<select
														name=""
														class="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              ">
														<option value="10">10</option>
														<option value="25">25</option>
														<option value="50">50</option>
														<option value="100">100</option>
													</select>
													entries
												</label>
											</div>
										</div>
									</div>
									<div class="table-responsive table-shoot">
										<table class="table table-centered table-nowrap mb-0">
											<thead class="thead-light">
												<tr>
													<th>Cafe Name</th>
													<th>Name</th>
													<th>Email</th>
													<th>Phone</th>
													<th>Received On</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{state.owners.map((item) => {
													return (
														<tr>
															<td>{item.cafeName}</td>
															<td>{item.firstName + ' ' + item.lastName}</td>
															<td>{item.email}</td>
															<td>{item.phoneNumber}</td>
															<td>{moment(item.createdAt).format('Do MMMM YYYY')}</td>
															<td>
																<a href={`/cafe-owners/${item._id}`}>
																	<button
																		type="button"
																		class="
                                    btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  ">
																		View
																	</button>
																</a>

																<button
																	onClick={() => handleDeleteOwner(item._id)}
																	type="button"
																	class="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
																	id="sa-params">
																	Delete
																</button>
															</td>
														</tr>
													);
												})}
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
};

export default CafeOwner;
