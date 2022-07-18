import { useState, useEffect } from 'react';
import Details from './Details';
import EachMovie from './EachMovie';
import Pagination from './Pagination';
import './Contact.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Contact = () => {
  let [category, setCategory] = useState('popular');
  let [time, setTime] = useState('week');
  let [type, setType] = useState('movie');

  let [movieList, setMovieList] = useState([]);

  const [currentIndex, changeCurrentIndex] = useState(0);
  const [movieID, setMovieID] = useState();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieGenres, setMovieGenre] = useState(movieDetails['genres']);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // 趨勢
    if (category === 'trending') {
      fetch(
        'https://api.themoviedb.org/3/trending/' +
          type +
          '/' +
          time +
          '?api_key=bef2528d4379f5461c3b41b4c7002244&page=' +
          page +
          '&language=zh-TW'
      )
        .then((result) => result.json())
        .then((resultJSON) => {
          setMovieList(resultJSON.results);
          setMovieID(resultJSON.results[0]['id']);
          setTotalPages(resultJSON['total_pages']);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log('finally');
        });
    } else {
      // Popular movie/popular tv/popular
      fetch(
        'https://api.themoviedb.org/3/' +
          type +
          '/' +
          category +
          '?api_key=bef2528d4379f5461c3b41b4c7002244&page=' +
          page +
          '&language=zh-TW'
      )
        .then((result) => result.json())
        .then((resultJSON) => {
          setMovieList(resultJSON.results);
          setMovieID(resultJSON.results[0]['id']);
          setTotalPages(resultJSON['total_pages']);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log('finally');
        });
    }
  }, [type, category, time, page]);

  const handlePageClick = (number) => {
    setPage(number);
  };

  useEffect(() => {
    if (movieID) {
      fetch(
        'https://api.themoviedb.org/3/movie/' +
          movieID +
          '?api_key=bef2528d4379f5461c3b41b4c7002244&language=zh-TW'
      )
        .then((result) => result.json())
        .then((resultJSON) => {
          setMovieDetails(resultJSON);
          setMovieGenre(resultJSON['genres']);
          setMovieID(resultJSON['id']);
          console.log(resultJSON['budget']);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log('finally');
        });
    }
  }, [movieID]);

  const changeMovie = (index) => {
    movieList.length > 0
      ? setMovieID(movieList[index]['id'])
      : setMovieID(453395);
    changeCurrentIndex(index);
    setMovieGenre(movieDetails['genres']);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="header">
        <select
          value={category}
          className="categoryBtn"
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="popular"> What's Popular </option>
          <option value="trending"> Trending </option>
        </select>

        <div>
          {
            /**popular 沒有日、週 */
            category === 'popular' ? (
              ''
            ) : (
              <select
                value={time}
                className="watchLaterBtn"
                onChange={(e) => {
                  setTime(e.target.value);
                  setPage(1);
                }}
              >
                <option value="day"> 今日 </option>
                <option value="week"> 本週 </option>
              </select>
            )
          }
          <select
            value={type}
            className="watchLaterBtn"
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <option value="movie"> 電影 </option>
            <option value="tv"> 影集 </option>
          </select>
        </div>
      </div>
      {movieList.length > 0 ? (
        <div>
          <div>
            <Details
              id="top"
              type={type}
              movieGenres={movieGenres}
              runtime={movieDetails['runtime']}
              homepage={movieDetails['homepage']}
              budget={movieDetails['budget']}
              status={movieDetails['status']}
              tagline={movieDetails['tagline']}
              released={movieDetails['released']}
              bgImage={movieList[currentIndex]['backdrop_path']}
              moviePoster={movieList[currentIndex]['poster_path']}
              movieRD={movieList[currentIndex]['release_date']}
              movieTitle={
                type === 'tv'
                  ? movieList[currentIndex]['name']
                  : movieList[currentIndex]['title']
              }
              movieDescription={movieList[currentIndex]['overview']}
              movieRating={movieList[currentIndex]['vote_average']}
              movieLanguage={movieList[currentIndex]['original_language']}
            />
          </div>
          <div className="gridView">
            <Slider {...settings}>
              {movieList.map((_, index) => {
                return (
                  <EachMovie
                    key={index}
                    index={index}
                    onClickFunc={changeMovie}
                    type={type}
                    bgImage={movieList[index]['backdrop_path']}
                    moviePoster={movieList[index]['poster_path']}
                    movieRD={
                      type === 'tv'
                        ? movieList[index]['first_air_date']
                        : movieList[index]['release_date']
                    }
                    movieTitle={
                      type === 'tv'
                        ? movieList[index]['name']
                        : movieList[index]['title']
                    }
                    movieDescription={movieList[index]['overview']}
                    movieRating={movieList[index]['vote_average']}
                    movieLanguage={movieList[index]['original_language']}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      ) : (
        <Details
          bgImage=""
          moviePoster=""
          movieRD="Release Date"
          movieTitle="Movie Title"
        />
      )}
      <div style={{ display: 'inline-flex' }}>
        <Pagination
          totalPages={totalPages}
          page={page}
          handleClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default Contact;
