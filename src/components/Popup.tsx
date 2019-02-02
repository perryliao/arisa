import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";

class Popup extends EnhancedComponent<IPopupProps, IPopupState> {

	public static defaultProps: IPopupProps = {
		...EnhancedComponent.defaultProps,
		reqs: {open: false, toggleFn: () => {}, modalText: "default"},
	};

	protected constructor(props: IPopupProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public componentWillReceiveProps(nextProps: any): void {
		console.log(nextProps);
	}

	public render(): ReactNode {
		return (
			<div>
				<Modal
					isOpen={this.props.reqs.open}
					toggle={this.props.reqs.toggleFn}
				>
					<ModalBody>
						{this.props.reqs.modalText}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.props.reqs.toggleFn}>Confirm</Button>{' '}
						<Button color="secondary" onClick={this.props.reqs.toggleFn}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

interface IPopupProps extends IEnhancedComponentProps {
	reqs: IPopupReqs;
}

interface IPopupState extends IEnhancedComponentState {
}

interface IPopupReqs {
	toggleFn: () => void;
	open: boolean;
	modalText: string;
}

export {Popup, IPopupProps, IPopupState, IPopupReqs};
