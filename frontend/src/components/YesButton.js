import axios from "axios";
import "../App.css";

function YesButton({ fetchVotes }) {
  const handleClick = async () => {
    await axios
      .post("http://localhost:5000/api/votes", { vote: "yes" })
      .then(() => {
        fetchVotes();
      })
      .catch((error) => console.error(error));
  };

  return (
    <button className="vote-button" onClick={handleClick}>
      Oui
    </button>
  );
}

export default YesButton;
