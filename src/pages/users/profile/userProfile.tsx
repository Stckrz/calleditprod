import React, { useEffect, useState } from 'react';
import { getUserByUsername } from 'src/library/api/userfetch';
import { IUser, iUserInitial } from 'src/models/usermodels';
import PredictionFeed, { FeedType } from 'components/predictionFeed/predictionFeed';
import UserStats from 'components/userstats/userstats';
import { useParams } from 'react-router-dom';
import Layout from 'src/pages/layout/layout';

const UserProfile: React.FC = () => {
	const username = useParams();
	const [user, setUser] = useState<IUser>(iUserInitial)

	async function getUserData() {
		if (username.username !== undefined) {
			setUser(await getUserByUsername(username.username))
		}
	}
	// votes userposts
	useEffect(() => {
		getUserData()
	}, [username])

	return (
		<>
			<Layout>
				<div className={"h-full w-full flex items-center justify-center border-cinna"}>
					{user.username ?
						<div className={"flex justify-between w-full h-full overflow-auto"}>
							<UserStats user={user} />
							<div className={"flex flex-col flex-grow"}>
								<PredictionFeed username={user.username} feedType={FeedType.UserFeed} />
							</div>
						</div>
						: <div>user not found..</div>
					}
				</div>
			</Layout>
		</>
	)
}
export default UserProfile;
