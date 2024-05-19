import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import UserIcon from 'components/userIcon/userIcon';

const UserNav: React.FC = () => {
	const [cookie, removeCookie] = useCookies(['userInfo'])

	useEffect(() => { }, [cookie])

		// className={"p-4 m-1 bg-cyan-500 border border-black flex items-center justify-center rounded"}
	
	return (
		<>
			{
				!cookie.userInfo?.username
					? <div className={"w-44 flex mr-2 items-center justify-between flex-row"}>
						<Link to="/login">
							<button className={"w-20 btn-primary bg-transparent border border-white p-2"}>
							{/* <button className={"p-4 w-full m-1 bg-cyan-500 border border-black flex items-center justify-center rounded md:m-0 md:w-20 md:btn-primary md:bg-transparent md:border-white md:p-2"}> */}
								Login
							</button>
						</Link>
						<Link to="/register">
							<div className={"w-20 rounded btn-primary bg-white text-cyan-500 p-2 m-0"}>
								Sign Up
							</div>
						</Link>
					</div>
					: <div className={"flex gap-3"}>
						<div className={"flex font-semibold items-center justify-center"}>
							<Link to="/dashboard">
								<div className={"flex items-center justify-center font-semibold"}>
									<UserIcon username={cookie.userInfo.username} />
								</div>
							</Link>
						</div>
						<div>
							<Link to="/logout">
								<div
									className={"w-20 flex items-center justify-center btn-primary bg-transparent border border-white p-2"}
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
