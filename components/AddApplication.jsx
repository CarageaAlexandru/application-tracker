"use client";
import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";

export default function AddApplication() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to toggle modal visibility using the specific class-based approach
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<div className="bg-blue-900 flex justify-end mb-4 p-4">
			{/* Button to open the modal */}
			<button
				type="button"
				className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
				onClick={toggleModal}
			>
				Add Application
			</button>

			{/* Modal overlay */}
			<div
				className={`${
					isModalOpen ? "opacity-100" : "hidden opacity-0"
				} fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto transition-all duration-500`}
			>
				<div className="opacity-100 transition-all duration-500 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
					<div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
						{/* Modal header */}
						<div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
							<h3 className="font-bold text-gray-800 dark:text-white">
								Add Application
							</h3>
							<button
								type="button"
								className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
								onClick={toggleModal}
							>
								<span className="sr-only">Close</span>
								{/* Close icon */}
							</button>
						</div>

						{/* Modal body */}
						<div className="p-4 overflow-y-auto">
							<ApplicationForm />
						</div>

						{/* Modal footer */}
						<div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
							<button
								type="button"
								className="py-3 px-4 bg-red-600 text-white inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-200 shadow-sm hover:bg-red-500"
								onClick={toggleModal}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
