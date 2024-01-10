import supabase from "@/api/supabase/client";

const getUserIdFromSession = async () => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session!.user.id;
	} catch (error) {}
	return null;
};

export default getUserIdFromSession;
