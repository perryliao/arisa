import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {Login} from "../components/PopupContents/Login";
import {page} from "../App";

class PartnerLogin extends Container<IPartnerLoginProps, IPartnerLoginState> {

	public static defaultProps: IPartnerLoginProps = {
		...Container.defaultProps,
	};

	protected constructor(props: IPartnerLoginProps) {
		super(props);
		this.state = {
			...this.state,
		};
		this.loginOnClick = this.loginOnClick.bind(this);
	}

	private loginOnClick(): void {
		this.props.changePage(page.ExternalStoreAPIs)();
	}

	public render(): ReactNode {
		return (
			<div className={"CenterAllColumn"}>
				<div style={{marginTop: 30}}/>
				<Login
					login={this.props.loginPartner}
					onClick={this.loginOnClick}
					title={"Partner Login"}
					imageSrc={"bestbuydark.png"}
				/>
			</div>
		);
	}
}

interface IPartnerLoginProps extends IContainerProps {

}

interface IPartnerLoginState extends IContainerState {
}

export {PartnerLogin, IPartnerLoginProps, IPartnerLoginState};
