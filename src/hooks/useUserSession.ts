import { useEffect, useState } from "react";
import supabase from "@/api/supabase/client";

const useUserSession = () => {
	const [userId, setUserId] = useState<string>("");

	useEffect(() => {
		const fetchUserSession = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				setUserId(session!.user.id);
			} catch (error) {}
			return null;
		};

		fetchUserSession();
	}, []);

	return userId;
};
export default useUserSession;
