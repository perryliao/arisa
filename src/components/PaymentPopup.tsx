import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Modal, ModalBody} from "reactstrap";

class PaymentPopup extends EnhancedComponent<IPaymentPopupProps, IPaymentPopupState> {

	public static defaultProps: IPaymentPopupProps = {
		...EnhancedComponent.defaultProps,
		isOpen: false,
	};

	protected constructor(props: IPaymentPopupProps) {
		super(props);
		this.state = {
			...this.state,
			isOpen: this.props.isOpen,
		};

		this.toggleModal = this.toggleModal.bind(this);
	}

	private toggleModal() {
		this.setState({isOpen: !this.state.isOpen});
	}

	public render(): ReactNode {
		return (
			<div>
				<Modal>
					<ModalBody
						isOpen={this.state.isOpen}
						toggle={this.toggleModal}
					>
						asdf
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

interface IPaymentPopupProps extends IEnhancedComponentProps {
	isOpen: boolean;
}

interface IPaymentPopupState extends IEnhancedComponentState {
	isOpen: boolean;
}

export {PaymentPopup, IPaymentPopupProps, IPaymentPopupState};
