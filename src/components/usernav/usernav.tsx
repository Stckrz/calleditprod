import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import UserIcon from 'components/userIcon/userIcon';

export enum ScreenType {
	Mobile,
	Desktop
}

interface UserNavProps {
	screenType: ScreenType
}

const UserNav: React.FC<UserNavProps> = ({ screenType }) => {
	const [cookie, removeCookie] = useCookies(['userInfo'])

	useEffect(() => { }, [cookie])

	return (
		<>
			{
				!cookie.userInfo?.username
					? <div
						className={"md:w-44 flex mr-2 items-center justify-between flex-col md:flex-row"}
					>
						<div className={"w-full"}>
							<Link to="/login">
								<div
									className={screenType === ScreenType.Desktop
										? "w-20 btn-primary bg-transparent border border-white p-2"
										: "hamburger-button w-full"}
								>
									Login
								</div>
							</Link>
						</div>
						<div className={"w-full"}>
							<Link to="/register">
								<div
									className={screenType === ScreenType.Desktop
										? "w-20 rounded btn-primary bg-white text-cyan-500 p-2 m-0"
										: "hamburger-button w-full"}
								>
									Sign Up
								</div>
							</Link>
						</div>
					</div>
					: <div className={"flex gap-3 flex-col md:flex-row"}>
						{screenType === ScreenType.Desktop &&
							<div className={"flex font-semibold items-center justify-center"}>
								<Link to="/dashboard">
									<div className={"flex items-center justify-center font-semibold"}>
										<UserIcon username={cookie.userInfo.username} />
									</div>
								</Link>
							</div>
						}
						<div>
							<Link to="/logout">
								<div
									className={screenType === ScreenType.Desktop ? "w-20 flex items-center justify-center btn-primary bg-transparent border border-white p-2" : "hamburger-button"}
									onClick={() => { removeCookie('userInfo', { path: '/' }) }}>
									Logout
								</div>
							</Link>
						</div>
					</div>
			}
		</>
	)
}
export default UserNav;
