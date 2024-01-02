import useRecommendStore from "@/zustand/recommendStore";
import { useEffect } from "react";

const UserBill = () => {
	const resetRecommendStore = useRecommendStore(
		(state) => state.resetRecommendStore,
	);

	useEffect(() => {
		resetRecommendStore();
	}, []);

	return <>page-UserBIll</>;
};

export default UserBill;
