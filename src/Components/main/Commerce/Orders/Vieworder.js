import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../data';
import swal from 'sweetalert';
function Vieworder() {
	const { id } = useParams();
	const [orderDetails, setorderDetails] = useState('');
	const [orderDate, setorderDate] = useState('');
	const [status, setStatus] = useState('');
	const [currentStatus, setcurrentStatus] = useState('');

	const getOrderDetails = useCallback(async () => {
		const order = await axios.get(`${API}/api/order/${id}`);
		setorderDate(order.data.order.createdAt);
		setcurrentStatus(order.data.order.status);
		setorderDetails(order.data.order);
	}, [id]);

	useEffect(() => {
		getOrderDetails();
	}, [getOrderDetails]);

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
			'Dec'
		];
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(
			' '
		);
	}
	console.log(status);
	async function handleStatus(e) {
		e.preventDefault();
		const orderStatus = await axios.patch(
			`${API}/api/order/update_orderStatus`,
			{
				id,
				status
			}
		);
		if (orderStatus.data) {
			swal('Order Status Updated', 'Success!');
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
								<h4 class="mb-0">Order Details</h4>
								<div class="page-title-right">
									<ol class="breadcrumb m-0">
										<li class="breadcrumb-item">
											<a href="/dashboard">POP</a>
										</li>
										<li class="breadcrumb-item active">Commerce</li>
										<li class="breadcrumb-item active">Add New Product</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="form-group text-right">
								<a href="/">
									<button
										onClick={(e) => handleStatus(e)}
										type="button"
										className="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      ">
										Save
									</button>
								</a>
								<a href="/">
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
											<table>
												<tr>
													<td width="125">
														<strong>Order Date</strong>
													</td>
													<td>{convertDate(orderDate)}</td>
												</tr>
												<tr>
													<td>
														<strong>Order ID</strong>
													</td>
													<td>{id}</td>
												</tr>
												<tr>
													<td>
														<strong>Items</strong>
													</td>
													<td>{orderDetails.totalQuantity}</td>
												</tr>
												<tr>
													<td>
														<strong>Total Amount</strong>
													</td>
													<td>Rs.{orderDetails.Amount} </td>
												</tr>
												<tr>
													<td>
														<strong>Address</strong>
													</td>
													<td>
														{orderDetails.appartment
															? `${orderDetails.address} ${orderDetails.appartment}`
															: orderDetails.address}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Email</strong>
													</td>
													<td>{orderDetails.email}</td>
												</tr>
												<tr>
													<td>
														<strong>Mobile</strong>
													</td>
													<td>{orderDetails.phone}</td>
												</tr>
											</table>
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
											<table>
												<tr>
													<td>
														<strong style={{ marginRight: '10px' }}>
															Order Status
														</strong>
													</td>
													<td>{currentStatus}</td>
												</tr>
												<tr>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
												</tr>
											</table>
										</div>
									</div>

									<div class="row">
										<div class="col-md-12">
											<form>
												<div class="row">
													<div class="col-lg-12">
														<div class="form-group">
															<label
																for="basicpill-phoneno-input"
																class="label-100">
																Change Status
															</label>
															<select
																name="currency"
																value={status}
																class="form-control input-field"
																onChange={(e) => {
																	setStatus(e.target.value);
																}}>
																<option value="">--select--</option>
																<option>Processing</option>
																<option>Dispatched</option>
																<option>Delivered</option>
																<option>Cancelled</option>
																<option>Returned</option>
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
											<div className="table-responsive table-shoot">
												<table className="table table-centered table-nowrap mb-0">
													<thead className="thead-light">
														<tr>
															<th>Product</th>
															<th>Qty</th>
															<th>Price</th>
															<th>Tax (%)</th>
															<th>Tax (Amount)</th>
															<th>Total Amount</th>
														</tr>
													</thead>
													<tbody>
														{orderDetails.product
															? orderDetails.product.map((item) => {
																	return (
																		<tr>
																			<td>
																				<img
																					src={item.image[0]}
																					width="110"
																					height="60"
																					alt=""
																				/>
																			</td>
																			<td>{item.quantity}</td>
																			<td>{item.price}</td>
																			<td>-</td>
																			<td>-</td>
																			<td>{item.totalPrice}</td>
																		</tr>
																	);
															  })
															: ''}
													</tbody>
												</table>
											</div>
											{/* <table>
                        <tr>
                          <td width="125" align="left">
                            <strong>Product</strong>
                          </td>
                          <td width="75" align="center">
                            <strong>Qty</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Price</strong>
                          </td>
                          <td width="100" align="center">
                            <strong>Tax (%)</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Tax (Amount)</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Total Amount</strong>
                          </td>
                        </tr>
                        <tr>
                          <td width="125" align="left">
                            <img src="assets/images/mini-cart-02.jpg" />
                            <br />
                            Product name
                          </td>
                          <td width="75" align="center">
                            1
                          </td>
                          <td width="125" align="right">
                            Rs. 100.00
                          </td>
                          <td width="100" align="center">
                            5%
                          </td>
                          <td width="125" align="right">
                            Rs. 5.00
                          </td>
                          <td width="125" align="right">
                            Rs. 105.00
                          </td>
                        </tr>
                      </table> */}
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

export default Vieworder;
