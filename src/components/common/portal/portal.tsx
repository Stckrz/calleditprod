import React from 'react';
import ReactDOM from 'react-dom';

interface PortalComponentProps {
	children: JSX.Element
}

const PortalComponent: React.FC<PortalComponentProps> = ({ children }) => {
	const portalroot = document.getElementById("portal-root");
	if (!portalroot) {
		console.error("portal not found")
		throw "portal not found"
	} else {
		return ReactDOM.createPortal(
			children,
			portalroot
		)
	}
}
export default PortalComponent;
