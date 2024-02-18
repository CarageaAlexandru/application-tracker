import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";

export default function JobList({ activeFilter, activeSearch }) {
	const [jobs, setJobs] = useState([]);
	const [modalContent, setModalContent] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filterJobs = (jobs) => {
		return jobs.filter((job) => {
			// Filter by activeFilter if it's not 'All'
			const filterCondition =
				activeFilter === "All" || job.status === activeFilter;
			// Filter by activeSearch if there is a search term
			const searchCondition =
				!activeSearch ||
				job.job_title.toLowerCase().includes(activeSearch.toLowerCase());
			return filterCondition && searchCondition;
		});
	};

	const filteredJobs = filterJobs(jobs);
	const handleDescriptionClick = (description) => {
		setModalContent(description);
		setIsModalOpen(true);
	};

	const fetchJobs = async () => {
		try {
			const response = await axios.get("/api/fetch-jobs");
			const formattedJobs = response.data.map((job) => ({
				...job,
				application_date: new Date(job.application_date).toLocaleDateString({
					year: "numeric",
					month: "long",
					day: "numeric",
				}),
			}));
			setJobs(formattedJobs);
		} catch (error) {
			console.error("Failed to fetch jobs:", error);
		}
	};


	useEffect(() => {
		fetchJobs();
	}, []);

	return (
		<div className="flex flex-col">
			<div className="-m-1.5 overflow-x-auto">
				<div className="p-1.5 min-w-full inline-block align-middle">
					<div className="overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead>
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
									>
										Title
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
									>
										Job Link
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
									>
										Notes
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
									>
										Description
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800">
								{filteredJobs.map((job) => (
									<tr
										key={job.id}
										className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
									>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
											{job.job_title}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{job.application_date}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{job.job_link}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{job.status}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{job.notes}
										</td>
										<td className="px-6 py-4 max-w-xs text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
											{job.description}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<button
												className="text-blue-600 hover:text-blue-800"
												onClick={() => handleDescriptionClick(job.description)}
											>
												View Description
											</button>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
											<button
												type="button"
												className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<p className="text-gray-800">{modalContent}</p>
			</Modal>
		</div>
	);
}
