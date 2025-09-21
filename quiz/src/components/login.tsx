import React, { useState } from "react";

interface Args {
	uname: string;
	setUname: (name: string) => void;
	institute: string;
	setInst: (name: string) => void;
	setStage: (name: string) => void;
}

export default function Login({ uname, setUname, institute, setInst, setStage }: Args) {
	const [input1, setInput1] = useState(uname);
	const [input2, setInput2] = useState(institute);
	const [notify, setNotify] = useState<string>("");

	const handleButtonInput = () => {
		if (!input1 || !input2) {
			setNotify("Please fill the required fields");
			setTimeout(() => setNotify(""), 1500);
			return;
		}
		setUname(input1);
		setInst(input2);
		setStage("subject");
	};

	return (
		<>
			<style>{`
        :root {
          --primary-color: #9370db;
          --primary-color-dark: #7a5dc9;
          --font-family: "Poppins", sans-serif;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
          font-family: var(--font-family);
        }
        .main-container {
          width: 100vw;
          height: 100vh;
          background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-18/YggJShyPV8.png)
            no-repeat center center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-card {
          width: min(90%, 600px);
          background: #ffffff;
          border-radius: 30px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .quizify {
          color: var(--primary-color);
          font-family: "NotoSerifTamilSlanted", serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          margin-bottom: 2rem;
          display: block;
        }
        .input-group {
          margin: 1rem 0;
        }
        .input-box {
          width: 100%;
          height: 60px;
          border-radius: 50px;
          border: 2px solid var(--primary-color);
          background: rgba(217, 217, 217, 0.45);
          padding: 0 1.5rem;
          font-size: 1.1rem;
          font-family: var(--font-family);
          font-weight: 500;
          color: #333;
          outline: none;
          transition: 0.2s;
        }
        .input-box:focus {
          border-color: var(--primary-color-dark);
          background: #fff;
        }
        .input-box::placeholder {
          color: rgba(147, 112, 219, 0.55);
        }
        .sign-in {
          margin-top: 2rem;
        }
        .sign-in-btn {
          width: 200px;
          height: 60px;
          background: var(--primary-color);
          border: 2px solid var(--primary-color);
          border-radius: 50px;
          color: #fff;
          font-family: var(--font-family);
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .sign-in-btn:hover {
          background: var(--primary-color-dark);
          border-color: var(--primary-color-dark);
        }
        @media (max-width: 768px) {
          .login-card {
            padding: 2rem 1.5rem;
          }
          .sign-in-btn {
            width: 100%;
          }
        }
      `}</style>

			<div className="main-container">
				<div className="login-card">
					<span className="quizify">Quizify</span>

					<div className="input-group">
						<input
							type="text"
							className="input-box"
							placeholder="Username"
							value={input1}
							onChange={(e) => setInput1(e.target.value)}
						/>
					</div>

					<div className="input-group">
						<input
							type="text"
							className="input-box"
							placeholder="Institute"
							value={input2}
							onChange={(e) => setInput2(e.target.value)}
						/>
					</div>

					<div className="sign-in">
						<p style={{ color: "red" }}>{notify}</p>
						<button className="sign-in-btn" onClick={handleButtonInput}>
							Sign in
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
