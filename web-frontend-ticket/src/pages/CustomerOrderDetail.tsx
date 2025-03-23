import { dateFormat, rupiahFormat } from "@/lib/utils";
import type { Transaction } from "@/services/transaction/transaction.type";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function CustomerOrderDetail() {
  const transaction = useLoaderData() as Transaction;

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
          <Link
            to={"/orders"}
            className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full"
          >
            <img
              src="/assets/images/icons/arrow-left.svg"
              className="w-[22px] h-[22px] flex shrink-0"
              alt=""
            />
          </Link>
          <p className="text-center mx-auto font-semibold text-sm">
            Ticket Details
          </p>
          <div className="dummy-button w-12" />
        </div>
        <div className="flex items-center justify-between gap-2 mx-5">
          <div className="flex items-center gap-[14px]">
            <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
              <img
                src={transaction.movie.thumbnailUrl}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <h3 className="font-semibold line-clamp-2">
                {transaction.movie.title}
              </h3>
              <div className="flex items-center gap-[6px]">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/images/icons/video-vertical-grey.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <p className="text-sm text-premiere-grey">
                    {transaction.movie.genre.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/images/icons/location.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <p className="text-sm text-premiere-grey">
                    {transaction.theater.city}
                  </p>
                </div>
              </div>
            </div>
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
              <p className="font-semibold">{transaction.theater.name}</p>
              <p className="text-sm text-premiere-grey">
                {transaction.theater.city}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/receipt-2.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Booking ID</p>
            </div>
            <p>PMRBWA1992</p>
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
            <p>{dateFormat(transaction.date, "HH:mm, DD MMM YYYY")}</p>
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
            <p>{transaction.seats.length} Seats</p>
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
            <p>{transaction.seats.map((seat) => seat.seat).join(",")}</p>
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
            <p>{transaction.movie.bonus}</p>
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
            <p>{rupiahFormat(transaction.movie.price)}/orang</p>
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
            <p>{rupiahFormat(transaction.subtotal)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/receipt-disscount.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>PPN 11%</p>
            </div>
            <p>{rupiahFormat(transaction.tax)}</p>
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
            <p>{rupiahFormat(transaction.bookingFee)}</p>
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
              {rupiahFormat(transaction.total)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/icons/note.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <p>Payment Status</p>
            </div>
            <p className="w-fit rounded-full p-[6px_10px] bg-premiere-light-green text-premiere-green font-bold text-xs leading-[18px]">
              SUCCESS
            </p>
          </div>
        </div>
      </section>
      <section id="bonus" className="flex flex-col gap-4 mt-5">
        <h2 className="font-semibold px-5">Bonus Tickets</h2>
        <div className="swiper-bonus w-full overflow-hidden pl-6">
          <div className="swiper-wrapper">
            <div className="swiper-slide !w-fit">
              <div className="flex items-center w-[230px] rounded-[20px] p-[10px] gap-[14px] bg-white/10">
                <div className="w-20 h-20 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                  <img
                    src="/assets/images/thumbnails/popcorn.png"
                    className="w-full h-full object-cover"
                    alt="image2"
                  />
                </div>
                <div className="flex flex-col min-w-[120px] gap-[6px]">
                  <h3 className="font-semibold">{transaction.movie.bonus}</h3>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/coffee.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">Snacks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative h-[98px] w-full max-w-[640px] px-5">
        <button
          type="button"
          className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black z-10 text-center"
        >
          Give Rating
        </button>
      </div>
    </div>
  );
}
