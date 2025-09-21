import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

interface Question {
	subject: string;
	question: string;
	a: string;
	b: string;
	c: string;
	d: string;
	answer: string;
}

interface Args {
	subject: string;
	setStage: (name: string) => void;
	setScore: (value: number) => void;
	uname: string;
	inst: string;
}

export default function Quiz({ subject, setStage, setScore, uname, inst }: Args) {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [answers, setAnswers] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const fetched = useRef(false);

	// Timer state (60 sec for demo, adjust to 600 for 10 mins)
	const [timeLeft, setTimeLeft] = useState(60);

	const loadQuestions = async () => {
		if (fetched.current) return;
		fetched.current = true;
		setLoading(true);
		try {
			const res = await axios.get(`http://localhost:5000/questions/${subject}`);
			setQuestions(res.data);
			setAnswers(Array(res.data.length).fill(""));
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSelect = (qIndex: number, option: string) => {
		if (submitted) return;
		const newAnswers = [...answers];
		newAnswers[qIndex] = option;
		setAnswers(newAnswers);
	};

	const handleSubmit = useCallback(() => {
		if (submitted) return;
		let newMark = 0;
		questions.forEach((q, i) => {
			if (answers[i] === q.answer[0]) newMark++;
		});
		setScore(newMark);
		setSubmitted(true);
	}, [answers, questions, submitted, setScore]);

	// Timer effect
	useEffect(() => {
		if (submitted) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					handleSubmit(); // auto-submit at 0
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [submitted, handleSubmit]);

	useEffect(() => {
		loadQuestions();
	}, []);

	const getSubjectDisplay = (subject: string) => {
		switch (subject.toLowerCase()) {
			case "coa":
				return "Computer Organisation and Architecture";
			case "ajp":
				return "Advanced Java Programming";
			case "mpmc":
				return "Microprocessor and Microcontroller";
			case "dsa":
				return "Datastructures and Algorithms";
			default:
				return subject;
		}
	};

	// Format timer as mm:ss
	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<>
			<style>{`
:root {
	--default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC",
	"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
	"Source Han Sans CN", sans-serif;
}

#root{width:100%; }
body {
	margin: 0;
	padding: 0;
	background: #e5e5e5;
	font-size: 16px;
}

.main-container {
	max-width: 1200px;
	width: 90%;
	margin: 0 auto;
	padding: 20px;
	box-sizing: border-box;
}

.quizify {
	display: block;
	font-size: clamp(2rem, 5vw, 60px);
	color: #9370db;
	font-family: NotoSerifTamilSlanted, var(--default-font-family);
	font-weight: 700;
	margin-bottom: 20px;
	position: relative;
}

.subject-quiz {
	font-size: clamp(1.2rem, 4vw, 40px);
	font-family: Poppins, var(--default-font-family);
	font-weight: 800;
	color: #727272;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
}

.timer {
	font-size: clamp(1rem, 3vw, 24px);
	font-weight: 600;
	color: #9370db;
}

.question-title {
	display: block;
	color: black;
	margin: 30px 0 15px;
	font-size: clamp(1rem, 3vw, 28px);
	font-family: Montserrat, var(--default-font-family);
	font-weight: 500;
}

.option-box {
	color: black;
	background: #fff;
	border-radius: 50px;
	padding: 12px 20px;
	margin: 10px 0;
	display: flex;
	align-items: center;
	font-size: clamp(0.9rem, 2.5vw, 22px);
	font-family: "Open Sans", var(--default-font-family);
	cursor: pointer;
	transition: background 0.3s ease, color 0.3s ease;
	position: relative;
	word-break: break-word;
}

.option-box.selected {
	background-color: #9370db !important;
	color: white !important;
}

.option-box input[type="radio"] {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	width: 18px;
	height: 18px;
	border: 2px solid black;
	border-radius: 50%;
	outline: none;
	cursor: pointer;
	margin-right: 12px;
	background-color: #fff;
	transition: background 0.3s ease, border-color 0.3s ease;
	position: relative;
}

.option-box input[type="radio"]::after {
	content: "";
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: transparent;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: background 0.3s ease;
}

.option-box:hover {
	border-style: solid;
	border-width: 2px;
	border-color: rgb(148, 112, 219);
}

.option-box:hover input[type="radio"] {
	border-color: white;
	background-color: #9370db;
}

.option-box input[type="radio"]:checked {
	border-color: white;
	background-color: #9370db;
}

.option-box input[type="radio"]:checked::after {
	background: white;
}

.option-box span {
	flex: 1;
}

.submit-btn {
	margin: 30px auto;
	text-align: center;
	background: #9370db;
	color: #fff;
	font-family: Poppins, var(--default-font-family);
	font-size: clamp(1rem, 2.5vw, 20px);
	font-weight: 600;
	padding: 12px 35px;
	border-radius: 50px;
	cursor: pointer;
	width: fit-content;
	transition: background 0.3s ease;
}

.submit-btn:hover {
	background: #7a5bc7;
}

.option-box.correct {
	background-color: #4CAF50 !important;
	color: white !important;
}

.option-box.wrong {
	background-color: #F44336 !important;
	color: white !important;
}

.ID {
	display: flex;
	position: absolute;
	color: grey;
	top: 5%;
	right: 5%;
	font-family: NotoSerifTamilSlanted, var(--default-font-family);
	flex-direction: column;
	font-size: clamp(0.7rem, 2vw, 15px);
	text-align: right;
}

h3 {
	margin: 2px 0;
}

/* Media queries for smaller screens */
@media (max-width: 768px) {
	.subject-quiz {
		flex-direction: column;
		align-items: flex-start;
	}
	.ID {
		position: static;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 5px;
	}
}

@media (max-width: 480px) {
	.option-box {
		font-size: clamp(0.8rem, 2.2vw, 18px);
		padding: 10px 15px;
	}
	.submit-btn {
		font-size: clamp(0.9rem, 2vw, 18px);
		padding: 10px 25px;
	}
	.quizify {
		font-size: clamp(1.5rem, 6vw, 40px);
	}
	.question-title {
		font-size: clamp(1rem, 3.5vw, 22px);
	}
}
`}</style>


			<div className="main-container">
				<span className="quizify">Quizify
					<div className="ID">

						<h3>{uname}</h3>
						<h3>{inst}</h3>
					</div>

				</span>

				<span className="subject-quiz">
					{getSubjectDisplay(subject).toUpperCase()} QUIZ
					<span className="timer">{formatTime(timeLeft)}</span>
				</span>

				{error && <p style={{ color: "red" }}>{error}</p>}
				{loading && <p>Loading questions...</p>}

				{questions.map((q, i) => (
					<div key={i}>
						<span className="question-title">
							{i + 1}. {q.question}
						</span>

						{(["a", "b", "c", "d"] as (keyof Question)[]).map((opt) => {
							let extraClass = "";
							if (submitted) {
								if (answers[i] === opt) {
									if (opt === q.answer[0]) extraClass = "correct";
									else extraClass = "wrong";
								} else if (opt === q.answer[0]) {
									extraClass = "correct";
								}
							} else if (answers[i] === opt) {
								// ✅ Highlight selected answer before submit
								extraClass = "selected";
							}
							return (
								<div
									key={opt}
									className={`option-box ${extraClass}`}
									onClick={() => handleSelect(i, opt)}
								>
									<input
										type="radio"
										name={`q${i}`}
										value={opt}
										checked={answers[i] === opt}
										disabled={submitted}
										readOnly
									/>
									<span>
										{opt}) {q[opt]}
									</span>
								</div>
							);
						})}
					</div>
				))}

				{!submitted && questions.length > 0 && (
					<div className="submit-btn" onClick={handleSubmit}>
						Submit Quiz
					</div>
				)}

				{submitted && (
					<div className="submit-btn" onClick={() => setStage("results")}>
						View Results
					</div>
				)}
			</div>
		</>
	);
}
