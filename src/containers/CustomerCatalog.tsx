import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";

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
			<div/>
		);
	}
}

interface ICustomerCatalogProps extends IContainerProps {

}

interface ICustomerCatalogState extends IContainerState {

}

export {CustomerCatalog, ICustomerCatalogProps, ICustomerCatalogState};
