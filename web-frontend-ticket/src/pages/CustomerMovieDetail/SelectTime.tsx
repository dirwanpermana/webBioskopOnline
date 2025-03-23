// file ini untuk pilih waktu nonton
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from ".";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setStep, setTicketDetail } from "@/redux/features/ticket/ticketSlice";
import dayjs from "dayjs";

export default function SelectTime() {
  const { detail } = useLoaderData() as LoaderData; //load data detail movie
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<string | null>(null); //set tannggal

  const detailTicket = useAppSelector((state) => state.ticket.detail);

  console.log(detailTicket);

  // handle button continue, wajib pilih waktu
  const handleContinue = () => {
    if (date === null) {
      alert("Please select date first");

      return;
    }
    //jika sudah pilih waktu akan lanjut ke bawah ini
    dispatch(
      setTicketDetail({
        time: date,
      })
    );

    dispatch(
      setStep({
        step: "SEAT",
      })
    );
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
          {/* button back */}
          <button
            type="button"
            onClick={() => {
              dispatch(
                setStep({
                  step: "THEATER",
                })
              );
            }}
            className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full"
          >
            <img
              src="/assets/images/icons/arrow-left.svg"
              className="w-[22px] h-[22px] flex shrink-0"
              alt=""
            />
          </button>
          <p className="text-center mx-auto font-semibold text-sm">
            Choose Time
          </p>
          <div className="dummy-button w-12" />
        </div>
        <div className="flex items-center justify-between gap-2 mx-5">
          <div className="flex items-center gap-[14px]">
            <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
              <img
                src={detail.thumbnailUrl}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <h3 className="font-semibold line-clamp-2">{detail.title}</h3>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/icons/video-vertical-grey.svg"
                  className="w-[18px] h-[18px] flex shrink-0"
                  alt="icon"
                />
                <p className="text-sm text-premiere-grey">
                  {detail.genre.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/icons/location.svg"
                  className="w-[18px] h-[18px] flex shrink-0"
                  alt="icon"
                />
                <p className="text-sm text-premiere-grey">
                  {detail.theaters[0].city}
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
      <div className="flex flex-col gap-4 mt-5 px-5">
        <h2 className="font-semibold">Available Time Theater</h2>
        <div className="theather-card flex items-center rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md">
          <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl overflow-hidden bg-[#D9D9D9]">
            <img
              src="/assets/images/thumbnails/theater1.png"
              className="w-full h-full object-cover"
              alt="theater"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{detailTicket?.theater?.name}</h3>
            <p className="text-sm text-premiere-grey">
              {detailTicket?.theater?.city}
            </p>
          </div>
        </div>
      </div>
      <form action="choose-seat.html" className="relative px-5 mt-5">
        <div id="Theaters" className="tab-content flex flex-col gap-4">
          <h2 className="font-semibold">Choose Time</h2>
          <div className="grid grid-cols-2 gap-4">
            {detail.times.map((item, i) => (
              // format tanggal dan hari
              <button
                type="button"
                onClick={() => {
                  console.log(
                    `${dayjs().add(1, "day").format("YYYY-MM-DD")} ${item}`
                  );
                  setDate(
                    `${dayjs().add(1, "day").format("YYYY-MM-DD")} ${item}`
                  );
                }}
                key={`${item + i}`}
                className="group relative theather-card flex flex-col rounded-3xl p-4 gap-[2px] bg-white/10 backdrop-blur-md has-[:disabled]:!bg-white/10 hover:bg-premiere-purple has-[:checked]:bg-premiere-purple transition-all duration-300"
              >
                <input
                  type="radio"
                  name="Time"
                  className="absolute top-1/2 left-1/2 opacity-0"
                  required
                />
                <p className="font-semibold text-xs leading-[18px] group-has-[:disabled]:opacity-30 ">
                  Available
                </p>
                <p className="font-semibold text-xl leading-[30px] group-has-[:disabled]:opacity-30 ">
                  {item}
                </p>
                <p className="font-semibold text-xs leading-[18px] group-has-[:disabled]:opacity-30 ">
                  {dayjs().add(1, "day").format("DD MMM YYYY")}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-[98px] w-full max-w-[640px]">
          <button
            type="button"
            onClick={handleContinue}
            className="fixed bottom-[30px] w-[calc(100%-40px)] max-w-[600px] rounded-full p-[12px_18px] h-fit bg-white font-bold text-premiere-black"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
