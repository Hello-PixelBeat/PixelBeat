import { useParams } from "react-router-dom";

const GuestBill = () => {
	const { id } = useParams();
  console.log(id)
	return <div>Page-GuestBill</div>;
};

export default GuestBill;
