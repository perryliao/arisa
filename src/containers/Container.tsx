import * as React from "react";
import {ReactNode} from "react";
import {IPopupReqs, Popup} from "../components/Popup";
import {IProductInterface} from "../bestBuyAPIs/bestBuyAPIs";
import {IDatabase, partnerName, userName} from "../data/database";

abstract class Container<P extends IContainerProps = IContainerProps, S extends IContainerState = IContainerState> extends React.PureComponent<P, S> {
	public static defaultProps: IContainerProps = {
	};

	private readonly childRender: () => ReactNode;

	protected constructor(props: P) {
		super(props);

		this.wrapRender = this.wrapRender.bind(this);

		// @ts-ignore
		this.state = {

		};

		this.childRender = this.render;
		this.wrapRender();
	}
	private wrapRender(): void {
		this.render = (): ReactNode => {
			return (
				<div>
					<div>
						{this.childRender()}
					</div>
				</div>
			);
		};
	}
}

interface IContainerProps {
	loginUser?: (username: string, password: string) => Promise<boolean>;
	loginPartner?: (username: string, password: string) => Promise<boolean>;
	modalFunction?: (key: PopupModalsEnum) => IPopupReqs;
	addToCatalogue?: (product: IProductInterface) => Promise<void>,
	removeFromCatalogue?: (product: IProductInterface) => Promise<void>,
	database?: IDatabase,
	partnerKey?: partnerName,
	userKey?: userName,
}

interface IContainerState {

}

enum PopupModalsEnum {
	LOGIN,
	BALANCE,
	PROCESSING,
	DONE,
}

export {Container, IContainerState, IContainerProps, PopupModalsEnum};
