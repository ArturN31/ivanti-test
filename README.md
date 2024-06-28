## Project

Brief:
Develop a web application to identify the temperature closest to 0 from a given set of temperatures.

Tech stack:
TypeScript, Tailwind CSS, React, Next API, MongoDB/Mongoose

## Functionality:

- This web application will accept a series of temperature values from the user.
- It will then validate, store, and process the input to determine the temperature closest to 0 degrees.
- The application will prioritise positive values when two temperatures are equally close to 0.
- The values and result will be displayed to the end user.

## Technical Requirements:

- The application should have an API endpoint that receives the temperature with validation logic:
  - Validate data format: Numbers (Integers or Floats).
  - Validate data completeness: Reject empty requests.
- Data persistence: Insertion/retrieval of data to/from a db.
- Finding Values Closest to zero:
  - If two temperatures have the same absolute distance from 0, the application should prioritise the positive value.
- Allow users to enter a series of temperature values. This could be a text box or a list where users can input numbers.
- Submit the data to the web API for processing.
- Display the result: Retrieved values and the temperature closest to 0.
- Higlight the value closest to 0.
- BONUS: Render the outcome as a graph.

## Implementation:

- Form:
  - Add form with input box to obtain values (either single values or comma separated values).
  - Implement form validation (check for empty input or non-numeric characters) and provide error messages.
- API:
  - Implement API (POST and GET) to insert/read values to/from a db (validate the payload).
  - The API should return a response containing all temperature values along with the temperature closest to 0.
- DB Integration:
  - DB Schema.
  - Implement logic to the API (db connection, insert and retrieval).
- Finding Values Closest to zero:
  - Implement logic to calculate the absolute distance without considering the negative sign of each temperature from 0.
  - Identify the temperature with the smallest absolute distance.
  - If multiple temperatures have the same absolute distance, prioritise the positive value.
- Output and Display:
  - Retrieve the values and output all values higlighting the temperature that is closest to zero.
  - BONUS: Render the results as a graph.

## How to run the app:

- Clone the Project Repository.
  - `git clone REPO_URL`
  - Replace `REPO_URL` with with the actual URL of the repository (inlcuding `.git` at the end).
- Install dependencies.
  - Navigate to the project directory in the terminal.
  - Install the required dependencies using: `npm i`.
- Configure Environment Variables.
  - Create a `.env.local` file in the root of the project.
  - Add a `NEXT_PUBLIC_MONGODB_URI=mongodb://localhost:27017/temperaturesDB` line to the `.env.local` file.
  - Create a local MongoDB database with the following name `temperaturesDB`.
- Start the development server.
  - `npm run dev`.
  - This command will start the Next.js development server, accessible at http://localhost:3000.
