import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import "../../App.css";
import {TextInput} from "../TextInput";
import {Button} from "reactstrap";

class Balance extends EnhancedComponent<IBalanceProps, IBalanceState> {

	public static defaultProps: IBalanceProps = {
		...EnhancedComponent.defaultProps,
		myPoints: 42069,
		addedPoints: 15000,
	};


	protected constructor(props: IBalanceProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<div className={"alignRight"}>
					<p className={"BestBuyBlack popupHeaderText"}>Balance</p>
					<div style={{alignItems: "flex-start"}}>
						<p style={{fontWeight: 500}}>{"   " + this.props.myPoints.toString() + " Pts"}</p>
						<p>{"-" + this.props.addedPoints.toString() + " Pts"}</p>
						<hr/>
						<p style={{fontWeight: 500}}>{"   " + (this.props.myPoints - this.props.addedPoints).toString() + " Pts"}</p>
						<p style={{fontSize: 8}}> remaining</p>
					</div>
				</div>
				<div style={{height: 15}}/>
				<Button className={"jerryButton"} onClick={this.props.onClick}>Login</Button>{' '}
			</div>
		);
	}
}

interface IBalanceProps extends IEnhancedComponentProps {
	myPoints: number;
	addedPoints: number;
	onClick?: () => void;
}

interface IBalanceState extends IEnhancedComponentState {

}

export {Balance, IBalanceProps, IBalanceState};
