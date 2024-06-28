import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/app/lib/dbConnection';
import mongoose from 'mongoose';

const validateTemperatures = (temperatures: number[]): number[] => {
	//check for empty request
	if (temperatures.length < 1) return [];
	else {
		//retrieves only numeric values
		const validNumbers = temperatures.map((temperature) => {
			if (!isNaN(temperature)) return temperature;
		}) as number[];
		return validNumbers;
	}
};

//inserting temperatures into the db
const insertTemperatures = async (
	temperatures: number[],
	db: { Temperature: mongoose.Model<any, {}, {}, {}, any, any> },
) => {
	try {
		for (const temperature of temperatures) {
			await db.Temperature.create({ temperature });
		}
	} catch (error) {
		console.error('Error inserting temperatures:', error);
		throw new Error('An error occurred while inserting temperatures');
	}
};

//retrieving all temperature entries from db
const readTemperatures = async (db: { Temperature: mongoose.Model<any, {}, {}, {}, any, any> }) => {
	try {
		const getTemperatures = await db.Temperature.find({});
		const temperatures = getTemperatures.map((temperature) => temperature.temperature);
		return temperatures;
	} catch (error) {
		console.error('Error retrieving temperatures:', error);
		throw new Error('An error occurred while retrieving temperatures');
	}
};

//removing all temperature entries from db
const removeAllTemperatures = async (db: { Temperature: mongoose.Model<any, {}, {}, {}, any, any> }) => {
	try {
		await db.Temperature.deleteMany({});
	} catch (error) {
		console.error('Error retrieving temperatures:', error);
		throw new Error('An error occurred while retrieving temperatures');
	}
};

//finds the temperature in the list that's closest to zero (including zero itself)
const closestToZero = (temperatures: number[]) => {
	//obtaining a coppy of the temperatures array, so that the original one is not modified
	const sortedTemps = temperatures.slice();

	//sorting the temperatures by their absolute value (distance from zero)
	//smallest values will be at the beginning of the sorted list
	sortedTemps.sort((a, b) => Math.abs(a) - Math.abs(b));

	//handle the case where the closest temperature to zero might be a negative number
	//checks whether absolute value of the first element exists in the list
	//if it does that means there's a zero or a duplicate (-1.7, 1.7)
	//return the absolute value to ensure a positive result (1.7)
	if (sortedTemps.includes(Math.abs(sortedTemps[0]))) return Math.abs(sortedTemps[0]);

	//if previous check is not passed the first element in the sorted list must be the closest to zero
	//return the smallest value
	return sortedTemps[0];
};

//handles POST requests
export async function POST(request: NextRequest) {
	try {
		//retrieving temperatures from the payload
		const body = await request.json();
		const { temperatures } = body;

		//validating the payload
		const validTemperatures = validateTemperatures(temperatures) as number[];

		//check if there are valid temperature values
		if (validTemperatures.length > 0) {
			await insertTemperatures(validTemperatures, await connect());
			return NextResponse.json({ message: 'Provided value(s) have been inserted.' }, { status: 200 });
		} else return NextResponse.json({ message: 'The payload is missing valid temperature values.' }, { status: 400 });
	} catch (error) {
		return NextResponse.json({ message: 'Could not insert values provided in the payload.' }, { status: 500 });
	}
}

//handles GET requests
export async function GET() {
	try {
		const temperatures = await readTemperatures(await connect()); //retrieve temperatures from db
		const closest = closestToZero(await temperatures); //retrieve temperature closest to zero
		const response = { temperatures: temperatures, temperatureClosestToZero: closest }; //prep api response
		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: 'Could not retrieve temperature entries.' }, { status: 500 });
	}
}

//handles DELETE requests
export async function DELETE() {
	try {
		await removeAllTemperatures(await connect()); //remove temperatures from db
		return NextResponse.json({ message: 'Removed all temperature entries.' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: 'Could not remove temperature entries.' }, { status: 500 });
	}
}
