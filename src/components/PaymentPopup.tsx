import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class PaymentPopup extends EnhancedComponent<IPaymentPopupProps, IPaymentPopupState> {

	public static defaultProps: IPaymentPopupProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: IPaymentPopupProps) {
		super(props);
		this.state = {
			...this.state,
		}
	}

	public render(): ReactNode {
		return (
			<div/>
		);
	}
}

interface IPaymentPopupProps extends IEnhancedComponentProps {

}

interface IPaymentPopupState extends IEnhancedComponentState {

}

export {PaymentPopup, IPaymentPopupProps, IPaymentPopupState};
