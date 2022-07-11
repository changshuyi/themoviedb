import './Details.css';

const Details = (props) => {
  const backdropImage = 'https://image.tmdb.org/t/p/original' + props.bgImage;
  return (
    <div
      className="detailsPage"
      style={{
        backgroundImage: `url(${backdropImage})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="banner">
        <div>
          <a href={props.homepage}>
            <img
              alt="moviePoster"
              className="moviePosterD"
              src={'https://image.tmdb.org/t/p/original' + props.moviePoster}
            ></img>{' '}
          </a>
        </div>
        <div className="details">
          <div className="rateAndLangD">
            <h5 className="movieReleaseDateD"> {props.movieRD} </h5>
            {props.status === 'Released' ? (
              <h5 className="movieReleaseDateD" style={{ color: '#00ffdd' }}>
                {props.status}
              </h5>
            ) : props.status === 'Post Production' ? (
              <h5 className="movieReleaseDateD" style={{ color: '#eeee00' }}>
                {props.status}
              </h5>
            ) : (
              <h5 className="movieReleaseDateD"> {props.status} </h5>
            )}
          </div>
          <h1 className="movieTitleD"> {props.movieTitle} </h1>
          {props.type === 'tv' ? '' : <h2> {props.tagline} </h2>}

          <p className="movieDescriptionD"> {props.movieDescription} </p>
          <hr style={{ opacity: '0.1' }}></hr>
          <div style={{ display: 'inline-flex' }}>
            {props.type !== 'tv' ? (
              props.movieGenres === undefined ? (
                ''
              ) : (
                props.movieGenres.map((genre, index) => {
                  return (
                    <div>
                      <h4
                        key={index}
                        style={{
                          marginRight: '10px',
                          fontWeight: 'normal',
                          fontStyle: 'italic',
                        }}
                        className="movieGenreD"
                      >
                        {genre.name}
                      </h4>
                    </div>
                  );
                })
              )
            ) : (
              <div></div>
            )}
          </div>
          {/* {props.type === 'tv' ? (
            <div></div>
          ) : (
            <div>
              <div className="rateAndLangD">
                <p className="movieDescriptionD">
                  {'片長: ' + props.runtime + ' 分鐘'}
                </p>
                <p className="movieDescriptionD">{'票房: $' + props.budget}</p>
              </div>
            </div>
          )} */}
          <div className="rateAndLangD">
            <h4 className="movieRatingD"> {'滿意度: ' + props.movieRating} </h4>
            <h4>
              語言:
              <span className="movieLanguageD"> {props.movieLanguage} </span>
            </h4>
          </div>
          <div style={{ paddingBottom: '20px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
