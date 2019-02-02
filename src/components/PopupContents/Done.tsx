import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import {TextInput} from "../TextInput";
import {Button} from "reactstrap";
import "../../App.css";

class Done extends EnhancedComponent<IDoneProps, IDoneState> {

	public static defaultProps: IDoneProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: IDoneProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<div style={{height: 15}}/>
				<img src={"bestbuydark.png"} height={"auto"} width={"90%"}/>
				<div style={{height: 15}}/>
				<p className={"BestBuyBlack popupHeaderText"}>Thank you!</p>
				<p style={{fontWeight: 500, fontSize: 24}}>We hope to see you again!</p>
				<div style={{height: 30}}/>
				<Button className={"jerryButton"} onClick={this.props.onClick} >Done</Button>{' '}
			</div>
		);
	}
}

interface IDoneProps extends IEnhancedComponentProps {
	onClick?: () => void;
}

interface IDoneState extends IEnhancedComponentState {

}

export {Done, IDoneProps, IDoneState};
