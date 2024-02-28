import LogoBlack from "@/assets/images/LogoBlack.png";
import barcodeImg from "@/assets/images/barcode.png";
import BILL_TEXT from "@/constants/billText";
import { Spinner } from "..";

const MakingBillAnimateComponent = () => {
	return (
		<div className="">
			{/* 상단 영수증 기계 */}
			<div className="absolute z-20 h-50 w-full bg-mainGreen pt-40">
				<div className="mx-auto h-10 w-376 rounded-t-full bg-[#282828]" />
			</div>
			<div className="absolute top-50 h-30 w-full bg-mainGreen">
				<div className="mx-auto h-10 w-376 rounded-b-full bg-[#282828]" />
			</div>

			{/* 영수증 */}
			<div className="making-bill-animate bill-background-side absolute left-[50%] top-20 z-10 mb-50 mt-40 w-354 translate-x-[-50%] bg-white text-center text-mainBlack ">
				<h1 className="mx-auto my-20 w-200">
					<img src={LogoBlack} alt="logo image" />
				</h1>
				<div className="mx-16 flex h-48 flex-col justify-center border-y-2 border-dashed border-mainBlack pl-14  text-left text-14 leading-[1.2]">
					<p className="w-200 truncate ">Artist, {BILL_TEXT.ETC}</p>
					<p>{BILL_TEXT.PRODUCER}</p>
				</div>
				<div className="mb-[-70px] p-80">
					<Spinner fillColor="black" />
				</div>
				<section className="bill-bottom-section ">
					<div className=" mx-16 border-y-2 border-dashed border-mainBlack py-8 text-14">
						<time className="block w-full text-left">
							January 00, 0000 00:00 AM
						</time>
						<div className="flex w-full justify-between">
							<p>{BILL_TEXT.PIXELBEATE_DOMAIN}</p>
							<p>{BILL_TEXT.PROVIDER}</p>
						</div>
					</div>
				</section>

				<img
					src={barcodeImg}
					alt={BILL_TEXT.BARCODE_IMG_ALT}
					className="mx-auto mb-5 mt-24"
				/>
			</div>
		</div>
	);
};

export default MakingBillAnimateComponent;
