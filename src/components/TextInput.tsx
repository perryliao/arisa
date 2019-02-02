import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import '../App.css';

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

	public static defaultProps: ITextInputProps = {
		...EnhancedComponent.defaultProps,
		callback: () => {/**/},
	};

	protected constructor(props: ITextInputProps) {
		super(props);
		this.state = {
			...this.state,
			text: "",
		};

		this.getText = this.getText.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	public getText(): string {
		return this.state.text;
	}

	private handleTextChange(event: any): void {
		this.setState({text: event.target.value}, this.props.callback);
	}

	public render(): ReactNode {
		return (
			<div style={{backgroundColor: "transparent", flexDirection: "row", flex: 1, borderRadius: 25}}>
				<label>
					<img src={"search.png"} height={"26"}/>
					<input
						type={"text"}
						value={this.state.text}
						onChange={this.handleTextChange}
						className={"TextInput"}
					/>
				</label>
			</div>
		);
	}
}

interface ITextInputProps extends IEnhancedComponentProps {
	title?: string;
	width?: number;
	callback?: () => void;
}

interface ITextInputState extends IEnhancedComponentState {
	text: string;
}

export {TextInput, ITextInputState, ITextInputProps};
