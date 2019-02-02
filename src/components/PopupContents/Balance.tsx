import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import "../../App.css";
import {Button} from "reactstrap";

class Balance extends EnhancedComponent<IBalanceProps, IBalanceState> {

	public static defaultProps: IBalanceProps = {
		...EnhancedComponent.defaultProps,
		myPoints: 42069,
		addedPoints: "15000",
	};


	protected constructor(props: IBalanceProps) {
		super(props);
		this.state = {
			...this.state,
		};

		this.callFn = this.callFn.bind(this);
	}

	private callFn(): void {
		this.props.onClick();
		this.props.callDone();
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<div className={"alignRight"}>
					<p className={"BestBuyBlack popupHeaderText"}>Balance</p>
					<div style={{alignItems: "flex-start"}}>
						<p style={{fontWeight: 500, fontSize: 24}}>{"   " + this.props.myPoints.toString() + " Pts"}</p>
						<p style={{fontSize: 24, fontWeight: 300}}>{"-" + this.props.addedPoints.toString() + " Pts"}</p>
						<hr/>
						<p style={{fontWeight: 500, fontSize: 24}}>{"   " + (this.props.myPoints - parseInt(this.props.addedPoints, 10)).toString() + " Pts"}</p>
						<p style={{fontSize: 14}}> remaining</p>
					</div>
				</div>
				<div style={{height: 15}}/>
				<Button className={"jerryButton"} onClick={this.callFn}>Done</Button>{' '}
			</div>
		);
	}
}

interface IBalanceProps extends IEnhancedComponentProps {
	myPoints: number;
	addedPoints: string;
	onClick?: () => void;
	callDone?: () => void;
}

interface IBalanceState extends IEnhancedComponentState {

}

export {Balance, IBalanceProps, IBalanceState};
