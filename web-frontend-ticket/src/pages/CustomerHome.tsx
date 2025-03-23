import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"; // Import Swiper styles
import { getSession } from "@/lib/utils";
import BottomBar from "@/components/BottomBar";
import type { Movie } from "@/services/global/global.type";
import type { Genre } from "@/services/genre/genre.type";
import { Link, useLoaderData } from "react-router-dom";

type LoaderData = {
  movies: Movie[];
  genres: Pick<Genre, "_id" | "name">[]; //ambil id, nama genre
};

export default function CustomerHome() {
  const session = getSession();
  // ambil data api genre dan movie
  const { genres, movies } = useLoaderData() as LoaderData;

  console.log(genres, movies);

  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div
        id="Header"
        className="flex items-center justify-between px-5 mt-[60px]"
      >
        <div className="flex items-center gap-[14px] mr-3">
          <div className="w-[60px] h-[60px] flex shrink-0 rounded-full overflow-hidden">
            <img
              src={session?.photoUrl}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
          <div>
            <p className="text-sm">Hallo,</p>
            <p className="font-semibold">{session?.name}</p>
          </div>
        </div>
        <button type="button">
          <img
            src="/assets/images/icons/notification-bell.svg"
            className="w-12 h-12 flex shrink-0"
            alt="icon"
          />
        </button>
      </div>
      <div className="swiper-recommendations px-5">
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          className="swiper-wrapper w-full overflow-hidden mt-5"
        >
          {movies.map((item) => (
            <SwiperSlide key={item._id} className="swiper-slide !w-fit">
              <Link to={`/movie/${item._id}`} className="card">
                <div className="relative flex w-[300px] h-[200px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                  <div className="absolute flex w-12 h-12 shrink-0 rounded-full bg-[#FFFFFF66] backdrop-blur-sm overflow-hidden m-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10">
                    <img
                      src="/assets/images/icons/video-circle.svg"
                      className="w-8 h-8 m-auto"
                      alt="icon"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <form
        action="#"
        className="flex items-center gap-[10px] rounded-full py-[2px] pl-5 h-fit bg-[#FFFFFF1A] backdrop-blur-sm placeholder:text-white focus-within::ring-1 focus-within::ring-white transition-all duration-300 overflow-hidden mx-5 mt-5"
      >
        <input
          type="text"
          className="appearance-none outline-none bg-transparent h-full w-full font-semibold placeholder:font-normal placeholder:text-white"
          placeholder="Search movie by name"
        />
        <button type="submit" className="w-12 h-12 flex shrink-0">
          <img src="/assets/images/icons/search-white-bg.svg" alt="icon" />
        </button>
      </form>
      <section id="Genre" className="flex flex-col gap-[10px] mt-5">
        <h2 className="font-semibold px-5">Browse Genre</h2>
        <div className="swiper-genre w-full overflow-hidden">
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            className="swiper-wrapper"
          >
            {genres.map((item) => (
              <SwiperSlide
                key={item._id}
                className="swiper-slide !w-fit py-[1px]"
              >
                <Link to={`/browse/${item._id}`} className="card">
                  <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
                    {item.name}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
        <h2 className="font-semibold">All New Movies</h2>
        {movies.map((item) => (
          <Link to={`/movie/${item._id}`} key={item._id} className="card">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-[14px]">
                <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/video-vertical-grey.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">
                      {item.genre.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/images/icons/location.svg"
                      className="w-[18px] h-[18px] flex shrink-0"
                      alt="icon"
                    />
                    <p className="text-sm text-premiere-grey">Jakarta</p>
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
          </Link>
        ))}
      </section>
      <section id="Coming-Soon" className="flex flex-col gap-4 mt-5">
        <h2 className="font-semibold px-5">Coming Soon</h2>
        <div className="swiper-coming w-full overflow-hidden">
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            className="swiper-wrapper"
          >
            {movies.map((item) => (
              <SwiperSlide key={item._id} className="swiper-slide !w-fit">
                <a href="details.html" className="card">
                  <div className="relative flex w-[240px] h-[300px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                    <div className="absolute w-full bottom-0 p-[14px] z-10">
                      <div className="flex items-center w-full rounded-[20px] p-[14px] gap-3 bg-[#FFFFFF33] backdrop-blur-md verflow-hidden">
                        <img
                          src="/assets/images/icons/video-vertical-white.svg"
                          className="w-8 h-8 flex shrink-0"
                          alt="icon"
                        />
                        <div className="flex flex-col gap-[2px]">
                          <p className="text-sm">{item.genre.name}</p>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <BottomBar activeLink="discover" />
    </div>
  );
}
