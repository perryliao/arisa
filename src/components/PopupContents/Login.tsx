import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import {TextInput} from "../TextInput";
import {Button} from "reactstrap";

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
			<div>
				<img src={"rbc_icon.png"}/>
				<h1>Login to RBC</h1>
				<TextInput/>
				<TextInput/>
				<Button>Login</Button>{' '}
			</div>
		);
	}
}

interface ILoginProps extends IEnhancedComponentProps {

}

interface ILoginState extends IEnhancedComponentState {

}

export {Login, ILoginProps, ILoginState};
