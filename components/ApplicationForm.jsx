import React, { useState } from "react";
import TextInput from "./ui/textInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "./ui/textArea";
import SearchComponent from "./ui/searchComponent";
import axios from "axios";
import { jobFormSchema } from "@/schemas";
import { z } from "zod";

const filters = [
	"Applied",
	"Not Applied",
	"Closed",
	"Assessment",
	"Rejected",
	"Interview",
];

const Form = () => {
	const [formErrors, setFormErrors] = useState({});
	const [date, setDate] = useState(new Date());
	const [jobLink, setJobLink] = useState("");
	const [status, setStatus] = useState("");
	const [notes, setNotes] = useState("");
	const [fetchedDescription, setFetchedDescription] = useState("");
	const [jobTitle, setJobTitle] = useState("");

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission

		// Prepare your form data
		const jobData = {
			jobLink,
			jobTitle,
			fetchedDescription,
			status,
			date,
			notes,
		};

		try {
			// Validate form data against the Zod schema
			jobFormSchema.parse(jobData);

			// If validation passes, proceed with form submission
			try {
				const response = await axios.post("/api/create-application", jobData, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				// Handle success - e.g., resetting the form, showing a success message, etc.
				console.log(response.data.message);
				// Reset form state here if necessary
				setDate(new Date()); // Reset date to current
				setJobLink("");
				setJobTitle("");
				setFetchedDescription("");
				setStatus("");
				setNotes("");
				setFormErrors({}); // Clear any previous errors
			} catch (error) {
				// Handle errors from the server or network issues
				console.error("There was an error submitting the form:", error);
				// Here you might want to set an error message to inform the user that submission failed
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Convert Zod errors to a more usable object for displaying
				const errorMessages = {};
				for (const issue of error.issues) {
					if (issue.path.length > 0) {
						// Assuming issue.path[0] is a string for simplicity, adjust based on your data structure
						errorMessages[issue.path[0]] = issue.message;
					}
				}
				setFormErrors(errorMessages);
			}
		}
	};
	async function fetchJobDetails() {
		const url = jobLink;

		try {
			const response = await axios.post(
				"/api/scrape",
				{ url },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = response.data;
			console.log("🚀 ~ fetchJobDetails ~ data:", data);

			setFetchedDescription(data.jobDescriptionText);
			setJobTitle(data.jobTitle);
		} catch (error) {
			// Axios wraps the response error in the error.response object
			// It's good practice to check if it exists and log it or handle it appropriately
			if (error.response) {
				if (error.response.status === 400) {
					setError("URL is required");
				}

				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
				console.error("Response headers:", error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				console.error("No response received:", error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error:", error.message);
			}
			console.error(
				"There was a problem with your fetch operation:",
				error.config
			);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 flex-row">
			<SearchComponent
				value={jobLink}
				onChange={(e) => setJobLink(e.target.value)}
				onSearch={fetchJobDetails}
			/>

			<TextInput
				readOnly={false}
				label="Job Title"
				value={jobTitle}
				onChange={(e) => setJobTitle(e.target.value)}
				error={formErrors.jobTitle} // Assuming TextInput accepts an `error` prop
			/>

			{formErrors.jobLink && (
				<p className="text-red-500">{formErrors.jobLink}</p>
			)}

			<TextArea
				value={fetchedDescription}
				label="Description"
				onChange={(e) => setFetchedDescription(e.target.value)}
				readOnly={false}
			/>

			<div className="flex flex-col">
				<label className="block text-sm font-medium mb-2 dark:text-white text-black">
					Status
				</label>
				<select
					className="border text-black border-gray-300 rounded-md px-3 py-2"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="">Select a Status</option>
					{/* Add more categories as needed */}
					{filters.map((filter, index) => (
						<option key={index} value={filter}>
							{filter}
						</option>
					))}
				</select>
				{formErrors.status && (
					<p className="text-red-500">{formErrors.status}</p>
				)}
			</div>
			<div>
				<DatePicker
					className="border text-black border-gray-300 rounded-md px-3 py-2"
					selected={date}
					onChange={(date) => setDate(date)}
				/>
				{/* display an error message from from */}
				{formErrors.date && <p>{formErrors.date}</p>}
			</div>
			<TextArea
				value={notes}
				onChange={(e) => setNotes(e.target.value)}
				error={formErrors.notes} // Assuming TextInput accepts an `error` prop
			/>
			<div className="flex justify-center">
				<button
					type="submit"
					className="py-3 px-4 inline-flex items-center text-sm font-semibold rounded border  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default Form;
