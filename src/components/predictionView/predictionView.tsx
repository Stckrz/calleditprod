'use client'
import React, { SetStateAction, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IPrediction } from 'src/models/predictionmodels';
import VoteScale from 'components/votescale/votescale';
import TimeScale from 'components/timescale/timescale';
import ThisOrThat from 'components/common/thisOrThat/thisOrThat';
import CommentFeed, { CommentFeedType } from 'components/commentfeed/commentfeed';
import { updatePrediction } from 'src/library/api/predictionfetch';
import { userScoreIncrement } from 'src/library/api/userfetch';
import { Link } from 'react-router-dom';

export enum Mode {
	Voting,
	Confirming
}

interface PredictionProps {
	item: IPrediction
	mode: Mode,
	reload: boolean,
	setReload: React.Dispatch<SetStateAction<boolean>>
}

const Prediction: React.FC<PredictionProps> = ({ item, mode, reload, setReload }) => {
	const [cookie] = useCookies(['userInfo']);
	const [commentView, setCommentView] = useState(false);

	const updatePredictionResult = (result: boolean) => {
		const updatedData = {
			authorPredictionConfirmed: result
		}
		if (item._id) {
			updatePrediction(updatedData, item._id, cookie.userInfo?.token)
			for (let votes of item.votes) {
				if (votes.vote === result) {
					userScoreIncrement(votes.id)
				}
			}
			setReload(!reload)
		}
	}

	const modeMarkup = (mode: Mode) => {
		switch (mode) {
			case Mode.Voting:
				return (
					item._id &&
					<div className={"w-full"}>
						<VoteScale
							id={item._id}
							votes={item.votes}
							prediction={item}
						/>
						<div className={"w-full select-none"}>
							<div className={"cursor-pointer"} onClick={() => { setCommentView(!commentView) }}>
								{`show comments (${item.comments?.length})`}
							</div>
							{item._id && commentView &&
								<CommentFeed commentFeedType={CommentFeedType.PostComment} parentId={item?._id} />
							}
						</div>
					</div>
				)
			case Mode.Confirming:
				return (
					<div>
						<div>Did this happen?</div>
						<ThisOrThat callback={updatePredictionResult} />
					</div>
				)
		}
	}

	return (
		<>
			<div className={"flex flex-col w-full items-start justify-evenly gap-2 md:gap-1 p-6 md:m-1 border border-gray-200 rounded-md shadow-lg shadow-gray-400 bg-gray-100"}>
				<div className={"w-full flex flex-col gap-2"}>
					<div className={"flex flex-col md:flex-row justify-between items-start md:items-center w-full"}>
						<div className={"w-full text-md md:text-xl text-wrap break-words font-semibold"}>
							{item.title}
						</div>
						<Link to={`/profile/${item.author}`}>
							<div>
								{item.author}
							</div>
						</Link>
					</div>
					<div className={"text-sm"}>
						{item.category}
					</div>
					<div className={"border p-1 md:m-2 border-gray-300 w-full rounded"}>
						{item.description}
					</div>
				</div>
				<div className={"flex items-center justify-center gap-2 w-full"}>
					{item.created_on && item.finished_on && item.completed !== undefined &&
						<TimeScale
							title={item.title}
							timeCreated={item.created_on}
							timeFinished={item.finished_on}
							completed={item.completed}
						/>
					}
				</div>
				{modeMarkup(mode)}

				{/* <div className={"w-full select-none"}> */}
				{/* 	<div onClick={() => { setCommentView(!commentView) }}> */}
				{/* 		{`show comments (${item.comments?.length})`} */}
				{/* 	</div> */}
				{/* 	{item._id && commentView && */}
				{/* 		<CommentFeed predictionId={item?._id} /> */}
				{/* 	} */}
				{/* </div> */}
			</div>
		</>
	)
}
export default Prediction;
