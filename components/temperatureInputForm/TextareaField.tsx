import { useEffect, useState } from 'react';

const TextareaField = ({
	sendTextToForm,
	sendErrorToForm,
}: {
	sendTextToForm: (temperatures: any) => void;
	sendErrorToForm: (error: string) => void;
}) => {
	const [textareaValue, setTextareaValue] = useState<string>('');
	const [inputInstruction, setInputInstruction] = useState<string>('');
	const [validatedTemperatures, setValidatedTemperatures] = useState<number[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextareaValue(e.target.value);
	};

	//validates individual temperature strings
	const parseTemperatureStrings = (temperatures: string[]) => {
		const temperaturesArray = temperatures.map((temperature) => {
			if (!temperature) return; //returns undefined for empty values
			const parsedTemp = parseFloat(temperature.trim()); //parse the value
			return isNaN(parsedTemp) ? NaN : parsedTemp; //return NaN for non-numeric or parsed number for a valid value
		});
		return temperaturesArray;
	};

	//validates the array of temperature entries
	//if all are valid returns a number[] otherwise an empty []
	const validateTemperatures = (validatedInput: (number | undefined)[]) => {
		//check for empty input and trailing commas
		if (!validatedInput.length || (validatedInput.includes(undefined) && validatedInput[0] !== undefined)) {
			setInputInstruction('Invalid input. Remove trailing commas or provide a temperature value.');
			sendErrorToForm('Input error.');
			return [];
		}

		//check for NaN values (non-numeric input)
		if (validatedInput.includes(NaN)) {
			setInputInstruction('Temperatures include not number values.');
			sendErrorToForm('Input error.');
			return [];
		}

		//all temperatures are valid
		if (!validatedInput.includes(NaN) && !validatedInput.includes(undefined)) {
			setInputInstruction('All values are valid.');
			sendErrorToForm('');
			return validatedInput;
		}
	};

	useEffect(() => {
		//prepares and validates the temperatures
		const getValidTemperatures = (text: string) => {
			const temperatures = text.trim().split(',');
			const parsedInput = parseTemperatureStrings(temperatures);
			const validationResult = validateTemperatures(parsedInput);
			return validationResult;
		};
		const validTemperatures = getValidTemperatures(textareaValue) as number[];

		//set state with validated temperatures
		if (validTemperatures && validTemperatures.length > 0) {
			setValidatedTemperatures(validTemperatures);
		}
	}, [textareaValue]);

	useEffect(() => {
		//send the array of valid temperatures to parent component
		sendTextToForm(validatedTemperatures);
	}, [sendTextToForm, validatedTemperatures]);

	return (
		<div className='grid'>
			<label className='mb-1'>
				<p>Temperature(s):</p>
				<p className='text-sm'>Enter values separating them with commas.</p>
			</label>
			<textarea
				className='border px-3 py-2'
				placeholder='Enter temperature(s)'
				onChange={(e) => {
					handleChange(e);
				}}
				value={textareaValue}
			/>

			{inputInstruction ? <p className='text-sm'>{inputInstruction}</p> : ''}
		</div>
	);
};

export default TextareaField;
