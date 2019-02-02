import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import {TextInput} from "../TextInput";
import {Button} from "reactstrap";
import "../../App.css";

class Login extends EnhancedComponent<ILoginProps, ILoginState> {

	public static defaultProps: ILoginProps = {
		...EnhancedComponent.defaultProps,
	};


	protected constructor(props: ILoginProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
				<img src={"rbc_icon.png"}/>
				<p className={"popupHeaderText"}>Login to RBC</p>
				<TextInput placeholder={"Name"} inputProps={{
					// @ts-ignore
					onChange: (value: string) => {
						console.log(value + "this consolew")
					}}}/>
				<TextInput placeholder={"Password"}/>
				<Button onClick={this.props.onClick} >Login</Button>{' '}
			</div>
		);
	}
}

interface ILoginProps extends IEnhancedComponentProps {
	onClick?: () => void;
}

interface ILoginState extends IEnhancedComponentState {

}

export {Login, ILoginProps, ILoginState};
