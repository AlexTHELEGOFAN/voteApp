import axios from "axios";
import "../App.css";

function NoButton({ fetchVotes }) {
  const handleClick = async () => {
    await axios
      .post("http://localhost:5000/api/votes", { vote: "no" })
      .then(() => {
        fetchVotes();
      })
      .catch((error) => console.error(error));
  };

  return (
    <button className="vote-button" onClick={handleClick}>
      Non
    </button>
  );
}

export default NoButton;
