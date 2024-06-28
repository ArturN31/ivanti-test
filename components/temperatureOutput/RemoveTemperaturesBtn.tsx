const RemoveTemperaturesBtn = () => {
	const removeTemperatures = async () => {
		try {
			const apiEndpoint = '/api/temperatures';
			const options = {
				method: 'DELETE',
			};
			await fetch(apiEndpoint, options);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			type='button'
			className='border w-fit place-self-center px-3 py-2 rounded hover:bg-slate-100'
			onClick={() => {
				if (
					confirm(
						'This action will permanently delete all temperature entries. \nAre you sure you want to proceed?',
					) === true
				) {
					removeTemperatures();
				}
			}}>
			Remove all temperature(s)
		</button>
	);
};

export default RemoveTemperaturesBtn;
