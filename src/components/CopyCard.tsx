import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Button, Card, CardBody} from "reactstrap";
import "../App.css";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

class CopyCard extends EnhancedComponent<ICopyCardProps, ICopyCardState> {

	public static defaultProps: ICopyCardProps = {
		...EnhancedComponent.defaultProps,
		cardBody: "",
	};

	private id: number = Math.random() * 20000000;

	protected constructor(props: ICopyCardProps) {
		super(props);
		this.state = {
			...this.state,
			copied: false,
		}

		this.buttonClick = this.buttonClick.bind(this);
	}

	private buttonClick(): void {
		const range = document.createRange();
		range.selectNode(document.querySelector("myCopy" + this.id));
		window.getSelection().addRange(range);

		document.execCommand("copy");
		this.setState({copied: true}, () => {
			setTimeout(() => {this.setState({copied: false}); }, 5);
		})
	}

	public render(): ReactNode {
		return (
			<div>
				<Card className={"CenterAllRow"}>
					<CardBody id={"myCopy" + this.id}>
						{this.props.cardBody}
					</CardBody>
					{/*<Button title="Copy to Clipboard" style={{width: 25, overflow: "hidden"}} onClick={this.buttonClick}>*/}
						{/*{this.state.copied ? "Done!" : "Copy"}*/}
					{/*</Button>*/}
				</Card>
			</div>
		);
	}
}

interface ICopyCardProps extends IEnhancedComponentProps {
	cardBody: string;
}

interface ICopyCardState extends IEnhancedComponentState {
	copied: boolean;
}

export {CopyCard, ICopyCardProps, ICopyCardState};
