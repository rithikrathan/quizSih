import React, { useEffect, useState } from "react";
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

interface args {
	subject: string;
	setStage: (name: string) => void;
	setScore: (value: number) => void;
}

export default function quiz({ subject, setStage, setScore }: args) {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [answers, setAnswers] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const loadQuestions = async () => {
		if (questions.length > 0 || loading) return; // prevent multiple calls
		setLoading(true);
		try {
			const res = await axios.get(`http://localhost:5000/questions/${subject}`);
			setQuestions(res.data);
			setAnswers(Array(res.data.length).fill("")); // initialize answers
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSelect = (qIndex: number, option: string) => {
		const newAnswers = [...answers];
		newAnswers[qIndex] = option;
		setAnswers(newAnswers);
	};

	const handleSubmit = () => {
		let newMark = 0;
		questions.forEach((q, i) => {
			if (answers[i] === q.answer[0]) { // compare selected option with correct one
				newMark++;
			}
		});
		setScore(newMark);
		setSubmitted(true);
	};

	useEffect(() => {
		loadQuestions();
	}, []);

	return (
		<div>
			<h1>quiz</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}

			{questions.length > 0 &&
				questions.map((q, i) => (
					<div
						key={i}
						style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}
					>
						<p>
							<strong>Q{i + 1}:</strong> {q.question}
						</p>
						{["a", "b", "c", "d"].map((opt) => (
							<label key={opt} style={{ display: "block", margin: "3px 0" }}>
								<input
									type="radio"
									name={`q${i}`}
									value={opt}
									disabled={submitted}
									checked={answers[i] === opt}
									onChange={() => handleSelect(i, opt)}
								/>
								{opt}) {q[opt as keyof Question]}
							</label>
						))}

						{submitted && (
							<p style={{ color: answers[i] === q.answer[0] ? "green" : "red" }}>
								Correct Answer: {q.answer}
							</p>
						)}
					</div>
				))}

			{questions.length > 0 && !submitted && (
				<button onClick={handleSubmit}>Submit Quiz</button>
			)}

			{questions.length > 0 && submitted && (
				<button onClick={() => { setStage("results") }}>Results</button>
			)}
			{questions.length === 0 && loading && <p>Loading questions...</p>}
		</div>
	);
}

