import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {TextInput} from "../components/TextInput";

class PartnerConfig extends Container<IPartnerConfigProps, IPartnerConfigState> {
	public static defaultProps: IPartnerConfigProps = {
		...Container.defaultProps,
	};

	protected constructor(props: IPartnerConfigProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div>
				<TextInput/>
			</div>
		);
	}
}

interface IPartnerConfigProps extends IContainerProps {

}

interface IPartnerConfigState extends IContainerState {

}

export {PartnerConfig, IPartnerConfigProps, IPartnerConfigState};
