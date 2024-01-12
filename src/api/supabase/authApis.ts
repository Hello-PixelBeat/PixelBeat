import supabase from "./client";

const PIXELBEAT_URL = import.meta.env.VITE_BASE_URL;

//이메일로 회원가입
export const signUpWithEmail = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				// 이메일 확인시 이동될 경로 설정
				emailRedirectTo: `${PIXELBEAT_URL}/profileupload`,
			},
		});

		if (error) {
			console.error("Sign-up error:", error.message);
			return error;
		}

		// 성공 시 사용자 정보(data)를 반환
		return data;
	} catch (error: any) {
		console.error("Unexpected error during sign-up:", error.message);
		throw new error(error);
	}
};

//카카오로 시작하기
export const signInWithKakao = async () => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "kakao",
			options: {
				redirectTo: `${PIXELBEAT_URL}/home`,
			},
		});

		if (error) {
			console.error("Kakao OAuth 로그인 중 에러:", error.message);
			return;
		}
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//구글로 시작하기
export const signInWithGoogle = async () => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${PIXELBEAT_URL}/home`,
				queryParams: {
					access_type: "offline",
					prompt: "consent",
				},
			},
		});
		if (error) {
			console.error("Google OAuth 로그인 중 에러:", error.message);
			return;
		}
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//이메일로 로그인
export const signInWithEmail = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Sign-up error:", error.message);
		}

		return data;
	} catch (error: any) {
		console.error("Unexpected error during sign-up:", error.message);
		return error;
	}
};

//로그아웃
export const signOutUser = async () => {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Sign-up error:", error.message);
		}

		return error;
	} catch (error: any) {
		console.error("Unexpected error during sign-up:", error.message);
		return error;
	}
};
