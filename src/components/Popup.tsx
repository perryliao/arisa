import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Modal, ModalBody} from "reactstrap";

class Popup extends EnhancedComponent<IPopupProps, IPopupState> {

	public static defaultProps: IPopupProps = {
		...EnhancedComponent.defaultProps,
		toggleFn: () => {/**/},
	};

	protected constructor(props: IPopupProps) {
		super(props);
		this.state = {
			...this.state,
		};

		// this.toggleModal = this.toggleModal.bind(this);
	}

	public render(): ReactNode {
		return (
			<div>
				<Modal>
					<ModalBody
						isOpen={true}
						toggle={this.props.toggleFn}
					>
						asdf
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

interface IPopupProps extends IEnhancedComponentProps {
	toggleFn: () => void;
}

interface IPopupState extends IEnhancedComponentState {
}

export {Popup, IPopupProps, IPopupState};
