import { User } from "@/types/user";
import useUserStore from "@/zustand/userStore";
import {
	UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateProfileMutation = (
	mutationFn: (props: any) => any,
): UseMutationResult<
	User,
	AxiosError,
	any,
	{
		previousProfile: User | undefined;
	}
> => {
	const queryClient = useQueryClient();
	const userId = useUserStore((state) => state.userInfo.id);

	return useMutation({
		mutationFn,
		onMutate: async (newProfile) => {
			// mutate가 호출될 때 쿼리를 확실하게 취소하고
			await queryClient.cancelQueries({
				queryKey: ["profiles from supabase", userId],
			});
			// 쿼리 상태를 가져온다(이전 값 스냅샷)
			const previousProfile = queryClient.getQueryData<User>([
				"profiles from supabase",
				userId,
			]);
			//이전값 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
			if (previousProfile) {
				queryClient.setQueryData(
					["profiles from supabase", userId],
					newProfile,
				);
			}
			return { previousProfile }; // 이전 값을 리턴한다
		},
		onError: (
			error: AxiosError,
			_: User,
			context?: { previousProfile: User | undefined },
		) => {
			if (context?.previousProfile) {
				// error 를 만났을 경우 onMutate에서 반환된 값으로 다시 롤백시켜준다.
				queryClient.setQueryData(
					["profiles from supabase", userId],
					context.previousProfile,
				);
			}
			console.log(error);
		},
		onSettled: () => {
			// mutation이 끝나면 (성공유무 상관없이) 쿼리를 무효화 처리하고 새로 가져온다.
			return queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userId],
			});
		},
	});
};

export default useUpdateProfileMutation;
