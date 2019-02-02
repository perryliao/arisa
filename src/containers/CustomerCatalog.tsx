import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState, PopupModalsEnum} from "./Container";
import {Button} from "reactstrap";
import {CatalogItem, ICatalogItemProps} from "../components/CatalogItem";

class CustomerCatalog extends Container<ICustomerCatalogProps, ICustomerCatalogState> {
	public static defaultProps: ICustomerCatalogProps = {
		...Container.defaultProps,
	};

	private static selectItemToRedeemWithPoints: string = "Please choose an item to redeem for your points.";

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

		// console.log("props:", props);
		// console.log("props:", props.pointsPrice);
		this.props.updateCurrentViewingPointPrice(props.pointsPrice);

		// TODO prompt pop up
		this.props.modalFunction(PopupModalsEnum.LOGIN).toggleFn();
	}

	public render(): ReactNode {

		const products: ReactNode[] = this.createProductList(this.state.products);


		return (
			<div>
				<div>
					<div style={{height: 25}}/>

					<div>
						<p className="aboveSearchBarMessagePleaseString">
							{CustomerCatalog.selectItemToRedeemWithPoints}
						</p>
					</div>

					<div style={{height: 25}}/>

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
