import React from 'react';
import Navbar from '../../components/navbar/navbar';

interface LayoutProps {
	children: JSX.Element,
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<body className={"flex flex-col h-100vh"}>
			<div className={"h-1/6"}>
				<Navbar />
			</div>
			<div>
				{children}
			</div>
		</body>
	)

}

export default Layout;
