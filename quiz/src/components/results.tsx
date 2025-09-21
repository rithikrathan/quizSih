import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

interface Args {
	setStage: (name: string) => void;
	score: number;
	subject: string;
	setSub: (name: string) => void;
}

export default function Results({ setStage, score, subject, setSub }: Args) {
	const totalQuestions = 10;
	const percentage = Math.round((score / totalQuestions) * 100);
	const incorrect = totalQuestions - score;

	const handleButtons = () => {
		setSub("");
		setStage("subject");
	};

	const getSubjectDisplay = (subject: string) => {
		switch (subject.toLowerCase()) {
			case "coa": return "Computer Organisation and Architecture";
			case "ajp": return "Advanced Java Programming";
			case "mpmc": return "Microprocessor and Microcontroller";
			case "dsa": return "Datastructures and Algorithms";
			default: return subject;
		}
	};

	const data = [
		{ name: "Correct", value: score },
		{ name: "Incorrect", value: incorrect },
	];
	const COLORS = ["#9370db", "#F44336"];

	return (
		<>
			<style>{`
				:root {
					--default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
					Ubuntu, "Helvetica Neue", Helvetica, Arial, sans-serif;
				}
				#root, body {
					width: 100%;
					margin:0; padding:0;
					background:#e5e5e5;
					font-family: var(--default-font-family);
				}
				.main-container { 
					display:flex; flex-direction: column; align-items: center;
					width: 100%; padding: 20px 0;
				}
				.quizify {
					color:#9370db; font-family:NotoSerifTamilSlanted, var(--default-font-family);
					font-size: clamp(3rem, 8vw, 80px);
					font-weight:800; text-align:center; margin-bottom: 30px;
				}
				.frame {
					display: flex; flex-direction: row; align-items: flex-start;
					justify-content: space-between; gap: 50px;
					width: 90%; max-width: 900px; padding: 40px;
					background:#fff; border-radius: 40px;
					text-align: left;
				}
				.stats {
					display:flex; flex-direction: column; gap: 20px; flex:1;
				}
				.marks, .percentage, .correct-questions, .wrapper-3 {
					font-size: clamp(18px, 3vw, 36px); font-weight:600; color:#000;
				}
				.marks-label, .percentage-label, .correct-questions-label, .text-7 { color:#9370db; }
				.pie-chart-container {
					flex:1; display:flex; justify-content:center; align-items:center;
				}
				.box-group {
					display:flex; justify-content:center; gap:20px; flex-wrap: wrap; margin: 30px 0;
				}
				.btn {
					background: #9370db; color:#fff; font-size: clamp(16px, 3vw, 26px);
					font-weight:700; padding: 15px 40px; border:none; border-radius: 60px;
					cursor:pointer; transition:0.3s;
				}
				.btn:hover { background:#7a5bc7; }
				.subject {
					font-size: clamp(20px, 4vw, 40px); font-weight:800; color:#727272;
					text-align:left; margin-bottom: 20px;
				}
				@media (max-width: 900px) {
					.frame {
						flex-direction: column;
						align-items: center;
						text-align: center;
						padding: 30px;
					}
					.pie-chart-container { margin-top:20px; }
					.stats { align-items: center; }
					.subject { text-align:center; }
				}
				@media (max-width: 480px) {
					.frame { width: 95%; padding: 20px; gap: 20px; }
					.box-group { gap: 10px; }
				}
			`}</style>

			<div className="main-container">
				<span className="quizify">Quizify</span>

				<div className="frame">
					<div className="stats">
						<span className="subject">{getSubjectDisplay(subject)}</span>

						<div className="marks">
							<span className="marks-label">Marks: </span>
							<span className="marks-value">{score}/{totalQuestions}</span>
						</div>
						<div className="percentage">
							<span className="percentage-label">Percentage: </span>
							<span className="percentage-value">{percentage}%</span>
						</div>
						<div className="correct-questions">
							<span className="correct-questions-label">Correct Questions: </span>
							<span className="text-6">{score}</span>
						</div>
						<div className="wrapper-3">
							<span className="text-7">Incorrect Questions: </span>
							<span className="text-8">{incorrect}</span>
						</div>
					</div>

					<div className="pie-chart-container">
						<PieChart width={250} height={250}>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={50}
								outerRadius={100}
								paddingAngle={5}
								dataKey="value"
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Legend />
						</PieChart>
					</div>
				</div>

				<div className="box-group">
					<button className="btn" onClick={handleButtons}>Select Subject</button>
					<button className="btn" onClick={() => setStage("quiz")}>Attempt Again</button>
				</div>
			</div>
		</>
	);
}
