import React from 'react';
import { useCookies } from 'react-cookie';
import PredictionFeed, { FeedType } from 'components/predictionFeed/predictionFeed';
import Layout from 'src/pages/layout/layout';

const Dashboard: React.FC = () => {

	const [cookie, setCookie] = useCookies(['userInfo'])
	return (
		<>
			<Layout>
				<div className={"flex flex-col items-center justify-center w-full self-center"}>
					{cookie.userInfo
						? <div className={"w-full flex flex-col items-center justify-center"}>
							<PredictionFeed username={cookie.userInfo?.username} feedType={FeedType.ConfirmPrediction} />
						</div>
						: <div>No user currently logged in</div>
					}
				</div>
			</Layout>
		</>
	)
}

export default Dashboard
