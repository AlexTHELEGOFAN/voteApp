// import "./index.css";
import VoteCounter from "./components/VoteCounter";
import YesButton from "./components/YesButton";
import NoButton from "./components/NoButton";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import ReinitializeButton from "./components/ReinitializeButton";

function App() {
  const [votes, setVotes] = useState();
  const [isContentVisible, setIsContentVisible] = useState(false);

  const fetchVotes = async () => {
    await axios
      .get("http://localhost:5000/api/votes")
      .then((res) => setVotes(res.data.votes[0]))
      .catch((error) => console.error(error));
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Système de vote</h1>
      <textarea className="question">
        Allez-vous voter pour Donald Trump ?
      </textarea>
      <div className="button-container">
        <YesButton fetchVotes={fetchVotes} />
        <NoButton fetchVotes={fetchVotes} />
      </div>
      <div className="button-container">
        <button onClick={toggleContentVisibility} className="button-display">
          {isContentVisible
            ? "Masquer les résultats"
            : "Afficher les résultats"}
        </button>
      </div>
      {isContentVisible && <VoteCounter votes={votes} />}
      <ReinitializeButton fetchVotes={fetchVotes} />
    </div>
  );
}

export default App;
