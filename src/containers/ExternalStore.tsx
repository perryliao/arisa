import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import "../App.css";
import {Button, Card, CardBody} from "reactstrap";
import {page} from "../App";
import {CopyCard} from "../components/CopyCard";

class ExternalStore extends Container<IExternalStoreProps, IExternalStoreState> {
	public static defaultProps: IExternalStoreProps = {
		...Container.defaultProps,
	};

	protected constructor(props: IExternalStoreProps) {
		super(props);
		this.state = {
			...this.state,
		};
		this.onClick = this.onClick.bind(this);
	}

	private onClick(): void {
		this.props.changePage(page.PartnerPortalSettings)();
	}

	public render(): ReactNode {
		return (
			<div className="partnerConfigPageBackground">
				<div style={{height: 40}}/>
				<div className="partnerConfigFormMasterSpacerThisIsABadSolutionAndNotScalableTryNotToDoThis">
					<div className="partnerConfigFormContainer">
						<div className="partnerConfigFormTitleTextContainer">
							<p className="partnerConfigFormTitleText">
								Get Catalogue
							</p>
						</div>

						<CopyCard cardBody={"https://www.localhost:3000/catalogue"}/>

						<div style={{height: 20}}/>

						<div className="partnerConfigFormTitleTextContainer">
							<p className="partnerConfigFormTitleText">
								Get current list of transactions
							</p>
						</div>

						<CopyCard cardBody={"https://www.localhost:3000/transactions"}/>

						<div className="partnerConfigFormSection">
							<div className="partnerConfigFormTextInputContainer">
								<Button className="jerryButton" onClick={this.onClick}>
									Next
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

interface IExternalStoreProps extends IContainerProps {

}

interface IExternalStoreState extends IContainerState {

}

export {ExternalStore, IExternalStoreProps, IExternalStoreState};
