'use client'
import React, { useState } from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import UserNav, { MenuType } from 'components/usernav/usernav';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useViewport } from 'hooks/useViewport'
import { AiOutlineHome } from 'react-icons/ai';
import logo from 'src/assets/Calledit!.svg';

const Navbar: React.FC = () => {
	const [mobileNavShown, setMobileNavShown] = useState(false)
	const width = useViewport();

	return (
		<>
			{width.width <= 800
				? <div className={"h-1/12 flex items-center justify-between border border-b-gray-500 bg-cyan-500 relative z-50"}>
					<div className={"m-5"} onClick={() => { setMobileNavShown(!mobileNavShown) }}>
						<RxHamburgerMenu size={"2em"} />
					</div>
					<div className={"self-center justify-self-center"}>
						<img src={logo} height={"50%"} width="50%" />
					</div>
					<div className={"h-1/6 bg-cyan-500 flex items-center justify-center"}>
						<UserNav />
					</div>
					{mobileNavShown &&
						<div className={"h-screen w-full absolute top-20 bg-background-gray flex flex-col p-1"}>
							<Link to="/">
								<div
									onClick={() => { setMobileNavShown(false) }}
									className={"p-4 m-1 bg-cyan-500 border border-black flex items-center justify-center rounded"}
								>
									<AiOutlineHome size={"1.5em"} />
									Home
								</div>
							</Link>
							<Link to="newPrediction">
								<div
									onClick={() => { setMobileNavShown(false) }}
									className={"p-4 m-1 bg-cyan-500 border border-black flex items-center justify-center rounded"}
								>
									New
								</div>
							</Link>
							{/* <UserNav /> */}
						</div>

					}
				</div>
				: <div className={"h-1/12 flex items-center justify-between border border-b-gray-500 bg-cyan-500 p-2"}>
					<div>
						<div
							className={"h-full w-112 bg-cyan-500 flex items-center justify-center rounded"}>
							<Link to="/">
								<div className={"flex flex-col items-center justify-center font-bold"}>
									<div>
										<img src={logo} height={"50%"} width="50%" />
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className={"w-auto h-full bg-cyan-500 flex items-center justify-center rounded"}>
						<Link to="/newPrediction">
							<div className={"flex items-center justify-center bg-cyan-800 rounded w-20 btn-primary"}>
								New
							</div>
						</Link>
					</div>
					<div className={"h-full w-112 bg-cyan-500 flex items-center justify-center rounded"}>
						<UserNav />
					</div>
				</div>
			}
		</>
	)
}

export default Navbar
