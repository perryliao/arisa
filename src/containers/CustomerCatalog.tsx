import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState, PopupModalsEnum} from "./Container";
import {Button} from "reactstrap";

class CustomerCatalog extends Container<ICustomerCatalogProps, ICustomerCatalogState> {
	public static defaultProps: ICustomerCatalogProps = {
		...Container.defaultProps,
	};

	protected constructor(props: ICustomerCatalogProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div>
				<Button onClick={this.props.modalFunction(PopupModalsEnum.LOGIN).toggleFn}>LOGIN</Button>{' '}
				<Button onClick={this.props.modalFunction(PopupModalsEnum.BALANCE).toggleFn}>BALANCE</Button>{' '}
				<Button onClick={this.props.modalFunction(PopupModalsEnum.PROCESSING).toggleFn}>PROCESSING</Button>{' '}
				<Button onClick={this.props.modalFunction(PopupModalsEnum.DONE).toggleFn}>DONE</Button>{' '}
			</div>
		);
	}
}

interface ICustomerCatalogProps extends IContainerProps {

}

interface ICustomerCatalogState extends IContainerState {

}

export {CustomerCatalog, ICustomerCatalogProps, ICustomerCatalogState};
