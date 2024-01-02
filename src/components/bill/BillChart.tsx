import { TrackAnalysis } from "@/types/recommendTypes";
import { useEffect, useRef, useState } from "react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	RadarController,
	Filler,
	Legend,
} from "chart.js";
import billChartOption from "./billChartOption";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	RadarController,
	Filler,
	Legend,
);

const MIN_BPM = 60;
const MAX_BPM = 180;

const SORTED_KEY_LIST = [
	"danceability",
	"energy",
	"brightness",
	"acousticness",
	"tempo",
];

interface BIllChartProps {
	analysisList: TrackAnalysis;
	color?: string;
	isSmall?: boolean;
}

const BillChart = ({ analysisList, color, isSmall }: BIllChartProps) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);

	/** tempo만 값이 튀기때문에 BPM 범위로 정규화 */
	const normalizedTempo = (analysisList.tempo - MIN_BPM) / (MAX_BPM - MIN_BPM);

	const keyToValue = (key: keyof TrackAnalysis) => {
		const valueMap: Record<keyof TrackAnalysis, number> = {
			tempo: normalizedTempo,
			brightness: analysisList["valence"],
		};

		return {
			value: valueMap[key] !== undefined ? valueMap[key] : analysisList[key],
		};
	};

	useEffect(() => {
		const handleResize = () => {
			setWindowWidthSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!chartRef.current || !analysisList) return;

		const data = {
			labels: SORTED_KEY_LIST,
			datasets: [
				{
					data: SORTED_KEY_LIST.map((key) => keyToValue(key).value),
					backgroundColor: `${color}d9`,
					borderColor: color,
					borderWidth: 1,
					strokeColor: "#000",
					pointRadius: 0,
				},
			],
		};

		const ctx: CanvasRenderingContext2D = chartRef.current.getContext("2d")!;
		const chartInstance = new ChartJS(ctx, {
			type: "radar",
			data: data,
			options: billChartOption(isSmall),
		});

		return () => {
			chartInstance.destroy();
		};
	}, [analysisList, windowWidthSize]);

	return <canvas id="myChart" ref={chartRef}></canvas>;
};

export default BillChart;
