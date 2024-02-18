import Modal from "@/components/Modal";
import { useState } from "react";

const jobs = [
	{
		id: 1,
		jobTitle: "Software Engineer",
		date: "2022-10-01",
		jobLink: "https://example.com/job1",
		status: "Applied",
		notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		fetchedDescription: `Who are CMS Distribution?
			CMS is a leading global distributor with over 35 years of history. Our overarching mission is to empower our people to exceed the expectations of our customers and vendors. We specialise in taking emerging technologies to market whilst growing established brands using a range of value-added services.
			We are a multinational organisation with 500+ people. Our sites range from UK & Ireland to mainland Europe, USA & JAPAC. Everything we do is centred around our 4 CMS Values: People, Operational Excellence, Profitable Growth & Exceeding Expectations.
			As our business grows, we aim to Find Great People, Grow Our People, and Keep Our People. We know investing in talent and supporting progression is critical to our future. Through our Graduate Programme, you will take your career from strength to strength through learning about our industry, dedicated training and development plans, and engaging internal initiatives.
			What are we looking for?
			- Education: BA/BSc at level 2:2 or higher in any discipline (2022 onwards).
			- Tech enthusiast: a genuine passion for technology.
			- Growth mindset: be ambitious and ready to carve a career path in a global organisation.
			- Analytical problem solver: tackle challenges head on with fresh ideas and innovative solutions.
			- Self-starters: organized and disciplined.
			- Communication & collaboration champion: exceptional communication skills and a passion for fostering collaborative success.
			What impact can I make as a CMS Graduate within Sales?
			You will join as a CMS Graduate in Sales for B2B or B2C. This will give you the opportunity to absorb and embed our CMS Culture and Values to become successful and develop an exciting career path in Account or Vendor Management.
			You will play a key role in supporting the needs of our customers to exceed their expectations. As well as getting up-skilled in this specific department you will get a thorough induction and meet all the teams across our business. Your induction will provide you with an excellent foundation of knowledge around our business model, vendors, technologies, and customers.
			You will also spend time with our dedicated People Development team to hone your professional skills such as time management, presentations skills, goal setting and more.
			At the 6-month mark, you'll advance in your journey by applying for a dedicated position in your department, furthering your career growth at CMS Distribution.
			What’s in it for me?
			We invest in your future:
			· Dedicated mentorship and support from day 1.
			· Competitive salary with performance-based incentives.
			· Extensive benefits package including private health insurance, 24/7 access to wellbeing support, cycle to work scheme, employee referral scheme, life assurance.
			· Funded learning opportunities.
			· Engage in charitable initiatives.
			· Collaborate in a modern office with dedicated workspaces.
			· Enjoy internal social activities and events.
			· 22 days annual leave, ½ day birthday leave, with the option to purchase 3 additional days.
			· Loyalty rewards – additional annual leave days awarded for year 2, 3, 4.
			Job Types: Full-time, Graduate
			Benefits:
			- Company events
			- Company pension
			- Cycle to work scheme
			- Employee mentoring programme
			- Private medical insurance
			- Referral programme
			Schedule:
			- Monday to Friday
			Ability to Commute:
			- London (required)
			Work Location: In person
			Expected start date: 15/04/2024`,
	},
	{
		id: 2,
		jobTitle: "Product Manager",
		date: "2022-10-02",
		jobLink: "https://example.com/job2",
		status: "Applied",
		notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		fetchedDescription:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 3,
		jobTitle: "Data Analyst",
		date: "2022-10-03",
		jobLink: "https://example.com/job3",
		status: "Not Applied",
		notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		fetchedDescription:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 4,
		jobTitle: "UI/UX Designer",
		date: "2022-10-04",
		jobLink: "https://example.com/job4",
		status: "Assessment",
		notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		fetchedDescription:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 5,
		jobTitle: "Marketing Specialist",
		date: "2022-10-05",
		jobLink: "https://example.com/job5",
		status: "Rejected",
		notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		fetchedDescription:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
];

export default function JobList({ activeFilter }) {
	const [modalContent, setModalContent] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const filteredJobs =
		activeFilter === "All"
			? jobs
			: jobs.filter((job) => job.status === activeFilter);

	const handleDescriptionClick = (description) => {
		setModalContent(description);
		setIsModalOpen(true);
	};

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
										status
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
											{job.jobTitle}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{job.date}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{job.jobLink}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{job.status}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{job.notes}
										</td>
										<td className="px-6 py-4 max-w-xs text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
											{job.fetchedDescription}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<button
												className="text-blue-600 hover:text-blue-800"
												onClick={() =>
													handleDescriptionClick(job.fetchedDescription)
												}
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
			{!filteredJobs && <div className="text-center">No jobs found</div>}
		</div>
	);
}
