import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ITextInputProps, ITextInputState, TextInput} from "./TextInput";

class Searchbar extends EnhancedComponent<ISearchbarProps, ISearchbarState> {

	public static defaultProps: ISearchbarProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: ISearchbarProps) {
		super(props);
		this.state = {
			...this.state,
		}
	}

	public render(): ReactNode {
		return (
			<div>
				<img src={"search.png"} height={"20"} style={{position: "absolute", marginLeft: 15, marginTop: 20}}/>
				<TextInput
					inputProps={{
						...this.props.inputProps,
						style: {paddingLeft: 33}
					}}
				/>
			</div>
		);
	}
}

interface ISearchbarProps extends ITextInputProps {

}

interface ISearchbarState extends ITextInputState {

}

export {Searchbar, ISearchbarProps, ISearchbarState};
