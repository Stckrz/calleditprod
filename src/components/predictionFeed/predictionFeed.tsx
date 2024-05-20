import React, { useState, useEffect } from 'react';
import {
	getPredictions,
	predictionReturnObject,
	getPredictionsByUsername,
	getPredictionsVotedByUsername
} from 'src/library/api/predictionfetch';
import { IPrediction } from 'src/models/predictionmodels';
import { categoryArray } from 'src/library/objects/categoryArray';
import Prediction, { Mode } from 'components/predictionView/predictionView';
import CategoryPicker from 'components/categoryPicker/categoryPicker';
import Dropdown from 'components/common/dropdown/dropdown';
import Pagination from 'components/common/pagination/pagination';
import Loading from 'components/common/loading/loading';

export enum FeedType {
	Normal,
	UserFeed,
	ConfirmPrediction
}

interface PredictionFeedProps {
	username?: string,
	modifier?: string
	feedType: FeedType
}

const PredictionFeed: React.FC<PredictionFeedProps> = ({ username = "", feedType = FeedType.Normal }) => {
	const [category, setCategory] = useState<string>("All");
	const [predictionArray, setPredictionArray] = useState<IPrediction[]>([]);
	const [feedPage, setFeedPage] = useState(1);
	const [predictionCount, setPredictionCount] = useState(0);
	const [reload, setReload] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function setConfirmedPredictionFeed() {
		const tempPredictionArray = []
		let predictionObject: predictionReturnObject = { predictions: [], count: 0 }
		predictionObject = await getPredictions({ username: username })

		for (const i of predictionObject.predictions) {
			i.completed && i.authorPredictionConfirmed === null &&
				tempPredictionArray.push(i)
		}

		setPredictionArray(tempPredictionArray)
		setPredictionCount(predictionObject.count)
	}

	async function predictionFetch() {
		if (feedType === FeedType.ConfirmPrediction) {
			setConfirmedPredictionFeed()
		} else if (feedType === FeedType.UserFeed) {
			if (username) {
				if (category === "votes") {
					const predictionObject = await getPredictionsVotedByUsername({ page: feedPage, username: username })
					setPredictionArray(predictionObject?.predictions)
					setPredictionCount(predictionObject?.count)
				}
				else if (category === "userposts") {
					const predictionObject = await getPredictionsByUsername({ page: feedPage, username: username })
					setPredictionArray(predictionObject?.predictions)
					setPredictionCount(predictionObject?.count)
				} else {
					const predictionObject = await getPredictionsByUsername({ page: feedPage, username: username })
					setPredictionArray(predictionObject?.predictions)
					setPredictionCount(predictionObject?.count)
				}
			}
		} else if (feedType === FeedType.Normal) {
			if (category === "All") {
				const predictionObject = await getPredictions({ page: feedPage })
				setPredictionArray(predictionObject.predictions)
				setPredictionCount(predictionObject.count)
			} else {
				const predictionObject = await getPredictions({ category: category, page: feedPage })
				setPredictionArray(predictionObject.predictions)
				setPredictionCount(predictionObject.count)
			}
		}
		setIsLoading(false)
	}

	const categoryMarkup = (feedType: FeedType) => {
		switch (feedType) {
			case FeedType.Normal:
				return (
					<CategoryPicker
						setCategory={setCategory}
						category={category}
						categories={categoryArray}
					/>
				)
			case FeedType.UserFeed:
				return (
					<Dropdown
						callback={setCategory}
						value={category}
						options={["votes", "userposts"]}
					/>
				)
			case FeedType.ConfirmPrediction:
				return (
					<div></div>
				)
		}
	}

	useEffect(() => {
		predictionFetch()
	}, [category, feedPage, reload])

	if (isLoading) {
		return (
			<Loading />
		)
	}

	return (
		<>
			<div className={"flex flex-col gap-2 w-5/6 md:w-1/2 self-center"}>
				{categoryMarkup(feedType)}
				{predictionArray?.length > 0
					? <div className={"flex flex-col items-center md:items-end gap-2"}>
						<Pagination
							setPage={setFeedPage}
							page={feedPage}
							entryCount={predictionCount}
							entryLimit={10}
						/>
						{predictionArray.map((item) => {
							return (
								<Prediction
									key={item._id}
									item={item}
									mode={feedType === FeedType.ConfirmPrediction ? Mode.Confirming : Mode.Voting}
									reload={reload}
									setReload={setReload}
								/>
							)
						})
						}
					</div>
					: <div>Nothing to show...</div>
				}
			</div>
		</>
	)
}

export default PredictionFeed
