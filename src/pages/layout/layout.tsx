import React from 'react';
import Navbar from '../../components/navbar/navbar';

interface LayoutProps {
	children: JSX.Element,
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		// <body className={"flex flex-col"}>
		// <div className={"flex flex-col h-screen w-screen"}> 
		<div className={"flex flex-col"}>
			<div>
				<Navbar />
			</div>
			<div className={"flex flex-grow"}>
				{children}
			</div>
		</div>
	)

}

export default Layout;
