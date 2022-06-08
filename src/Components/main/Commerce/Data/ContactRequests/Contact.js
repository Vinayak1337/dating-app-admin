import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../../data';
import { isAutheticated } from '../../../../auth/authhelper';

function Contact() {
	let { token } = isAutheticated();
	let [contact, setContact] = useState([]);
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
	const getContactRequests = useCallback(async () => {
		let contacts = await axios.get(`${API}/api/contact/view_Contact`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(contacts, 'CONTACT');
		setContact(contacts.data.Contact);
	}, [token]);

	useEffect(() => {
		getContactRequests();
	}, [getContactRequests]);

	async function handleDelete(id) {
		let deleted = await axios.delete(`${API}/api/contact/delete_Contact/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(deleted);
		if (deleted.data.message) {
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
								<h4 class="mb-0">Data Management - Contact Requests</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item">Data Management - Contact Requests</li>
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
										<div class="col-sm-12 col-md-6">
											<div class="dropdown d-block">
												<a href="/add-contact">
													<button
														type="button"
														class="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														<i class="fa fa-plus" aria-hidden="true" /> Add Contact Request Manually
													</button>
												</a>
											</div>
										</div>
									</div>
									<div class="table-responsive table-shoot">
										<table class="table table-centered table-nowrap mb-0">
											<thead class="thead-light">
												<tr>
													<th>Name</th>
													<th>Email</th>
													<th>Phone</th>
													<th>Received On</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{contact.map((item) => {
													return (
														<tr>
															<td>{item.name}</td>
															<td>{item.email}</td>
															<td>{item.phoneNo}</td>
															<td>{convertDate(item.createdAt)}</td>
															<td>
																{item.status ? (
																	<span
																		class="
                                  badge badge-pill badge-success
                                  font-size-12
                                ">
																		read
																	</span>
																) : (
																	<span
																		class="
                                  badge badge-pill badge-danger
                                  font-size-12
                                ">
																		Unread
																	</span>
																)}
															</td>
															<td>
																<a href={`/view-contact/${item._id}`}>
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
																	onClick={() => handleDelete(item._id)}
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

export default Contact;
