import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class Searchbar extends EnhancedComponent<ISearchbarProps, ISearchbarState> {

	public static defaultProps: ISearchbarProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: ISearchbarProps) {
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

interface ISearchbarProps extends IEnhancedComponentProps {

}

interface ISearchbarState extends IEnhancedComponentState {

}

export {Searchbar, ISearchbarProps, ISearchbarState};
