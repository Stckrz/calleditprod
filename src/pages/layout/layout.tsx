import React from 'react';
import Navbar from '../../components/navbar/navbar';

interface LayoutProps {
	children: JSX.Element,
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={"flex flex-col h-full"}>
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
