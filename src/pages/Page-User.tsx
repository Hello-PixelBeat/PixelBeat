import { getProfile } from "@/api/supabase/profilesTableAccessApis";
import Header from "@/components/common/Header";
import ProfileBillList from "@/components/profile/ProfileBillList";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLikeBillList from "@/components/profile/ProfileLikeBillList";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// user/:userid/bills
const User = () => {
	const navigate = useNavigate();
	const { userid } = useParams();
	const { pathname } = useLocation();
	const currentPath = pathname.split("/")[pathname.split("/").length - 1];

	const { data, isLoading } = useQuery({
		queryKey: ["userProfile", userid],
		queryFn: async () => {
			if (userid) {
				return await getProfile(userid);
			}
		},
		enabled: !!userid,
		staleTime: 60 * 5 * 1000,
	});

	if (isLoading) return null;

	const moveToBack = () => {
		navigate(-1);
	};

	const renderContents = (id: string) => {
		return {
			bills: <ProfileBillList userInfo={data} />,
			likebills: <ProfileLikeBillList userInfo={data} />,
		}[id];
	};

	return (
		<div>
			<Header type="MYPAGE" onClickLeftButton={moveToBack} isNoneMore={true} />
			<ProfileInfo userinfo={data} />
			{renderContents(currentPath)}
		</div>
	);
};

export default User;
