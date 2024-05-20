import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserNav, { ScreenType } from 'components/usernav/usernav';
import { useViewport } from 'hooks/useViewport'
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineHome } from 'react-icons/ai';
import logo from 'src/assets/Calledit!.svg';
import { useCookies } from 'react-cookie';
import UserIcon from '../userIcon/userIcon';


const Navbar: React.FC = () => {
	const [mobileNavShown, setMobileNavShown] = useState(false)
	const width = useViewport();
	const [cookie] = useCookies(["userInfo"])

	return (
		<>
			{width.width <= 800
				? <div className={"h-1/12 w-full flex border border-b-gray-500 bg-cyan-500 fixed z-50"}>
					<div className={"flex items-center justify-start w-full"}>
						<div className={"m-5"} onClick={() => { setMobileNavShown(!mobileNavShown) }}>
							<RxHamburgerMenu size={"2em"} />
						</div>
						<Link to="/">
							<div>
								<img src={logo} height={"50%"} width="50%" />
							</div>
						</Link>
					</div>
					{cookie.userInfo.username !== undefined &&
						<Link to="/dashboard">
							<div className={"flex self-center"}>
								<UserIcon username={cookie.userInfo.username} />
							</div>
						</Link>
					}
					{mobileNavShown &&
						<div className={"h-screen w-full fixed top-16 bg-background-gray flex flex-col p-1"}>
							<Link to="/">
								<div
									onClick={() => { setMobileNavShown(false) }}
									className={"hamburger-button"}
								>
									<AiOutlineHome size={"1.5em"} />
									Home
								</div>
							</Link>
							<Link to="/newPrediction">
								<div
									onClick={() => { setMobileNavShown(false) }}
									className={"hamburger-button"}
								>
									New
								</div>
							</Link>
							<UserNav screenType={ScreenType.Mobile} />
						</div>

					}
				</div>
				: <div className={"h-1/12 w-full flex items-center justify-start border border-b-gray-500 bg-cyan-500 p-2"}>
					<div className={"w-1/3"}>
						<div
							className={"h-full w-112 bg-cyan-500 flex items-center justify-start rounded"}>
							<Link to="/">
								<div className={"flex flex-col items-center justify-center font-bold"}>
									<div>
										<img src={logo} height={"50%"} width="50%" />
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className={"w-1/3 bg-cyan-500 flex items-center justify-center rounded left-1/2"}>
						<Link to="/newPrediction">
							<div className={"flex items-center justify-center bg-cyan-800 rounded w-20 btn-primary"}>
								New
							</div>
						</Link>
						{cookie.userInfo?.roles?.includes("admin") &&
						<Link to="/admin">
							<div className={"flex items-center justify-center bg-cyan-300 rounded w-20 btn-primary"}>
								Admin
							</div>
						</Link>
						}
					</div>
					<div className={"h-full w-1/3 bg-cyan-500 flex items-center justify-end rounded"}>
						<UserNav screenType={ScreenType.Desktop} />
					</div>
				</div>
			}
		</>
	)
}

export default Navbar
