import { useState, useEffect } from "react";

const ExpirydateComponent = ({ expirationDate }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(expirationDate);

      if (targetDate > now) {
        const timeDifference = targetDate - now;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            className="text-5xl"
            style={{ "--value": countdown.days }}
          ></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            className="text-5xl"
            style={{ "--value": countdown.hours }}
          ></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            className="text-5xl"
            style={{ "--value": countdown.minutes }}
          ></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            className="text-5xl"
            style={{ "--value": countdown.seconds }}
          ></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default ExpirydateComponent;
