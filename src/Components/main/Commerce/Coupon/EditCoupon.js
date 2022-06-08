import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../../../../data';
import { isAutheticated } from '../../../auth/authhelper';

function EditCoupon2() {
	const { token } = isAutheticated();
	const { id } = useParams();

	const [state, setSate] = useState({
		name: '',
		couponCode: '',
		offPercent: '',
		amountOff: '',
		promotionType: '',
		appliesTo: '',
		limitUser: '',
		startDate: '',
		endDate: '',
		status: '',
	});

	const changeState = (newState) =>
		setSate((prevState) => ({ ...prevState, ...newState }));

	const getCoupon = useCallback(async () => {
		const res = await axios.get(`${API}/api/coupon/${id}`);
		changeState({
			...res.data.data,
			promotionType: res.data.data.amountOff ? 'amountOff' : 'offPercent',
		});
	}, [id]);

	useEffect(() => {
		getCoupon();
	}, [getCoupon]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		changeState({ [name]: value });
	};

	async function handleSubmit() {
		let {
			name,
			couponCode,
			offPercent,
			amountOff,
			appliesTo,
			limitUser,
			customerLimit,
			startDate,
			endDate,
			status,
			promotionType,
		} = state;

		promotionType === 'amountOff' ? (offPercent = '') : (amountOff = '');

		let res = await axios.post(
			`${API}/api/coupon/add`,
			{
				name,
				couponCode,
				offPercent,
				amountOff,
				appliesTo,
				limitUser,
				customerLimit,
				startDate,
				endDate,
				status: status === 'Active' ? true : false,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (res.data.status) {
			window.location.href = '/comcoupon';
		}
	}

	return (
		<div className="main-content">
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}
					<div className="row">
						<div className="col-12">
							<div
								className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  ">
								<h4 className="mb-0">Add Coupon</h4>
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<a href="/tellytell">TellyTell</a>
										</li>
										<li className="breadcrumb-item active">Commerce</li>
										<li className="breadcrumb-item active">Add Coupon</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title -->

            <!-- Save options Begins--> */}
					<div className="row">
						<div className="col-12">
							<div className="form-group text-right">
								<button
									onClick={handleSubmit}
									type="button"
									className="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      ">
									Save
								</button>

								<a href="/comcoupon">
									<button
										type="button"
										className="
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
					{/* <!-- Save options Ends-->

            <!-- Row 1 Begins --> */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Name
															</label>
															<input
																value={state.name}
																name="name"
																type="text"
																className="form-control input-field"
																onChange={handleChange}
															/>
															<label for="basicpill-phoneno-input" className="label-100">
																This name is shown to customers at checkout.
															</label>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Coupon Code
															</label>
															<input
																name="couponCode"
																type="text"
																className="form-control input-field"
																value={state.couponCode}
																onChange={handleChange}
															/>
															<label for="basicpill-phoneno-input" className="label-100">
																Customers enter this code at checkout.
															</label>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends -->

              <!--Right Column Begins --> */}
						<div className="col-lg-4">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Status
															</label>
															<select
																name="status"
																className="form-control input-field"
																value={state.status ? 'Active' : 'Inactive'}
																onChange={handleChange}>
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
						{/* <!--Right Column Ends --> */}
					</div>
					{/* <!-- Row 1 Ends -->

            <!-- Row 2 Begins --> */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-lg-12">
											<label className="col-md-4 control-label">Promotion</label>
											<div className="col-md-8">
												<input
													type="radio"
													value="offPercent"
													name="promotionType"
													defaultChecked={Boolean(state.offPercent)}
													onChange={handleChange}
												/>
												<label for="promotionType">Percentage Off</label>
												{state.promotionType === 'offPercent' && (
													<input
														type="text"
														name="offPercent"
														className="w-100"
														value={state.offPercent}
														onChange={handleChange}
													/>
												)}

												<br />
												<input
													type="radio"
													value="amountOff"
													name="promotionType"
													defaultChecked={Boolean(state.amountOff)}
													onChange={handleChange}
												/>
												<label for="promotionType">Amount Off</label>
												{state.promotionType === 'amountOff' && (
													<input
														type="text"
														name="amountOff"
														value={state.amountOff}
														className="w-100"
														onChange={handleChange}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends --> */}
					</div>
					{/* <!-- Row 2 Ends -->
            <!-- Row 2 Begins --> */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Applies to
															</label>
															<select
																className="form-control input-field"
																name="appliesTo"
																value={state.appliesTo}
																onChange={handleChange}>
																<option value="">--select--</option>
																<option value="Any Order">Any Order</option>
																<option value="Orders Over">Orders Over</option>
															</select>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Limit Total User
															</label>
															<select
																name="limitUser"
																value={state.limitUser}
																className="form-control input-field"
																onChange={handleChange}>
																<option value="">--select--</option>
																<option value="unlimited">Unlimited</option>
																<option value="limited">Limited Users</option>
															</select>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-12">
											<div className="form-group">
												<label for="basicpill-phoneno-input" className="label-100">
													Start Date
												</label>
												<div className="input-group">
													<input
														name="startDate"
														value={state.startDate}
														type="date"
														className="form-control input-field"
														data-provide="datepicker"
														data-date-format="dd M, yyyy"
														data-date-autoclose="true"
														onChange={handleChange}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-12">
											<div className="form-group">
												<label for="basicpill-phoneno-input" className="label-100">
													End Date
												</label>
												<div className="input-group">
													<input
														name="endDate"
														type="date"
														className="form-control input-field"
														data-provide="datepicker"
														data-date-format="dd M, yyyy"
														data-date-autoclose="true"
														value={state.endDate}
														onChange={handleChange}
													/>
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
		</div>
	);
}

export default EditCoupon2;
