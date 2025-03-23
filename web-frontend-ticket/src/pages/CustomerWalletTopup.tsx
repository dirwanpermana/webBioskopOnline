import { getSession, rupiahFormat } from "@/lib/utils";
import { getBalance } from "@/services/global/global.service";
import { topupWallet } from "@/services/wallet/wallet.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const OPTIONS_TOPUP = [50000, 150000, 350000, 500000, 750000, 900000];

export default function CustomerWalletTopup() {
	const auth = getSession();

	const [balance, setBalance] = useState<number>(0);

	const { data, isLoading } = useQuery({
		queryKey: ["get-balance"],
		queryFn: () => getBalance(),
	});

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: { balance: number }) => topupWallet(data),
	});

	const handleTopup = async () => {
		try {
			if (balance === 0) {
				alert("Please select topup nominal");

				return;
			}

			const { data } = await mutateAsync({ balance: balance });

			window.location.replace(data.redirect_url);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			id="Content-Container"
			className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
		>
			<div id="Header" className="flex flex-col gap-5">
				<div
					id="Top-Nav"
					className="relative flex items-center justify-between px-5 mt-[60px]"
				>
					<a
						href="my-wallet.html"
						className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full"
					>
						<img
							src="/assets/images/icons/arrow-left.svg"
							className="w-[22px] h-[22px] flex shrink-0"
							alt=""
						/>
					</a>
					<p className="text-center mx-auto font-semibold text-sm">
						Topup Wallet
					</p>
					<div className="dummy-button w-12" />
				</div>
			</div>
			<section
				id="Wallet"
				className="flex flex-col items-center gap-3 px-5 mt-5"
			>
				<div className="relative flex flex-col w-full max-w-[353px] rounded-[30px] bg-white/10 overflow-hidden">
					<img
						src="/assets/images/backgrounds/wallet-lines.svg"
						className="absolute w-full h-full object-cover"
						alt=""
					/>
					<img
						src="/assets/images/logos/wallet.svg"
						className=" relativeflex shrink-0 w-[51px] mt-6 mx-6"
						alt=""
					/>
					{!isLoading && (
						<p className="relative font-bold text-4xl leading-[54px] mt-[18px] mx-6">
							{rupiahFormat(data?.data?.balance ?? 0)}
						</p>
					)}
					<div className="flex items-center justify-between p-[10px_14px] pl-6 bg-white/20 backdrop-blur-3xl mt-[21px]">
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Name</p>
							<p className="font-semibold text-sm">{auth?.name}</p>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Expired At</p>
							<p className="font-semibold text-sm">02/30</p>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="text-xs leading-[18px]">Branch</p>
							<p className="font-semibold text-sm">HQ</p>
						</div>
					</div>
				</div>
			</section>
			<p
				id="Amount-Choosed"
				className="font-bold text-4xl leading-[54px] text-center mt-[30px]"
			>
				{balance === 0 ? "______" : rupiahFormat(balance)}
			</p>
			<form action="midtrans.html" className="relative px-5 mt-[30px]">
				<div id="Theaters" className="tab-content flex flex-col gap-4">
					<h2 className="font-semibold">Choose Amount</h2>
					<div className="grid grid-cols-3 gap-4">
						{OPTIONS_TOPUP.map((item, i) => (
							<button
								type="button"
								onClick={() => {
									setBalance(item);
								}}
								key={`${item + i}`}
								className="group relative theather-card flex flex-col rounded-3xl p-4 gap-[2px] bg-white/10 backdrop-blur-md hover:bg-premiere-purple has-[:checked]:bg-premiere-purple transition-all duration-300"
							>
								<input
									type="radio"
									name="amount"
									className="absolute top-1/2 left-1/2 opacity-0"
									value={item}
									required
								/>
								<span className="font-semibold text-xs leading-[18px]">Rp</span>
								<p className="font-semibold">
									{rupiahFormat(item).split("Rp")[1].trim()}
								</p>
							</button>
						))}
					</div>
				</div>
				<div className="relative h-[98px] w-full max-w-[640px]">
					<button
						type="button"
						disabled={isPending}
						onClick={handleTopup}
						className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black"
					>
						Proceed to Topup
					</button>
				</div>
			</form>
		</div>
	);
}
