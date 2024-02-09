import BOTTOMSHEET_TYPE, {
	type BottomSheetTypes,
} from "@/constants/bottomSheetText";
import { useModal } from "@/hooks/useModal";
import { BottomSheetTop } from "..";

const BottomSheet = ({ onClick }: { onClick?: any }) => {
	const { isVisible, closeModal, modalType, isShow } = useModal();

	// modalType === 'myBillList'일 때 쥬스탠드에서 관리하고 있는  내 ownplaylist들고오기
	//ownplaylist에 저장할때 id랑 이름 객체 배열로 저장하기
	if (modalType === "myBillList") {
	}

	if (!isVisible) return null;

	return (
		<div
			onClick={closeModal}
			className={`portal-background fixed left-1/2
                  top-0 flex h-[100svh] w-[390px]
                  -translate-x-1/2 
                  items-center 
                  justify-center desktop:w-[720px]
                  ${
										isShow
											? "portal-background-open"
											: "portal-background-close"
									}
                  `}
		>
			<div
				className={`${
					isShow ? "open" : "closing"
				}  absolute bottom-0 rounded-t-[30px] bg-mainWhite desktop:rounded-t-[56px] `}
			>
				<BottomSheetTop onClick={closeModal} />
				<div
					className=" w-full 
                    "
				>
					<ul className="text-section mb-40 ">
						{BOTTOMSHEET_TYPE[modalType as keyof BottomSheetTypes] &&
							BOTTOMSHEET_TYPE[modalType as keyof BottomSheetTypes].map(
								(item, idx) => (
									<li key={idx}>
										<button
											type="button"
											className={` w-full p-12 px-20 text-left text-mainBlack
                  hover:bg-mainBlack 
                  hover:text-mainWhite desktop:px-60`}
											onClick={onClick}
										>
											{item}
										</button>
									</li>
								),
							)}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default BottomSheet;
