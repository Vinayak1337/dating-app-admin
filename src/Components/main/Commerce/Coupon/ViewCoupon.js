import React from 'react';
import { useParams } from 'react-router';

const ViewCoupon = () => {
	const { id } = useParams();
	return <div>{id} Under Construction</div>;
};

export default ViewCoupon;
