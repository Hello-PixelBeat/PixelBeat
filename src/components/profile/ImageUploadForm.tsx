import ImageUploadIcon from "@/assets/svgs/ImageUploadIcon.svg?react";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import defaultProfile from "@/assets/images/Profile.png";

interface ImageUploadFormProps {
	image: any;
	setImage: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUploadForm = ({ image, setImage }: ImageUploadFormProps) => {
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

	//이미지 변경감지 함수
	const handleImageChange = async (file: File) => {
		if (!file) return;

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1024,
		};

		try {
			const compressedFile = await imageCompression(file, options);
			const selected = compressedFile.size < file.size ? compressedFile : file;
			setImage(selected);

			const imageUrl = URL.createObjectURL(selected);
			setPreviewImageUrl(imageUrl);
			return () => URL.revokeObjectURL(imageUrl);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div
				className={`relative h-116 w-116 overflow-hidden desktop:h-200 desktop:w-200`}
			>
				<img
					src={previewImageUrl || image || defaultProfile}
					alt="프로필 이미지 미리보기"
					className="h-full w-full"
				/>
			</div>
			<label className="relative">
				<input
					id="imageUpload"
					className="absolute inset-0 hidden cursor-pointer"
					type="file"
					accept="image/*"
					onChange={(e) => handleImageChange(e.target.files?.[0]!)}
				/>
				<div className="relative">
					<ImageUploadIcon
						className="absolute right-[-20px]
                        top-[-20px] h-36 cursor-pointer
                        desktop:right-[-30px] desktop:top-[-40px] desktop:h-60"
					/>
				</div>
			</label>
		</div>
	);
};

export default ImageUploadForm;
