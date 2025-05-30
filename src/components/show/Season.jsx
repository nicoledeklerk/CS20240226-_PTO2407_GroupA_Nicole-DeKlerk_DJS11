import './Season.css';
import EpisodeCard from './EpisodeCard';

export default function Season({ season, onClose, showId, showName }) {
  console.log("Episodes in season:", season?.episodes);
  return (
    <div className="season-detail">
      <button onClick={onClose} className="back-button">← Back to Show</button>

      <h2 className="season-title">Season {season?.season}</h2>

      <div className="episode-list">
        {season?.episodes?.map((episode) => (
          <EpisodeCard
            key={`${episode.episode}-${episode.title}`}
            episode={episode}
            showId={showId}          
            showName={showName} 
            season={season.season}
            thumbnail={season.image}
          />
        ))}
      </div>
    </div>
  );
}
