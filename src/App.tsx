import { useEffect, useState } from "react";
import "./App.css";

function updateClock(): string {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

function App() {
  const now = updateClock();
  const [time, setTime] = useState<string>(now);

  useEffect(() => {
    const tick = () => {
      setTime(updateClock());
    };

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      tick();
      setInterval(tick, 60000); // Update every minute
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timeout);
    };
  }, []);

  return <h1>{time}</h1>;
}

export default App;
