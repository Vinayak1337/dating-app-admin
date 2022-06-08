import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../../Footer';
import { API } from '../../../../data';
import { isAutheticated } from '../../../auth/authhelper';
import swal from 'sweetalert';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setLogos } from '../../../../Redux/LogoReducer/logoActions';

function Logo({ logos, setLogos }) {
	const [state, setState] = useState({
		loading: false,
		headerLogo: '',
		footerLogo: '',
		adminLogo: '',
		display: true,
	});

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const { token } = isAutheticated();

	const getConfiguration = useCallback(async () => {
		const configDetails = await axios.get(`${API}/api/config/logo`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const logos = configDetails.data;

		setLogos({
			headerLogo: logos.Headerlogo,
			footerLogo: logos.Footerlogo,
			adminLogo: logos.Adminlogo,
		});
	}, [setLogos, token]);

	useEffect(() => {
		getConfiguration();
	}, [getConfiguration]);

	async function handelChange(e) {
		changeState({ display: false });
		console.log(e.target.name === 'Logo for Website Header(148 x 48 px)');
		if (e.target.name === 'Logo for Website Header(148 x 48 px)') {
			changeState({ headerLogo: e.target.files[0] });
		} else if (e.target.name === 'Logo for Website Footer(148 x 48 px)') {
			changeState({ footerLogo: e.target.files[0] });
		} else if (e.target.name === 'Logo for Admin Header(148 x 48 px)') {
			changeState({ adminLogo: e.target.files[0] });
		}
	}

	async function handelSubmit() {
		changeState({ loading: true });
		const { headerLogo, footerLogo, adminLogo } = state;
		const formdata = new FormData();
		formdata.append('headerLogo', headerLogo);
		formdata.append('footerLogo', footerLogo);
		formdata.append('adminLogo', adminLogo);

		let res = await axios.post(`${API}/api/config/logo`, formdata, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		changeState({ loading: false });

		if (res) {
			swal('Success!', res.data.message, res.data.status);
		}
	}

	return (
		<div>
			<div className="main-content">
				<div className="page-content">
					<div className="container-fluid">
						{/* <!-- start page title --> */}

						<div className="row">
							<div className="col-12">
								<div className="page-title-box d-flex align-items-center justify-content-between">
									<h4 className="mb-0">Logo</h4>

									<div className="page-title-right">
										<ol className="breadcrumb m-0">
											<li className="breadcrumb-item">
												<Link to="/dashboard">Dating App</Link>
											</li>
											<li className="breadcrumb-item">Logo</li>
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
										<div className="row">
											<div className="col-md-12 col-lg-6 col-xl-6">
												<h1 className="text-left head-small">Logo</h1>

												<form>
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group">
																<label for="basicpill-phoneno-input" className="label-100 mt-3">
																	Logo for Website Header(148 x 48 px)
																</label>
																<div>
																	<input
																		type="file"
																		name="Logo for Website Header(148 x 48 px)"
																		onChange={(e) => handelChange(e)}
																		className="form-control input-field col-md-6 d-inline-block"
																		id="basicpill-phoneno-input"
																	/>
																	{state.display ? (
																		<img style={{ width: '100px' }} src={logos.headerLogo} alt="header logo" />
																	) : (
																		''
																	)}
																</div>
																<label for="basicpill-phoneno-input" className="label-100 mt-3">
																	Logo for Website Footer(148 x 48 px)
																</label>
																<input
																	type="file"
																	name="Logo for Website Footer(148 x 48 px)"
																	onChange={(e) => handelChange(e)}
																	className="form-control input-field col-md-6 d-inline-block"
																	id="basicpill-phoneno-input"
																/>{' '}
																{state.display ? (
																	<img style={{ width: '100px' }} src={logos.footerLogo} alt="Footer logo" />
																) : (
																	''
																)}
																<label for="basicpill-phoneno-input" className="label-100 mt-3">
																	Logo for Admin Header(148 x 48 px)
																</label>
																<input
																	type="file"
																	name="Logo for Admin Header(148 x 48 px)"
																	onChange={(e) => handelChange(e)}
																	className="form-control input-field col-md-6 d-inline-block"
																	id="basicpill-phoneno-input"
																/>{' '}
																{state.display ? (
																	<img style={{ width: '100px' }} src={logos.adminLogo} alt="Admin logo" />
																) : (
																	''
																)}
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-lg-12">
															<div className="form-group text-left">
																<button
																	type="button"
																	onClick={handelSubmit}
																	className="btn btn-success btn-login waves-effect waves-light mr-3 pt-2 pb-2 pr-4 pl-4">
																	<ClipLoader loading={state.loading} size={18} />
																	{!state.loading && 'Save'}
																</button>
																<button
																	onClick={() => changeState({ loading: false })}
																	type="button"
																	className="btn btn-outline-secondary waves-effect waves-light mr-3 pt-2 pb-2 pr-4 pl-4">
																	Cancel
																</button>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>

										{/* <!-- end table-responsive --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- container-fluid --> */}
				</div>
				{/* <!-- End Page-content --> */}

				<Footer />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	logos: state.logoReducer.logos,
});

const mapDispatchToProps = (dispatch) => ({
	setLogos: (logos) => dispatch(setLogos(logos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
