// file untuk pilih theater di halamman detail movie ketika buy ticket

import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { LoaderData } from ".";
import { setStep, setTicketDetail } from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { Theater } from "@/services/theater/theater.type";

export default function SelectTheater() {
  const { detail } = useLoaderData() as LoaderData; //load data detail movie
  const dispatch = useAppDispatch(); //dispatch ke halaman mana

  const [theater, setTheater] = useState<Theater | null>(null);
  // fungsi utk pilih theater, error jika ga pilih theater
  const handleContinue = () => {
    if (theater === null) {
      alert("Please select theater first");
      return;
    }
    // kalo pilih theater redirect ke halaman waktu
    dispatch(
      setTicketDetail({
        theater: theater,
      })
    );

    dispatch(
      setStep({
        step: "TIME",
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
                  step: "DETAIL",
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
            Choose Theater
          </p>
          <div className="dummy-button w-12" />
        </div>
        <div className="flex items-center justify-between gap-2 mx-5">
          <div className="flex items-center gap-[14px]">
            <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
              <img
                src="/assets/images/thumbnails/th3.png"
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
      <div className="relative px-5 mt-5">
        <div id="Theaters" className="tab-content flex flex-col gap-4">
          <h2 className="font-semibold">Available in Theaters</h2>
          {/* maping theaters */}
          {detail.theaters.map((item) => (
            <button
              type="button"
              key={item._id}
              onClick={() => setTheater(item)}
              className="relative theather-card flex items-center rounded-3xl p-4 gap-2 bg-white/10 backdrop-blur-md hover:bg-premiere-purple has-[:checked]:bg-premiere-purple transition-all duration-300"
            >
              <input
                type="radio"
                name="theater"
                className="absolute top-1/2 left-1/2 opacity-0"
                required
              />
              <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl overflow-hidden bg-[#D9D9D9]">
                <img
                  src="/assets/images/thumbnails/theater1.png"
                  className="w-full h-full object-cover"
                  alt="theater"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-premiere-grey">{item.city}</p>
              </div>
            </button>
          ))}
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
      </div>
    </div>
  );
}
