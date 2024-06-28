const TemperatureTiles = ({
	temperatures,
}: {
	temperatures: { temperatureClosestToZero: number | undefined; temperatures: number[] | undefined };
}) => {
	//legend data - color and label mappings
	const legendData = {
		cold: { color: 'sky-300', label: 'Cold' },
		hot: { color: 'amber-300', label: 'Hot' },
		closestToZero: { color: 'red-400', label: 'Closest to zero' },
	};

	//outputs colour legend for tiles and chart
	const Legend = ({ legend }: { legend: { [key: string]: { color: string; label: string } } }) => (
		<div className='flex gap-5 justify-center'>
			{Object.entries(legend).map(([key, value]) => (
				<p key={key}>
					<span className={`border bg-${value.color} px-2`} />
					&nbsp;- {value.label}
				</p>
			))}
		</div>
	);

	//outputs tiles with temperature values
	const TilesOutput = () => {
		return (
			<div className='flex flex-wrap md:w-full lg:w-2/3 justify-evenly mx-auto gap-2'>
				{temperatures.temperatures &&
					temperatures.temperatures.map((temperature, index) => {
						return (
							<p
								key={index}
								className={`border border-gray-300 px-3 py-1 rounded shadow-sm text-black ${
									temperatures.temperatureClosestToZero === temperature
										? 'bg-red-400' //closest to zero
										: Math.sign(temperature) === -1
										? 'bg-sky-300' //negative vals
										: 'bg-amber-300' //positive vals
								}`}>
								{temperature}
							</p>
						);
					})}
			</div>
		);
	};

	return (
		<>
			<Legend legend={legendData} />
			<TilesOutput />
		</>
	);
};

export default TemperatureTiles;
