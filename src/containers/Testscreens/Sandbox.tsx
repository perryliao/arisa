import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "../Container";
import {PaymentPopup} from "../../components/PaymentPopup";

class Sandbox extends Container<ISandboxProps, ISandboxState> {
	public static defaultProps: ISandboxProps = {
		...Container.defaultProps,
	};

	private paymentPopup: ReactNode;

	protected constructor(props: ISandboxProps) {
		super(props);

		this.state = {
			...this.state,
			paymentPopupOpen: false,
		};
		this.paymentPopup = <PaymentPopup isOpen={this.state.paymentPopupOpen}/>
	}

	public render(): ReactNode {
		return (
			<div>
				<p>
					asdfsa
				</p>
			</div>
		);
	}
}

interface ISandboxProps extends IContainerProps {
}

interface ISandboxState extends IContainerState {
	paymentPopupOpen: boolean;
}

export {Sandbox, ISandboxProps, ISandboxState};
