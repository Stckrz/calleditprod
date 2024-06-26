import { useState } from "react";
import Layout from "pages/layout/layout";
import { FeedType } from "components/predictionFeed/predictionFeed";
import PredictionFeed from "components/predictionFeed/predictionFeed";

const Home = () => {
	const [category] = useState("All")

	return (
		<>
			<Layout>
					<div className={"flex flex-col w-full items-center "}>
						<div>{"thats so much better isn't it?"}</div>
						<PredictionFeed modifier={category} feedType={FeedType.Normal} />
					</div>
			</Layout>
		</>
	)
}
export default Home;
