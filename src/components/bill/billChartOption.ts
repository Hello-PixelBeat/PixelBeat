const billChartOption = (isSmall: boolean | undefined) => {
	return {
		plugins: {
			legend: {
				display: false,
			},
		},
		legend: {
			pointLabels: {
				fontColor: "white",
			},
		},
		scales: {
			r: {
				grid: {
					color: "#000",
				},
				angleLines: {
					color: "#000",
				},
				ticks: {
					display: false,
					count: 4,
				},
				pointLabels: isSmall
					? { display: false }
					: {
							font: {
								size: 16,
								family:
									"NeoDunggeunmoPro-Regular, DungGeunMo, AppleSDGothicNeo, sans-serif",
							},
							color: "#000",
						},
			},
		},
		responsive: true,
		elements: {},
	};
};

export default billChartOption