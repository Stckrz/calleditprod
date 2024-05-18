import React, { useEffect } from 'react';
// import ProgressBar from 'components/common/progressBar/progressBar';
import Timer from 'components/common/timer/timer';
import { FiClock } from 'react-icons/fi';

interface TimeScaleProps {
	title?: string,
	timeCreated?: string,
	timeFinished: string,
	completed: boolean
}
const TimeScale: React.FC<TimeScaleProps> = ({ timeFinished, completed }) => {

	const finishedDate = new Date(timeFinished);

	//all of this is here in order to get a percentage value of time remaining. it was a progress bar, but i didn't like having two..
	//Ideally, i'll maybe create a circular progress bar in the future, so i want to keep this code here for now.
	// const [timeProgress, setTimeProgress] = useState(0);
	// const createdDate = new Date(timeCreated);

	// const totalPredictionTime = finishedDate.getTime() - createdDate.getTime();

	//gets the percentage of time that has passed between the time the prediction was created, and the time it will finish.
	// const getTimeProgress = () => {
	// 	const currentDate = new Date();
	// 	const timePassed = currentDate.getTime() - createdDate.getTime();
	// 	const timePassedPercent = (timePassed / totalPredictionTime) * 100;
	// 	if (timePassedPercent <= 100) {
	// 		setTimeProgress(timePassedPercent);
	// 	} else {
	// 		setTimeProgress(100);
	// 	}
	// };

	useEffect(() => {
		// getTimeProgress();
	}, []);

	return (
		<>
			<div className={"flex flex-col w-full"}>
				{!completed
					? <div>
						{/* <ProgressBar ratio={timeProgress} /> */}
						<div className={"flex items-center gap-2 w-full justify-center"}>
							<FiClock />
							<div><Timer dateCompleted={finishedDate} /></div>
						</div>
					</div>
					: <div>Timer completed</div>
				}
			</div>
		</>
	);
};

export default TimeScale;
