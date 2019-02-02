import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import '../App.css';

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

	public static defaultProps: ITextInputProps = {
		...EnhancedComponent.defaultProps,
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
		// @ts-ignore
		this.setState({text: event.target.value}, this.props.inputProps.onChange(this.state.text));
	}

	public render(): ReactNode {
		return (
			<div style={{backgroundColor: "transparent", flexDirection: "row", flex: 1}}>
				{this.props.magGlass && <img src={"search.png"} height={"26"}/>}
				<input
					{...this.props.inputProps}
					type={"text"}
					value={this.state.text}
					onChange={this.handleTextChange}
					className={"TextInput"}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	}
}

interface ITextInputProps extends IEnhancedComponentProps {
	magGlass?: boolean;
	placeholder?: string;
	inputProps?: React.InputHTMLAttributes<any>;
}

interface ITextInputState extends IEnhancedComponentState {
	text: string;
}

export {TextInput, ITextInputState, ITextInputProps};
