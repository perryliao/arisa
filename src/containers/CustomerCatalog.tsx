import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState, PopupModalsEnum} from "./Container";
import {Button} from "reactstrap";
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

		console.log("3:", paramProducts);

		let product: any;
		for (product in paramProducts) {
			products.push(
				<CatalogItem
					title={paramProducts[product].name}
					description={paramProducts[product].description}
					bestBuyPrice={paramProducts[product].price}
					imageURL={paramProducts[product].imageURL}
					interfaceAsItWereFromAPIParse={paramProducts[product]}
					radioClickCallback={this.handleProductCustomerSelection}
					customerVersion={true}
				/>
			);
		}

		return products;
	}

	private handleProductCustomerSelection(props: ICatalogItemProps, dumbVariableFromBadCodeDontUse: boolean): void {
		this.props.modalFunction(PopupModalsEnum.LOGIN).toggleFn();
		// console.log("props:", props);
	}

	public render(): ReactNode {
		return (
			<div>
				<Button onClick={this.props.modalFunction(PopupModalsEnum.LOGIN).toggleFn}>LOGIN</Button>{' '}
				<Button onClick={this.props.modalFunction(PopupModalsEnum.BALANCE).toggleFn}>BALANCE</Button>{' '}
			</div>
		);
	}
}

interface ICustomerCatalogProps extends IContainerProps {

}

interface ICustomerCatalogState extends IContainerState {

}

export {CustomerCatalog, ICustomerCatalogProps, ICustomerCatalogState};
