import axios from "axios";
import "../App.css";

function ReinitializeButton({ fetchVotes }) {
  const handleClick = async () => {
    await axios
      .delete("http://localhost:5000/api/votes")
      .then(() => {
        fetchVotes();
      })
      .catch((error) => console.error(error));
  };

  return (
    <button onClick={handleClick} className="button-display">
      Réinitialiser les votes
    </button>
  );
}

export default ReinitializeButton;
