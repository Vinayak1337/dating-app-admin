import React from 'react';

function Footer() {
	return (
		<footer className="footer">
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12">{new Date().getFullYear()} © Dating App.</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
