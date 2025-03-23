// file ini utk panggil component component
import { useAppSelector } from "@/redux/hooks";
import type { MovieDetail } from "@/services/global/global.type";
import DetailMovie from "./DetailMovie";
import SelectTheater from "./SelectTheater";
import SelectTime from "./SelectTime";
import SelectSeat from "./SelectSeat";

// loaderData detail movie
export type LoaderData = {
  detail: MovieDetail;
};

export default function CustomerMovieDetail() {
  const { step } = useAppSelector((state) => state.ticket);

  return (
    <>
      {step === "DETAIL" && <DetailMovie />}
      {step === "THEATER" && <SelectTheater />}
      {step === "TIME" && <SelectTime />}
      {step === "SEAT" && <SelectSeat />}
    </>
  );
}
