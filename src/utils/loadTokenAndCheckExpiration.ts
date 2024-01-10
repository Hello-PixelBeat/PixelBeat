import { getNoneMemberToken } from "@/api/getNoneMemberToken";

const loadTokenAndCheckExpiration = async () => {
	const storedToken = localStorage.getItem("none-member-token");
	const storedExpiration = localStorage.getItem("none-member-token-expiration");

	if (
		!storedToken ||
		(storedExpiration && Date.now() > parseInt(storedExpiration))
	) {
		const token = await getNoneMemberToken();
		const expireTime = Date.now() + 60 * 60 * 1000;
		localStorage.setItem("none-member-token", token);
		localStorage.setItem("none-member-token-expiration", expireTime.toString());
	}

	return storedToken;
};
export default loadTokenAndCheckExpiration;
