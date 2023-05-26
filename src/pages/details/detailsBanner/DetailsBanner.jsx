import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx"; 
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./PlayIcon";
const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId,setVideoId] = useState(null)
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((person) => person.job === "Director");
  const writer = crew?.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Screenplay" ||
      person.job === "Story"
  );

  console.log(writer);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  console.log(url?.backDrop + data?.backdrop_path);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <div>
          <div className="backdrop-img">
            <Img src={url?.backDrop + data?.backdrop_path}></Img>
          </div>
          <div className="opacity"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url?.backDrop + data?.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={_genres} />
                <div className="row">
                  <CircleRating rating={data?.vote_average.toFixed(1)} />
                  <div className="playbtn" onClick={()=>{
                    setShow(true)
                    setVideoId(video.key)
                  }}>
                    <PlayIcon />
                    <span className="text" onClick={() => {}}>
                      Watch Trailer
                    </span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                </div>
                <div className="info">
                  {data?.status && (
                    <div className="infoIteam">
                      <span className="text bold">Status :</span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}

                  {data?.release_date && (
                    <div className="infoIteam">
                      <span className="text bold">Release Date :</span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}

                  {data?.runtime && (
                    <div className="infoIteam">
                      <span className="text bold">Duration :</span>
                      <span className="text">
                        {toHoursAndMinutes(data?.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director :</span>
                    <span className="text">
                      {director.map((dir, index) => (
                        <span key={index}>
                          {dir.original_name}
                          {director.length - 1 !== index && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer :</span>
                    <span className="text">
                      {writer.map((wr, index) => (
                        <span key={index}>
                          {wr.original_name}
                          {writer.length - 1 !== index && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Created By :</span>
                    <span className="text">
                      {data.created_by.map((cb, index) => (
                        <span key={index}>
                          {cb.name}
                          {data.created_by.length - 1 !== index && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ContentWrapper>
          <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
        </div>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
