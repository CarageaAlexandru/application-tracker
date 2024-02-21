"use client";
import AddApplication from "@/components/AddApplication";
import NavBar from "@/components/NavBar";
import SearchInput from "@/components/SearchInput";
import Stats from "@/components/Stats";
import StatusFilters from "@/components/StatusFilters";
import JobList from "@/components/JobList";
import { useState } from "react";
import Websites from "@/components/Websites";

export default function Home() {
	const [activeFilter, setActiveFilter] = useState("All");
	const [activeSearch, setActiveSearch] = useState("");
	const handleSearch = (searchTerm) => {
		setActiveSearch(searchTerm);
	};
	const handleFilterSelect = (filter) => {
		setActiveFilter(filter);
	};
	return (
		<div className="grid grid-cols-5 grid-rows-12 h-screen">
			<div className="col-span-5 row-span-1 ">
				<NavBar />
			</div>
			<div className="col-span-1 row-span-12 ">
				<Stats />
				<StatusFilters onFilterSelect={handleFilterSelect} />
				<SearchInput onSearchSelect={handleSearch} />
				<Websites />
			</div>
			<div className="col-span-4 row-span-12  overflow-y-auto p-4">
				<AddApplication />
				<JobList activeFilter={activeFilter} activeSearch={activeSearch} />
			</div>
		</div>
	);
}
