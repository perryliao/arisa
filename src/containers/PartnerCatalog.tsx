import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {CatalogItem} from "../components/CatalogItem";
import {ItemAddedAlert} from "../components/ItemAddedAlert";

class PartnerCatalog extends Container<IPartnerCatalogProps, IPartnerCatalogState> {
	public static defaultProps: IPartnerCatalogProps = {
		...Container.defaultProps,
	};

	protected constructor(props: IPartnerCatalogProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {

		return (
			<div>
				<ItemAddedAlert
					itemName={"iphone lmao"}
					numberInCatalog={2}
				/>

				<CatalogItem/>
				<CatalogItem/>
				<CatalogItem/>
				<CatalogItem/>
				<CatalogItem/>

			</div>
		);
	}
}

interface IPartnerCatalogProps extends IContainerProps {

}

interface IPartnerCatalogState extends IContainerState {
}

export {PartnerCatalog, IPartnerCatalogProps, IPartnerCatalogState};
