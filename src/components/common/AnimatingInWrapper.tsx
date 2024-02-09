import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface AnimagtingWrapperProps {
	children: React.ReactNode;
}
const AnimatingWrapper = ({ children }: AnimagtingWrapperProps) => {
	// const { pathname } = useLocation();
	const nodeRef = useRef(null);
	return (
		<TransitionGroup className={"page relative"}>
			<CSSTransition
				key={window.location.href}
				timeout={2000}
				unmountOnExit
				classNames={"page-transition"}
				nodeRef={nodeRef}
			>
				<div ref={nodeRef}>{children}</div>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default AnimatingWrapper;
