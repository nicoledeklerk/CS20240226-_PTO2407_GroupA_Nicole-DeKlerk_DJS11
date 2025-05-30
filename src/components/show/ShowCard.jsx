import { Link } from "react-router-dom";
import genreMap from "../../data/genreMap";
import "./ShowCard.css";

export default function ShowCard({ show }) {
  const previewImage = show?.image;
  const numberOfSeasons = show?.seasons;
  const genreTitles = show?.genres?.map((id) => genreMap[id]).filter(Boolean);

  const formattedUpdatedDate = show?.updated
    ? new Date(show.updated).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="show-card">
      {previewImage && (
        <Link to={`/show/${show.id}`}>
          <img
            src={previewImage}
            alt={`${show.title} Preview`}
            className="show-image"
          />
        </Link>
      )}

      <Link to={`/show/${show.id}`} className="show-title">
        {show?.title}
      </Link>

      <div className="show-description">
        {show?.description?.length > 100 ? (
          <>
            {show.description.slice(0, 100)}...
            <Link to={`/show/${show.id}`} className="read-more">
              {" "}
              Read more →
            </Link>
          </>
        ) : (
          show?.description
        )}
      </div>

      {/* Show seasons if it exists and is > 0 */}
      {numberOfSeasons > 0 && (
        <p className="show-seasons">
          📽️ {numberOfSeasons} Season{numberOfSeasons !== 1 ? "s" : ""}
        </p>
      )}

      {genreTitles.length > 0 && (
        <div className="show-genres">
          {genreTitles.map((genre, index) => (
            <span key={index} className="genre-pill">
              {genre}
            </span>
          ))}
        </div>
      )}
      {formattedUpdatedDate && (
        <p className="show-updated">🕓 Updated: {formattedUpdatedDate}</p>
      )}
    </div>
  );
}
