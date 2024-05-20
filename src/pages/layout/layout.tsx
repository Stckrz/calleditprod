import React from 'react';
import Navbar from 'components/navbar/navbar';

interface LayoutProps {
	children: JSX.Element,
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={"flex flex-col h-full"}>
			<div className={"relative"}>
				<Navbar />
			</div>
			<div className={"flex flex-grow absolute top-20 w-full"}>
				<div className={"flex flex-grow w-full"}>
					{children}
				</div>
			</div>
		</div>
	)

}

export default Layout;
