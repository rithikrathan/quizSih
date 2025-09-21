import React, { useState } from "react";
import login from "./components/login";
import subject from "./components/subject";
import quiz from "./components/quiz";
import results from "./components/results";


export default function app() {
	// Aliases:
	const Login = login
	const Quiz = quiz
	const Subject = subject
	const Results = results

	const [stage, setStage] = useState<string>("login");
	const [uname, setUname] = useState<string>("");
	const [institute, setInst] = useState<string>("");
	const [sub, setSub] = useState<string>("")
	const [score, setScore] = useState(0)

	return (
		<div>
			<title>Quiz app lol</title>
			<div>
				{stage === "login" && <Login
					uname={uname}
					setUname={setUname}
					institute={institute}
					setInst={setInst}
					setStage={setStage}
				/>}

				{stage === "subject" && <Subject
					subject={sub}
					setSub={setSub}
					setStage={setStage}
				/>}

				{stage === "quiz" && <Quiz
					subject={sub}
					setStage={setStage}
					setScore={setScore}
					uname={uname}
					inst={institute}
				/>}

				{stage === "results" && < Results
					setStage={setStage}
					score={score}
					subject={sub}
					setSub={setSub}
				/>}

			</div>
			<div>
				<p>{uname}</p>
				<p>{institute}</p>
				<p>{sub}</p>
			</div>
		</div>
	);
}
