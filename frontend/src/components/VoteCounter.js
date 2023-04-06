import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";

function VoteCounter(votes) {
  return (
    <div className="vote-counters">
      <p>Oui : {votes?.votes?.yes_count ?? 0}</p>
      <p>Non : {votes?.votes?.no_count ?? 0}</p>
    </div>
  );
}

export default VoteCounter;
