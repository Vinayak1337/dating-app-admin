import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../../../data';
import { isAutheticated } from '../../../auth/authhelper';

function ViewClient() {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	console.log(order);

	const [user, setUser] = useState('');
	const { token } = isAutheticated();

	const getOrderDetails = useCallback(async () => {
		const res = await axios.get(`${API}/api/order/admin/user_order/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setOrder(res.data);
	}, [id, token]);

	useEffect(() => {
		getOrderDetails();
	}, [getOrderDetails]);

	const getUser = useCallback(async () => {
		let res = await axios.get(`${API}/client/getClient/${id}`, {
			headers: {
				Authorization: `Client ${token}`,
			},
		});
		setUser(res.data.user);
	}, [id, token]);

	useEffect(() => {
		getUser();
	}, [getUser]);

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

	return (
		<div className="main-content">
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}
					<div className="row">
						<div className="col-12">
							<div className="page-title-box d-flex align-items-center justify-content-between">
								<h4 className="mb-0">Customer Information</h4>
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Dating App</Link>
										</li>
										<li className="breadcrumb-item active">Customer</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title --> */}
					<div className="row">
						<div className="col-lg-12">
							<div className="card">
								<div className="card-body">
									<div className="col-sm-12 col-md-6 ml-auto mb-5">
										<div className="dropdown d-block">
											<a href="/clients">
												<button
													type="button"
													className="btn btn-login text-white add-btn waves-effect waves-light float-right">
													Back
												</button>
											</a>
										</div>
									</div>
									<div className="table-responsive table-shoot">
										<table className="table">
											<tr>
												<th>First Name</th>
												<td>{user.firstName}</td>
											</tr>
											<tr>
												<th>Last Name</th>
												<td>{user.lastName}</td>
											</tr>
											<tr>
												<th>Email</th>
												<td>{user.email}</td>
											</tr>
											<tr>
												<th>Mobile </th>
												<td>{user.phoneNo || '-'}</td>
											</tr>
											<tr>
												<th>Joined On</th>
												<td>{convertDate(user.createdAt)}</td>
											</tr>
											<tr>
												<th>Unique Client ID</th>
												<td>{user._id}</td>
											</tr>
											<tr>
												<th>Orders</th>
												<td>-</td>
											</tr>
											<tr>
												<th>Address1</th>
												<td>-</td>
											</tr>
											<tr>
												<th>Address2</th>
												<td>-</td>
											</tr>
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

export default ViewClient;
