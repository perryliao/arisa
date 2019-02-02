import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class CatalogItem extends EnhancedComponent<ICatalogItemProps, ICatalogItemState> {

	public static defaultProps: ICatalogItemProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: ICatalogItemProps) {
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

interface ICatalogItemProps extends IEnhancedComponentProps {

}

interface ICatalogItemState extends IEnhancedComponentState {

}

export {CatalogItem, ICatalogItemProps, ICatalogItemState};
