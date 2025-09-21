import React, { useState } from "react";

interface Args {
  subject: string;
  setSub: (name: string) => void;
  setStage: (name: string) => void;
}

export default function Subject({ subject, setSub, setStage }: Args) {
  const [input1, setInput1] = useState<string>(subject);
  const [notify, setNotify] = useState<string>("");

  const handleButtonInput = () => {
    if (input1 === "") {
      setNotify("Select a subject to continue");
      setTimeout(() => setNotify(""), 1500);
      return;
    }
    setSub(input1);
    setStage("quiz");
  };

  return (
    <>
      <style>{`
        :root {
          --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Ubuntu, "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        #root, body {
          width: 100%;
          margin: 0;
          padding: 0;
          background: #EDEDED;
          font-family: var(--default-font-family);
        }

        .main-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        .quizify {
          display: block;
          margin: 2rem 0;
          margin-left: 5%;
          color: #9370db;
          font-family: NotoSerifTamilSlanted, var(--default-font-family);
          font-size: clamp(2rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1.2;
        }

        .frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding-bottom: 2rem;
        }

        .subject-box {
          position: relative;
          width: 95%;
          max-width: 1200px;
          aspect-ratio: 1250 / 300;
          border-radius: 80px; /* box corners rounded */
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          background-size: cover;
          background-position: right center;
        }

        .subject-box:hover {
          transform: scale(1.02);
        }

        .subject-rect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          border-radius: 80px;
          z-index: 1;
        }

        .subject-title {
          position: absolute;
          top: 10%;
          left: 5%;
          font-family: Raleway, var(--default-font-family);
          font-size: clamp(1.2rem, 1.8vw, 2rem);
          font-weight: 500;
          color: #fff;
          z-index: 2;
          max-width: 60%;
        }

        .subject-info {
          position: absolute;
          top: 55%;
          left: 5%;
          font-family: Raleway, var(--default-font-family);
          font-size: clamp(1rem, 1.5vw, 1.5rem);
          font-weight: 600;
          color: #fff;
          z-index: 2;
        }

        .subject-time {
          position: absolute;
          top: 75%;
          left: 5%;
          font-family: Inter, var(--default-font-family);
          font-size: clamp(0.9rem, 1.2vw, 1.2rem);
          font-weight: 500;
          color: #fff;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .subject-box {
            aspect-ratio: 4 / 1;
          }
        }

        @media (max-width: 768px) {
          .subject-box {
            aspect-ratio: auto;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .subject-box {
            height: 180px;
          }
          .subject-title {
            font-size: clamp(1rem, 4vw, 1.5rem);
          }
          .subject-info {
            font-size: clamp(0.9rem, 3.5vw, 1.2rem);
          }
          .subject-time {
            font-size: clamp(0.8rem, 3vw, 1rem);
          }
        }
      `}</style>

      <div className="main-container">
        <span className="quizify">Quizify</span>
        <div className="frame">
          {[
            { key: "dsa", title: "DATA STRUCTURE AND ALGORITHM QUIZ", questions: 10, time: "10 Mins", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/qC80GqYq0S.png", rect: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/Ek24wgBhRa.png" },
            { key: "mpmc", title: "MICROPROCESSOR & MICROCONTROLLER QUIZ", questions: 10, time: "10 Mins", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/X2d8JatSXp.png", rect: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/RdFj4DD0qZ.png" },
            { key: "coa", title: "COMPUTER ORGANISATION AND ARCHITECTURE QUIZ", questions: 10, time: "10 Mins", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/vK2NE71AAJ.png", rect: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/gayHjhwnuQ.png" },
            { key: "ajp", title: "ADVANCED JAVA PROGRAMMING", questions: 10, time: "10 Mins", image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/7F75FqeAt4.png", rect: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/uXH1mVfyNB.png" },
          ].map((sub) => (
            <div
              key={sub.key}
              className="subject-box"
              style={{ backgroundImage: `url(${sub.image})` }} // image moved to subject-box
              onClick={() => { setInput1(sub.key); handleButtonInput(); }}
            >
              <div className="subject-rect" style={{ backgroundImage: `url(${sub.rect})` }} />
              <div className="subject-title">{sub.title}</div>
              <div className="subject-info">{sub.questions} Questions</div>
              <div className="subject-time">Time: {sub.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
