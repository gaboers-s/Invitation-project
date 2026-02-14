import { useState, useEffect } from "react";
import "./invitation.css";


function App() {
  const [page, setPage] = useState("home");
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [response, setResponse] = useState("");

  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");
  const [link, setLink] = useState("");


  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const urlTo = params.get("to");
  const urlMsg = params.get("msg");
  const urlFrom = params.get("from");
  const urlRes = params.get("res");

  if (urlTo && urlMsg && urlFrom && urlRes) {
    setTo(urlTo);
    setMessage(urlMsg);
    setFrom(urlFrom);
    setResponse(urlRes);
    setPage("invitation");
  }
}, []);


  function moveNoButton() {
    setNoPos({
      x: Math.random() * 380 - 100,
      y: Math.random() * 380 - 100,
    });
  }

function handleNext() {
  if (!to.trim() || !message.trim() || !from.trim() || !response.trim()) {
    setError("Please fill in all fields");
    return;
  }

  setError("");

const url = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(
  to
)}&msg=${encodeURIComponent(message)}&from=${encodeURIComponent(
  from
)}&res=${encodeURIComponent(response)}`;

}



  return (
    <div className="container">

     
      {page === "home" && (
        <div className="card-input">

          <h1>Valentines Invitation</h1>

          <input
            type="text"
            placeholder="To:"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="text"
            placeholder="From:"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            type="text"
            placeholder="Response to yes: "
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />

        {error && <p className="error">{error}</p>}

          <button onClick={handleNext}>
            Generate link
          </button>
        </div>
      )}

{page === "preview" && (
  <div className="card-invitation">

    <h1>To: {to}</h1>
    <h2>{message}</h2>
    <h3>From: {from}</h3>

    <button onClick={() => setPage("home")}>
      Back
    </button>

    <h2>Your invitation link:</h2>
    <p>Copy the link first before going to preview</p>

    <input
      value={link}
      readOnly
      onClick={(e) => e.target.select()}
    /> 

<button  onClick={async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied!");
    } catch {
      alert("Hold and copy the link manually.");
    }
  }}>
  Copy Link
</button>


    <button onClick={() => setPage("invitation")}>
      Preview Invitation
    </button>
  </div>
)}


    
      {page === "invitation" && (
        <div className="card-invitation">
          <h1>To: {to}</h1>
          <h2>{message}</h2>
          <h3>From: {from}</h3>

          <div className="buttons">

            <button
              className="yes"
              onClick={() => setPage("yes")}
            >
              Yes!!! 
            </button>

            <button
              className="no"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: "0.2s ease",
                position: "relative"
              }}
            >
              No 
            </button>
          </div>

         
        </div>
      )}

      {page === "yes" && (
        <div className="card-yes">
            <h1>{response}</h1>
        </div>
      )}

    </div>
  );
}

export default App;
