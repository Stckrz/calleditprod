import { useState } from "react";
import Layout from "pages/layout/layout";
import { FeedType } from "components/predictionFeed/predictionFeed";
import PredictionFeed from "components/predictionFeed/predictionFeed";

const Home = () => {
	const [category, setCategory] = useState("All")

	return (
		<>
			<Layout>
				<div>
					<div className={"flex flex-col w-full items-center "}>
						<div>{"thats so much better isn't it?"}</div>
						<PredictionFeed modifier={category} feedType={FeedType.Normal} />
					</div>
				</div>
			</Layout>
		</>
	)
}
export default Home;
