import { Helmet } from "react-helmet-async";

const MainMetaTag = () => {
	return (
		<Helmet>
			<meta charSet="UTF-8" />
			<link rel="manifest" href="/manifest.json" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>PIXELBEAT</title>

			<meta name="theme-color" content="#000" />
			<meta name="robots" content="index,nofollow" />
			<meta property="og:type" content="website" />
			<meta name="og:site_name" content="PIXEL BEAT" />

			<meta name="og:title" content={"PIXEL BEAT"} />
			<meta name="twitter:title" content={"PIXEL BEAT"} />

			<link rel="icon" type="image/svg+xml" href="/icons/favicon.ico" />
			<meta property="og:image" content="/icons/favicon.ico" />
			<meta name="twitter:image" content="/icons/favicon.ico" />
			<link
				rel="apple-touch-icon-precomposed"
				sizes="57x57"
				href="/icons/apple-touch-icon-57x57.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="114x114"
				href="/icons/apple-touch-icon-114x114.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="72x72"
				href="/icons/apple-touch-icon-72x72.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="144x144"
				href="/icons/apple-touch-icon-144x144.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="60x60"
				href="/icons/apple-touch-icon-60x60.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="120x120"
				href="/icons/apple-touch-icon-120x120.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="76x76"
				href="/icons/apple-touch-icon-76x76.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="152x152"
				href="/icons/apple-touch-icon-152x152.png"
			/>
			<link
				rel="icon"
				type="image/png"
				href="favicon-196x196.png"
				sizes="196x196"
			/>
			<link
				rel="icon"
				type="image/png"
				href="favicon-96x96.png"
				sizes="96x96"
			/>
			<link
				rel="icon"
				type="image/png"
				href="favicon-32x32.png"
				sizes="32x32"
			/>
			<link
				rel="icon"
				type="image/png"
				href="favicon-16x16.png"
				sizes="16x16"
			/>
			<link
				rel="icon"
				type="image/png"
				href="favicon-128.png"
				sizes="128x128"
			/>
			<meta name="application-name" content="PIXEL BEAT" />
			<meta name="msapplication-TileColor" content="#57FF57" />
			<meta name="msapplication-TileImage" content="mstile-144x144.png" />
			<meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
			<meta
				name="msapplication-square150x150logo"
				content="mstile-150x150.png"
			/>
			<meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
			<meta
				name="msapplication-square310x310logo"
				content="mstile-310x310.png"
			/>

			<meta name="og:url" content={"https://pixel-beat-alpha.vercel.app/"} />
			<link rel="canonical" href={"https://pixel-beat-alpha.vercel.app/"} />

			<meta
				name="description"
				content="Piexl Beat는 사용자의 응답에 따라 추천 음악 영수증을 제공해 음악 성향을 확인하고 다양한 음악을 접해볼 수 있는 플랫폼입니다."
			/>
			<meta
				property="og:description"
				content={
					"PIXEL BEAT는 사용자의 응답에 따라 추천 음악 영수증을 제공해 음악 성향을 확인하고 다양한 음악을 접해볼 수 있는 플랫폼입니다."
				}
			/>
			<meta
				name="twitter:description"
				content={
					"PIXEL BEAT는 사용자의 응답에 따라 추천 음악 영수증을 제공해 음악 성향을 확인하고 다양한 음악을 접해볼 수 있는 플랫폼입니다."
				}
			/>
		</Helmet>
	);
};

export default MainMetaTag;
