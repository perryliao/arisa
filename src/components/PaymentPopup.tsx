import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class PaymentPopup extends EnhancedComponent<IPaymentPopupProps, IPaymentPopupState> {

	public static defaultProps: IPaymentPopupProps = {
		...EnhancedComponent.defaultProps,
		toggle: false,
	};

	protected constructor(props: IPaymentPopupProps) {
		super(props);
		this.state = {
			...this.state,
			toggle: this.props.toggle,
		}
	}

	public render(): ReactNode {
		return (
			<div/>
		);
	}
}

interface IPaymentPopupProps extends IEnhancedComponentProps {
	toggle: boolean;
}

interface IPaymentPopupState extends IEnhancedComponentState {
	toggle: boolean;
}

export {PaymentPopup, IPaymentPopupProps, IPaymentPopupState};
