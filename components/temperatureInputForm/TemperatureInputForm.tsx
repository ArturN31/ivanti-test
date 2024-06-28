'use client';

import { useState } from 'react';
import TextareaField from './TextareaField';

const TemperatureInputForm = () => {
	const [formData, setFormData] = useState<number[]>([]);
	const [formError, setFormError] = useState('');

	//used to retrieve textarea content from child component
	const handleInput = (temperatures: number[]) => {
		setFormData(temperatures);
	};

	//used to retrieve errors from textarea child component
	const handleError = (error: string) => {
		setFormError(error);
	};

	//used to POST temperatures to API - insert to db
	const postTemperatures = async () => {
		try {
			const apiEndpoint = '/api/temperatures';
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ temperatures: formData }),
			};
			await fetch(apiEndpoint, options);
		} catch (error) {
			console.log(error);
		}
	};

	const FormError = () => {
		return formError ? (
			<div className='m-5 text-sm text-center text-white'>
				<p>Address form errors</p>
			</div>
		) : (
			<div className='m-5 text-sm text-center'>
				<p>&nbsp;</p>
			</div>
		);
	};

	return (
		<>
			<FormError />
			<form className='border border-black p-5 grid gap-5 m-5 rounded shadow-md'>
				<p className='text-sm'>Sample temps: 7, -10, 13, 8, 4, -7.2, -12, -3.7, 3.5, -9.6, 6.5, -1.7, -6.2, 7</p>
				<TextareaField
					sendTextToForm={handleInput}
					sendErrorToForm={handleError}
				/>
				<button
					type='submit'
					className='border w-fit place-self-center px-3 py-2 rounded hover:bg-slate-100'
					onClick={(e) => {
						if (formError) e.preventDefault();
						else postTemperatures();
					}}>
					Add temperature(s)
				</button>
			</form>
		</>
	);
};

export default TemperatureInputForm;
