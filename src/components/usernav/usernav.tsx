'use client'
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import UserIcon from 'components/userIcon/userIcon';

const UserNav: React.FC = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['userInfo'])

	useEffect(() => { }, [cookie])
	return (
		<>
			{
				!cookie.userInfo?.username
					? <div className={"w-44 flex mr-2 items-center justify-between"}>
						<Link to="/login">
							<button className={"w-20 btn-primary bg-transparent border border-white p-2"}>
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
