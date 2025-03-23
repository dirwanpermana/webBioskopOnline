import BottomBar from "@/components/BottomBar";
import { dateFormat } from "@/lib/utils";
import type { Transaction } from "@/services/transaction/transaction.type";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function CustomerOrders() {
	const transactions = useLoaderData() as Transaction[];

	console.log(transactions);

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
		>
			<div className="flex items-center justify-between px-5 mt-[60px]">
				<h1 className="font-bold text-[26px] leading-[39px]">My Tickets</h1>
			</div>
			<section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
				{transactions.map((item) => (
				<Link key={item._id} to={`/orders/${item._id}`} className="card">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-[14px]">
						<div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
	    				<img
							src={item.movie.thumbnailUrl}
							className="w-full h-full object-cover"
							alt="thumbnail"
						/>
					</div>
					<div className="flex flex-col gap-[6px]">
					<h3 className="font-semibold line-clamp-2">
					{item.movie.title}
					</h3>
					<div className="flex items-center gap-[6px]">
						<div className="flex items-center gap-2">
						<img
							src="/assets/images/icons/video-vertical-grey.svg"
							className="w-[18px] h-[18px] flex shrink-0"
	    					alt="icon"
						/>
						<p className="text-sm text-premiere-grey">
			    			{item.movie.genre.name}
						</p>
						</div>
						<div className="flex items-center gap-2">
							<img
							src="/assets/images/icons/location.svg"
							className="w-[18px] h-[18px] flex shrink-0"
							alt="icon"
							/>
							<p className="text-sm text-premiere-grey">
								{item.theater.city}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<img
			    			src="/assets/images/icons/calendar-2-grey.svg"
							className="w-[18px] h-[18px] flex shrink-0"
							alt="icon"
						/>
					    <p className="text-sm text-premiere-grey">
				    		{dateFormat(item.date, "HH:mm, DD MMM YYYY")}
						</p>
					</div>
					<p className="w-fit rounded-full p-[4px_6px] bg-premiere-light-green text-premiere-green font-semibold text-[10px] leading-[15px]">
					SUCCESS
					</p>
				</div>
			</div>
		</div>
			</Link>
		))}
		</section>
		<BottomBar activeLink="tickets" /> {/*redirect ke page order */}
	</div>
	);
}
