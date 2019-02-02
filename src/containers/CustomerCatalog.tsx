import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState, PopupModalsEnum} from "./Container";
import {CatalogItem, ICatalogItemProps} from "../components/CatalogItem";

class CustomerCatalog extends Container<ICustomerCatalogProps, ICustomerCatalogState> {
	public static defaultProps: ICustomerCatalogProps = {
		...Container.defaultProps,
	};

	protected constructor(props: ICustomerCatalogProps) {
		super(props);
		this.state = {
			...this.state,
		};

		this.fetchPartnerProducts = this.fetchPartnerProducts.bind(this);
		this.createProductList = this.createProductList.bind(this);
		this.handleProductCustomerSelection = this.handleProductCustomerSelection.bind(this);
	}

	public componentDidMount(): void {
		this.fetchPartnerProducts();
	}

	private fetchPartnerProducts(): void {
		// searchProducts

		const catalougedProducts: any = this.props.database.partners[this.props.partnerKey].catalogue;

		this.setState({
			products: catalougedProducts,
		})
	}

	private createProductList(paramProducts: any = {}): ReactNode[] {
		const products: ReactNode[] = [];

		let product: any;
		for (product in paramProducts) {

			const price: number = parseInt(paramProducts[product].price, 10);
			const pointPrice: number = price * this.props.database.partners[this.props.partnerKey].pointsToCent * 100;

			products.push(
				<CatalogItem
					title={paramProducts[product].name}
					description={paramProducts[product].description}
					bestBuyPrice={paramProducts[product].price}
					imageURL={paramProducts[product].imageURL}
					interfaceAsItWereFromAPIParse={paramProducts[product]}
					radioClickCallback={this.handleProductCustomerSelection}
					pointsPrice={pointPrice.toString()}
					customerVersion={true}
				/>
			);
		}

		return products;
	}

	private handleProductCustomerSelection(props: ICatalogItemProps, dumbVariableFromBadCodeDontUse: boolean): void {
		console.log("props:", props);
	}

	public render(): ReactNode {

		const products: ReactNode[] = this.createProductList(this.state.products);


		return (
			<div>
				<div>
					<div style={{height: 10}}/>

					<div style={{height: 30}}/>

					<div style={{verticalAlign: "top"}}>
						{products}
					</div>

				</div>
			</div>
		);
	}
}

interface ICustomerCatalogProps extends IContainerProps {

}

interface ICustomerCatalogState extends IContainerState {
	products: any;
}

export {CustomerCatalog, ICustomerCatalogProps, ICustomerCatalogState};
