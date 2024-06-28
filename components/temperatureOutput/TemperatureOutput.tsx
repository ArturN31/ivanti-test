'use client';

import { useEffect, useState } from 'react';
import RemoveTemperaturesBtn from './RemoveTemperaturesBtn';
import TemperatureChart from './TemperatureChart';
import TemperatureTiles from './TemperatureTiles';

const TemperatureOutput = () => {
	const [temperatures, setTemperatures] = useState<{
		temperatureClosestToZero: number | undefined;
		temperatures: number[] | undefined;
	}>({
		temperatureClosestToZero: undefined,
		temperatures: undefined,
	});

	useEffect(() => {
		//retrieves temperatures from the db
		const getTemperatures = async () => {
			try {
				const apiEndpoint = '/api/temperatures';
				const response = await fetch(apiEndpoint);
				const data = await response.json();
				setTemperatures(data);
			} catch (error) {
				console.log(error);
			}
		};
		getTemperatures();
	}, []);

	return temperatures.temperatures !== undefined && temperatures.temperatures.length > 0 ? (
		<div
			id='output'
			className='m-5 border border-gray-400 p-5 rounded grid gap-5 shadow-md'>
			<>
				<RemoveTemperaturesBtn />
				<TemperatureTiles temperatures={temperatures} />
				<TemperatureChart temperatures={temperatures} />
			</>
		</div>
	) : (
		''
	);
};

export default TemperatureOutput;
