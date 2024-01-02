import { ReactNode } from "react";
import ReactDOM from "react-dom";

type childrenProp = {
	children: ReactNode;
};

const Portal = ({ children }: childrenProp) => {
	const portalEl = document.getElementById("portal") as HTMLElement;
	return ReactDOM.createPortal(children, portalEl);
};

export default Portal;
