import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import '../App.css';

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

    public static defaultProps: ITextInputProps = {
        ...EnhancedComponent.defaultProps,
		secureText: false,
    };

    protected constructor(props: ITextInputProps) {
        super(props);
        this.state = {
            ...this.state,
            text: "",
        };

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    private handleTextChange(event: any): void {
        // @ts-ignore
        // this.setState({text: event.target.value}, () => {
            if (this.props.inputProps && this.props.inputProps.onChange) {
                // @ts-ignore
                this.props.inputProps.onChange(event.target.value.trim())
            }
        // });
    }

    public render(): ReactNode {
        return (
            <div style={{backgroundColor: "transparent", flexDirection: "row", flex: 1}}>
                <input
                    {...this.props.inputProps}
                    type={this.props.secureText ? "password" : "text"}
                    onChange={this.handleTextChange}
                    className={"TextInput"}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

interface ITextInputProps extends IEnhancedComponentProps {
    placeholder?: string;
    inputProps?: React.InputHTMLAttributes<any>;
    secureText?: boolean;
}

interface ITextInputState extends IEnhancedComponentState {
}

export {TextInput, ITextInputState, ITextInputProps};
