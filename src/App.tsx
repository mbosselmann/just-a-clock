import { useEffect, useState } from "react";
import "./App.css";

function updateClock() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
}

function App() {
  const now = updateClock();
  const [time, setTime] = useState(now);

  useEffect(() => {
    const tick = () => {
      setTime(updateClock());
    };

    const now = new Date();
    const delay = 1000 - (now.getMilliseconds() % 1000);

    const timeout = setTimeout(() => {
      tick();
      setInterval(tick, 1000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timeout);
    };
  }, []);

  return <h1>{time}</h1>;
}

export default App;
