import './EachMovie.css';
const EachMovie = (props) => {
  let poster = 'https://image.tmdb.org/t/p/original' + props.moviePoster;
  let backdropImage = 'https://image.tmdb.org/t/p/original' + props.bgImage;
  return (
    <div className="movieStack" onClick={() => props.onClickFunc(props.index)}>
      <div className="eachMovie">
        <img alt="moviePoster" src={poster} className="moviePoster" />
        <h1 className="movieTitle"> {props.movieTitle} </h1>
        <h1 className="movieRating"> {props.movieRating} </h1>
        <h1 className="movieLanguage"> {props.movieLanguage} </h1>
      </div>
      <div
        className="movieDescription"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${backdropImage})`,
        }}
      >
        <p> {props.movieTitle} </p>
        <p>{props.movieDescription}</p>
        <div className="rateAndLang">
          <h4> 平均評分 </h4>
          <h4> 語言 </h4>
          <h4> {props.type === 'tv' ? '首播日期' : '發布日期'} </h4>
        </div>
        <div className="rateAndLang">
          <p> {props.movieRating} </p>
          <p style={{ textTransform: 'uppercase' }}> {props.movieLanguage} </p>
          <p> {props.movieRD} </p>
        </div>
      </div>
    </div>
  );
};

export default EachMovie;
