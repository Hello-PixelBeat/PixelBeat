import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StandardButton } from "@/components";
import { signInWithEmail } from "@/api/supabase/authApis";
import Portal from "@/utils/portal";
import useConfirm from "@/hooks/useConfirm";
import InputSection from "./InputSection";
import ConfirmModal from "../common/ConfirmModal";

const SignInForm = () => {
	const navigate = useNavigate();
	const { openConfirm, isShow } = useConfirm();
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await signInWithEmail({email: formState.email, password:formState.password});

		if (!res.user) {
			openConfirm("LOGIN_FAIL");
			return;
		}
		if (res.user) {
			navigate("/home");
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const isSubmitDisabled = () => !formState.email || !formState.password;

	return (
		<div className="px-20 desktop:px-60">
			<form onSubmit={handleSignIn}>
				<InputSection formState={formState} handleInput={handleInput} />
				<StandardButton
					type="submit"
					className="mx-auto mt-22 h-56
                    w-full 
                    desktop:h-60 "
					text={"다음"}
					disabled={isSubmitDisabled()}
					fillColor={isSubmitDisabled() ? "" : "#57FF57"}
				/>
			</form>

			<Portal>{isShow && <ConfirmModal />}</Portal>
		</div>
	);
};

export default SignInForm;
