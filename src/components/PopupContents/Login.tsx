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

	private name: string;
	private password: string;

	protected constructor(props: ILoginProps) {
		super(props);
		this.state = {
			...this.state,
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.saveName = this.saveName.bind(this);
		this.savePassword = this.savePassword.bind(this);
	}

	private handleLogin(): void {
		// validate...
		if (this.name && this.password && this.props.login) {
			this.props.login(this.name, this.password)
				.then((res: boolean) => {
					if (res) {
						this.props.onClick();
						if (this.props.balancePopupFn) {
							this.props.balancePopupFn();
						}
					} else {
						// login failed
						alert("Wrong credentials, please try again.")
					}
				})
		} else {
			alert("Please complete all fields.")
		}
	}

	private saveName(event: any): void {
		this.name = event;
	}

	private savePassword(event: any): void {
		this.password = event;
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<img width={this.props.imageSrc && "70%"} src={this.props.imageSrc ? this.props.imageSrc : "rbc_icon.png"}/>
				<p className={"BestBuyBlack popupHeaderText"}>{this.props.title ? this.props.title : "Login to RBC"}</p>
				<TextInput inputProps={{onChange: this.saveName}} placeholder={"Name"}/>
				<TextInput inputProps={{onChange: this.savePassword}} placeholder={"Password"} secureText={true}/>
				<div style={{height: 15}}/>
				<Button className={"jerryButton"} onClick={this.handleLogin} >Login</Button>{' '}
			</div>
		);
	}
}

interface ILoginProps extends IEnhancedComponentProps {
	onClick?: () => void;
	imageSrc?: string;
	title?: string;
	login?: (username: string, password: string) => Promise<boolean>;
	balancePopupFn?: () => void;
}

interface ILoginState extends IEnhancedComponentState {

}

export {Login, ILoginProps, ILoginState};
