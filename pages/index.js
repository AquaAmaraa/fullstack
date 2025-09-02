import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [bg, setBg] = useState("bg-white");
  const [spin, setSpin] = useState(false);
  const [emojiRain, setEmojiRain] = useState([]);

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 1500);
  }

  function changeBackground() {
    const colors = ["bg-white", "bg-gray-100", "bg-blue-50", "bg-pink-50"];
    setBg(colors[Math.floor(Math.random() * colors.length)]);
    showMessage("Background Changed");
  }

  function spawnEmoji() {
    const id = Math.random().toString(36).substring(7);
    const emojis = ["💩", "🤡", "🍕", "👾", "🦄", "🔥", "🎉"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = Math.random() * 80;
    setEmojiRain((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setEmojiRain((prev) => prev.filter((e) => e.id !== id));
    }, 3000);
  }

  function showAlert() {
    alert("You pressed the Alert button!");
  }

  function toggleSpinSpeed() {
    showMessage("Spin Fast!");
    setSpin(!spin);
  }

  return (
    <div className={`${bg} min-h-screen flex items-center justify-center relative p-10`}>      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <button
          onClick={changeBackground}
          className="p-6 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Change BG
        </button>
        <button
          onClick={() => setSpin(!spin)}
          className={`p-6 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg transition ${spin ? "animate-spin" : "hover:rotate-6"}`}
        >
          Spin
        </button>
        <button
          onClick={() => showMessage("LOL")}
          className="p-6 bg-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-pink-700 transition"
        >
          LOL
        </button>
        <button
          onClick={spawnEmoji}
          className="p-6 bg-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-purple-700 transition"
        >
          Emoji
        </button>
        <button
          onClick={showAlert}
          className="p-6 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-orange-600 transition"
        >
          Alert
        </button>
        <button
          onClick={toggleSpinSpeed}
          className="p-6 bg-teal-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-teal-600 transition"
        >
          Spin Fast
        </button>
      </div>

      {message && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full animate-bounce">
          {message}
        </div>
      )}

      {emojiRain.map((e) => (
        <div key={e.id} className="absolute text-3xl animate-bounce" style={{ left: `${e.left}%`, top: "20%" }}>
          {e.emoji}
        </div>
      ))}
    </div>
  );
}