import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../../../../data';
import { isAutheticated } from '../../../../auth/authhelper';

function Email() {
	const { token } = isAutheticated();
	const [subscribers, setSubscribers] = useState([]);

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
	const getSubscribedUser = useCallback(async () => {
		let userList = await axios.get(`${API}/api/user/getUsers`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let user = userList.data.filter((el) => {
			return el.newsLetterSignUp.status;
		});
		console.log(user);
		setSubscribers(user);
	}, [token]);

	useEffect(() => {
		getSubscribedUser();
	}, [getSubscribedUser]);

	async function handleDelete(id) {
		let deleted = await axios.post(
			`${API}/api/user/delNewsLetter/${id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (deleted.data) {
			window.location.reload();
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
								<h4 class="mb-0">Data Management - Email Signups</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item">Data Management - Email Signups</li>
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
													<th>Email</th>
													<th>Added On</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{subscribers.map((el) => {
													return (
														<tr>
															<td>{el.newsLetterSignUp.email}</td>
															<td>{convertDate(el.updatedAt)}</td>
															<td>
																<button
																	onClick={() => handleDelete(el._id)}
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

									<div class="row mt-20">
										<div class="col-sm-12 col-md-6 mb-20">
											<div
												class="dataTables_info"
												id="datatable_info"
												role="status"
												aria-live="polite">
												Showing 1 to 10 of 57 entries
											</div>
										</div>

										<div class="col-sm-12 col-md-6">
											<div
												class="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          ">
												<ul class="pagination">
													<li
														class="
                                paginate_button
                                page-item
                                previous
                                disabled
                              ">
														<a
															href="/"
															aria-controls="datatable"
															data-dt-idx="0"
															tabindex="0"
															class="page-link">
															Previous
														</a>
													</li>

													<li class="paginate_button page-item active">
														<a
															href="/"
															aria-controls="datatable"
															data-dt-idx="1"
															tabindex="0"
															class="page-link">
															1
														</a>
													</li>

													<li class="paginate_button page-item">
														<a
															href="/"
															aria-controls="datatable"
															data-dt-idx="2"
															tabindex="0"
															class="page-link">
															2
														</a>
													</li>

													<li class="paginate_button page-item">
														<a
															href="/"
															aria-controls="datatable"
															data-dt-idx="3"
															tabindex="0"
															class="page-link">
															3
														</a>
													</li>

													<li class="paginate_button page-item next">
														<a href="/" tabindex="0" class="page-link">
															Next
														</a>
													</li>
												</ul>
											</div>
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

export default Email;
