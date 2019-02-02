import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {CatalogItem} from "../components/CatalogItem";
import {ItemAddedAlert} from "../components/ItemAddedAlert";
import {Searchbar} from "../components/Searchbar";
import {searchProducts} from "../bestBuyAPIs/bestBuyAPIs";

class PartnerCatalog extends Container<IPartnerCatalogProps, IPartnerCatalogState> {
	public static defaultProps: IPartnerCatalogProps = {
		...Container.defaultProps,
	};

	private searchbarRef: Searchbar;

	protected constructor(props: IPartnerCatalogProps) {
		super(props);
		this.state = {
			...this.state,
			addSuccess: false,
			products: null,
		};
		this.saveSearchRef = this.saveSearchRef.bind(this);
		this.searchBarOnChange = this.searchBarOnChange.bind(this);
	}

	private saveSearchRef(ref: Searchbar): void {
		this.searchbarRef = ref;
	}

	private searchBarOnChange(event: ChangeEvent<any>): void {
		// searchProducts
		searchProducts(event.toString()).then((res: any) => {
			if (res) {

			}
		}).catch((err: any) => {
			alert(err);
		});
	}

	public render(): ReactNode {

		return (
			<div>
				<div style={{height: 10}}/>
				<Searchbar ref={this.saveSearchRef} inputProps={{onChange: this.searchBarOnChange}}/>
				<div style={{height: 30}}/>
				{this.state.addSuccess &&
					<ItemAddedAlert
						itemName={"iphone lmao"}
						numberInCatalog={2}
					/>
				}

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
	addSuccess: boolean;
	products: any; // TODO
}

export {PartnerCatalog, IPartnerCatalogProps, IPartnerCatalogState};
