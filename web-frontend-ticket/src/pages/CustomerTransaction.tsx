import { dateFormat, getSession, rupiahFormat } from "@/lib/utils";
import { setStep } from "@/redux/features/ticket/ticketSlice";
import { useAppSelector } from "@/redux/hooks";
import { buyTicket, getBalance, transactionSchema, type TransactionValues } from "@/services/global/global.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function CustomerTransaction() {
  const { detail, movie } = useAppSelector((state) => state.ticket); // ambil state dari redux

	const auth = getSession(); //ambil data login untuk informasi nama
	const dispatch = useDispatch();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: TransactionValues) => buyTicket(data),
	});

	const { data } = useQuery({
		queryKey: ["get-balance"],
		queryFn: () => getBalance(),
	});

	const navigate = useNavigate();

	const detailPrice = useMemo(() => {
		if (!movie && !detail) {
			return {
				subtotal: 0,
				ppn: 0,
				bookingFee: 0,
				total: 0,
			};
		}

		const subtotal = (movie?.price ?? 0) * (detail?.seat?.length ?? 0);

		const ppn = (subtotal * 11) / 100;
		const bookingFee = 3000;

		const total = subtotal + ppn + bookingFee;

		return {
			subtotal,
			ppn,
			bookingFee,
			total,
		};
	}, [movie, detail]);

  // fungsi kondisi saldo harus lebih besar dari tagihan
	const isBalanceEnough = (data?.data.balance ?? 0) > detailPrice.total;

	const handleTransaction = async () => {
		try {
			const parse = transactionSchema.parse({
				subtotal: detailPrice.subtotal,
				total: detailPrice.total,
				tax: detailPrice.ppn,
				movieId: movie?._id,
				bookingFee: detailPrice.bookingFee,
				theaterId: detail?.theater?._id,
				seats: detail?.seat,
				date: detail?.time,
			});

			await mutateAsync(parse);

			dispatch(
				setStep({
					step: "DETAIL",
				}),
			);

			navigate("/transaction-ticket/success");
		} catch (error) {
			console.log(error);
		}
	};

  // kondisi kalo movie&detail kosong return 0
	if (!movie && !detail) {
		return <Navigate to="/" />;
	}

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
          {/* button back redirect ke halaman seat */}
          <Link
            to={`/movie/${movie?.id}`}
            className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] baQckdrop-blur-md rounded-full"
          >
            <img
              src="/assets/images/icons/arrow-left.svg"
              className="w-[22px] h-[22px] flex shrink-0"
              alt=""
            />
          </Link>
          <p className="text-center mx-auto font-semibold text-sm">
            Tickets Payment
          </p>
          <div className="dummy-button w-12" />
        </div>
        <div className="flex items-center justify-between gap-2 mx-5">
          <div className="flex items-center gap-[14px]">
            <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
              <img
                src={movie?.thumbnailUrl}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <h3 className="font-semibold line-clamp-2">{movie?.title}</h3>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/icons/video-vertical-grey.svg"
                  className="w-[18px] h-[18px] flex shrink-0"
                  alt="icon"
                />
                <p className="text-sm text-premiere-grey">
                  {movie?.genre.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-[18px] h-[18px] flex shrink-0"
                  alt="icon"
                />
                <p className="text-sm text-premiere-grey">
                  {detail?.theater?.city}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[2px] rounded-full p-[8px_10px] bg-[#FFFFFF1A]">
            <p className="font-semibold text-xs leading-[18px]">4/5</p>
            <img
              src="/assets/images/icons/Star 1.svg"
              className="w-4 h-4 flex shrink-0"
              alt="star"
            />
          </div>
        </div>
      </div>
      <section id="Order-Details" className="px-5 mt-5">
        <div className="accordion group flex flex-col w-full rounded-3xl p-5 gap-4 bg-white/10 has-[:checked]:!h-16 transition-all duration-300 overflow-hidden">
          <label className="relative flex items-center justify-between mb-1">
            <h2>Order Details</h2>
            <img
              src="/assets/images/icons/arrow-circle-down.svg"
              className="w-6 h-6 flex shrink-0 group-has-[:checked]:-rotate-180 transition-all duration-300"
              alt="icon"
            />
            <input
              type="checkbox"
              name="accordion-btn"
              className="absolute hidden"
            />
          </label>
          <div className="flex items-center gap-4">
            <div className="flex w-[90px] h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
              <img
                src="/assets/images/thumbnails/theater2.png"
                className="w-full h-full object-cover"
                alt="image2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{detail?.theater?.name}</p>
              <p className="text-sm text-premiere-grey">
                {detail?.theater?.city}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/calendar-2.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Date & Time</p>
            </div>
            <p>{dateFormat(detail?.time ?? "", "HH:mm, DD MMM YYYY")}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/profile-2user.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Quantity</p>
            </div>
            <p>{detail?.seat?.length} Seats</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/ticket-star.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Seats</p>
            </div>
            <p>{detail?.seat?.join(",")}</p> {/*misal seat C1,C2*/}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/coffee-white.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Bonus</p>
            </div>
            <p>{movie?.bonus}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/dollar-circle.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Price</p>
            </div>
            <p>{rupiahFormat(movie?.price ?? 0)}/orang</p> {/*default 0*/}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/receipt-item.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Sub Total</p>
            </div>
            <p>{rupiahFormat(detailPrice?.subtotal)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/receipt-disscount.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>PPN 12%</p>
            </div>
            <p>{rupiahFormat(detailPrice?.ppn)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/menu-board.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Booking Fee</p>
            </div>
            <p>{rupiahFormat(detailPrice?.bookingFee)}</p>
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/ticket-expired.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Discount</p>
            </div>
            <p>Rp 15.000</p>
          </div> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/note-favorite.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Grand Total</p>
            </div>
            <p className="font-bold text-premiere-yellow">
              {rupiahFormat(detailPrice?.total)}
            </p>
          </div>
        </div>
      </section>
      <section id="Wallet" className="flex flex-col gap-3 px-5 mt-5">
        <h2 className="font-semibold">My Wallet</h2>
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
          <p className="relative font-bold text-4xl leading-[54px] mt-[18px] mx-6">
            {rupiahFormat(data?.data.balance ?? 0)}
          </p>
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
      {/* kondisi balance false akan tampil alert */}
      {!isBalanceEnough && (
        <div className="flex items-center mb-10 justify-between gap-3 rounded-[20px] p-4 bg-premiere-red mx-5 mt-5">
          <p className="font-semibold">
            Saldo Ewallet anda tidak mencukupi untuk saat ini
          </p>
          <Link
            to=".wallet/topup"
            className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black"
          >
            Topup
          </Link>
        </div>
      )}
      {/* kalo balance true tampilkan button bayar */}
      {isBalanceEnough && (
        <form>
          <div className="flex items-center gap-3 px-5 mt-5">
            <label className="group relative">
              <input
                type="checkbox"
                name="city"
                id=""
                className="w-6 h-6 rounded-lg appearance-none checked:border-4 checked:border-solid checked:border-premiere-black checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
              />
            </label>
            <p>
              Saya setuju dengan ketentuan yang tersedia dan proses lanjut beli{" "}
            </p>
          </div>
          <div
            id="Bottom-Nav"
            className="relative w-full h-[123px] flex shrink-0"
          >
            <div className="fixed bottom-5 left-5 right-5 w-full max-w-[330px] mx-auto flex items-center justify-between rounded-full p-[10px_14px] pl-6 gap-[14px] bg-[#FFFFFF33] z-20 backdrop-blur-md">
              <div>
                <p id="price" className="font-semibold text-xl leading-[30px]">
                  {rupiahFormat(detailPrice.total)}{" "}
                </p>
                <span className="font-normal text-sm mt-[2px]">
                  Grand Total
                </span>
              </div>
              <button
                type="button"
                onClick={handleTransaction}
                disabled={isPending}
                className="rounded-full p-[12px_18px] bg-white font-bold text-premiere-black"
              >
                Pay Now
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
