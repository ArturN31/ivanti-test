import TemperatureInputForm from '@/components/temperatureInputForm/TemperatureInputForm';
import TemperatureOutput from '@/components/temperatureOutput/TemperatureOutput';

export default function Home() {
	return (
		<main>
			<TemperatureInputForm />
			<TemperatureOutput />
		</main>
	);
}
