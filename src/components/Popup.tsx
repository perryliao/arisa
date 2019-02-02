import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {Container} from "../containers/Container";

class Popup extends EnhancedComponent<IPopupProps, IPopupState> {

	public static defaultProps: IPopupProps = {
		...EnhancedComponent.defaultProps,
		reqs: {open: false, toggleFn: () => {}, component: {}},
		modalClassName: "",
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
					className={this.props.modalClassName}
				>
					<ModalBody>
						{this.props.reqs.component}
					</ModalBody>
					{/*<ModalFooter>*/}
						{/*<Button className=".BestBuyBlue" onClick={this.props.reqs.toggleFn}>Confirm</Button>{' '}*/}
						{/*<Button color="secondary" onClick={this.props.reqs.toggleFn}>Cancel</Button>*/}
					{/*</ModalFooter>*/}
				</Modal>
			</div>
		);
	}
}

interface IPopupProps extends IEnhancedComponentProps {
	reqs?: IPopupReqs;
	modalClassName?: string;
}

interface IPopupState extends IEnhancedComponentState {
}

interface IPopupReqs {
	toggleFn: () => void;
	open: boolean;
	component: ReactNode;
	rounded?: boolean;
}

export {Popup, IPopupProps, IPopupState, IPopupReqs};
