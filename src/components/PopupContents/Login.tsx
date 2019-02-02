import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import {TextInput} from "../TextInput";
import {Button} from "reactstrap";
import "../../App.css";
import {Container} from "../../containers/Container";

class Login extends EnhancedComponent<ILoginProps, ILoginState> {

	public static defaultProps: ILoginProps = {
		...EnhancedComponent.defaultProps,
	};

	private nameRef: TextInput;
	private passwordRef: TextInput;

	protected constructor(props: ILoginProps) {
		super(props);
		this.state = {
			...this.state,
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.saveNameRef = this.saveNameRef.bind(this);
		this.savePasswordRef = this.savePasswordRef.bind(this);
	}

	private handleLogin(callback: () => void): () => void {
		return(() => {
			// validate...
			let attempt: boolean = false;
			if (!attempt) {
				// retry login
				console.log(attempt);
				if (this.nameRef && this.passwordRef && this.props.login) {
					this.props.login(this.nameRef.getText(), this.passwordRef.getText())
						.then((res: any) => {
							console.log(res);
						}).catch((err: any) => {
							console.log(err);
					})
				}
			}
			callback();
		});
	}

	private saveNameRef(ref: TextInput): void {
		this.nameRef = ref;
	}

	private savePasswordRef(ref: TextInput): void {
		this.passwordRef = ref;
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<img src={"rbc_icon.png"}/>
				<p className={"BestBuyBlack popupHeaderText"}>Login to RBC</p>
				<TextInput ref={this.saveNameRef} placeholder={"Name"}/>
				<TextInput ref={this.savePasswordRef} placeholder={"Password"} secureText={true}/>
				<div style={{height: 15}}/>
				<Button className={"jerryButton"} onClick={this.handleLogin(this.props.onClick)} >Login</Button>{' '}
			</div>
		);
	}
}

interface ILoginProps extends IEnhancedComponentProps {
	onClick?: () => void;
	login?: (username: string, password: string) => Promise<boolean>;
}

interface ILoginState extends IEnhancedComponentState {

}

export {Login, ILoginProps, ILoginState};
