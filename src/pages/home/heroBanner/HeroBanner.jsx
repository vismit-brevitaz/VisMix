import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrappper from "../../../components/contentWrapper/ContentWrapper";
function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/popular");
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    if (url?.backDrop) {
      const bg =
        url?.backDrop +
        data?.results[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(bg);
    }
  }, [data]);
  const searchQueryHandler = (e) => {
    if ((e.key === "Enter" && query.length > 0) || e.click) {
      console.log(e);
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && background !== "" && (
        <div className="backDrop-img">
          <Img src={background}></Img>
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrappper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV Shows and people to discover. Explore Now.
          </span>
          <div className="searchInput">
            <input
              onKeyUp={searchQueryHandler}
              type="text"
              value={query}
              placeholder="Search for a Movies or TV Shows"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => {
                if (query.length > 0) {
                  navigate(`/search/${query}`);
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrappper>
    </div>
  );
}

export default HeroBanner;
