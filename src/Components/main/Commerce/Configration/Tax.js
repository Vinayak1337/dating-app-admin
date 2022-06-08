import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { API } from '../../../../data';
import { isAutheticated } from '../../../auth/authhelper';

function Tax() {
	const [taxList, settaxList] = useState([]);
	const { token } = isAutheticated();

	const getTax = useCallback(async () => {
		let tax = await axios.get(`${API}/api/tax/view_tax`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		settaxList(tax.data.tax);
	}, [token]);

	useEffect(() => {
		getTax();
	}, [getTax]);

	async function handleDelete(id) {
		let res = await axios.delete(`${API}/api/tax/delete_tax/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res) {
			window.location.reload();
		}
	}
	return (
		<div class="main-content">
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
								<h4 class="mb-0">Configuration - Tax Rates</h4>

								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">Dating App</a>
										</li>
										<li class="breadcrumb-item">Configuration - Tax Rates</li>
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
												<a href="/addtax">
													<button
														type="button"
														class="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														<i class="fa fa-plus" aria-hidden="true" /> Add New Tax Rate
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
													<th>Tax Rate</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Zero Tax</td>
													<td>0%</td>
													<td>&nbsp;</td>
												</tr>
												{taxList.map((tax, index) => {
													return (
														<tr key={index}>
															<td>{tax.name}</td>
															<td>{tax.tax}%</td>
															<td>
																<a href={`/tax/${tax._id}`}>
																	<button
																		type="button"
																		class="btn btn-primary btn-sm waves-effect waves-light btn-table ml-2">
																		Edit
																	</button>
																</a>

																<button
																	type="button"
																	class=" btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
																	onClick={() => handleDelete(tax._id)}
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

export default Tax;
