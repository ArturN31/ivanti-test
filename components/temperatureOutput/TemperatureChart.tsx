import { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';

const TemperatureChart = ({
	temperatures,
}: {
	temperatures: { temperatureClosestToZero: number | undefined; temperatures: number[] | undefined };
}) => {
	const [data, setData] = useState<{ temperature: number }[]>();

	useEffect(() => {
		const prepareChartData = (temperatures: number[]) => {
			const newArr = temperatures.map((temperature) => {
				return { temperature: temperature };
			});
			setData(newArr);
		};
		if (temperatures.temperatures) {
			try {
				prepareChartData(temperatures.temperatures);
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return data ? (
		<div className='grid place-content-center overflow-auto'>
			<BarChart
				width={1000}
				height={500}
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
				<YAxis />
				<XAxis />
				<ReferenceLine
					y={0}
					stroke='#000'
				/>
				<CartesianGrid strokeDasharray='2 2' />
				<Brush
					height={20}
					stroke='#666999'
				/>
				<Bar
					dataKey='temperature'
					label={{ position: 'bottom', fill: 'black' }}>
					{data.map((temperature, index) => (
						<Cell
							key={`cell-${index}`}
							fill={
								temperature.temperature === temperatures.temperatureClosestToZero
									? '#F87171' //closest to zero
									: Math.sign(temperature.temperature) === -1
									? '#7DD3FC' //negative val
									: '#FCD34D' //positive val
							}
						/>
					))}
				</Bar>
			</BarChart>
		</div>
	) : (
		''
	);
};

export default TemperatureChart;
