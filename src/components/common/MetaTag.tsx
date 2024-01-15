import { Helmet } from "react-helmet-async";

const MetaTag = ({
	title,
	description,
}: {
	title?: string;
	description?: string;
}) => {
	const url = window.location.href;

	return (
		<Helmet>
			<meta name="og:url" content={url} />
			<link rel="canonical" href={url} />

			{title && (
				<>
					<title>PIXELBEAT{title && " | " + title}</title>

					<meta name="og:title" content={"PIXEL BEAT" + " | " + title} />
					<meta name="twitter:title" content={"PIXEL BEAT" + " | " + title} />
				</>
			)}
			{description && (
				<>
					<meta name="description" content={description} />
					<meta property="og:description" content={description} />
					<meta name="twitter:description" content={description} />
				</>
			)}
		</Helmet>
	);
};

export default MetaTag;
