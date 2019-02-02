import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "../Container";

class Sandbox extends Container<ISandboxProps, ISandboxState> {
	public static defaultProps: ISandboxProps = {
		...Container.defaultProps,
	};

	protected constructor(props: ISandboxProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div>
				<p>
					asdfsa
				</p>
			</div>
		);
	}
}

interface ISandboxProps extends IContainerProps {

}

interface ISandboxState extends IContainerState {

}

export {Sandbox, ISandboxProps, ISandboxState};
