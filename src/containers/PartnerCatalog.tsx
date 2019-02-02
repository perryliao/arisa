import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {CatalogItem, ICatalogItemProps} from "../components/CatalogItem";
import {ItemAddedAlert} from "../components/ItemAddedAlert";
import {Searchbar} from "../components/Searchbar";
import {IProductInterface, searchProducts} from "../bestBuyAPIs/bestBuyAPIs";

class PartnerCatalog extends Container<IPartnerCatalogProps, IPartnerCatalogState> {

    public static defaultProps: IPartnerCatalogProps = {
        ...Container.defaultProps,
    };

    private static selectCatalogItemsMessage: string = "Please add items to your catalog that you would like to be redeemable.";

    private searchbarRef: Searchbar;

    protected constructor(props: IPartnerCatalogProps) {
        super(props);
        this.state = {
            ...this.state,
            addSuccess: false,
            products: {},
        };
        this.saveSearchRef = this.saveSearchRef.bind(this);
        this.searchBarOnChange = this.searchBarOnChange.bind(this);
        this.createProductList = this.createProductList.bind(this);
        this.addProductToCatalog = this.addProductToCatalog.bind(this);
    }

    private saveSearchRef(ref: Searchbar): void {
        this.searchbarRef = ref;
    }

    private searchBarOnChange(event: ChangeEvent<any>): void {
        // searchProducts
        const that: PartnerCatalog = this;

        searchProducts(event.toString()).then((res: any) => {
            if (res) {
                that.setState({
                    products: res,
                });
            }
        }).catch((err: any) => {
            alert(err);
        });
    }

    private createProductList(paramProducts: any = {}): ReactNode[] {
        const products: ReactNode[] = [];

        let product: any;
        for (product in paramProducts) {
            console.log("product:", paramProducts[product]);

            const price: number = parseInt(paramProducts[product].price, 10);
            const pointPrice: number = price * this.props.database.partners[this.props.partnerKey].pointsToCent * 100;


            products.push(
                <CatalogItem
                    catalog={this.props.database.partners[this.props.partnerKey].catalogue}
                    title={paramProducts[product].name}
                    description={paramProducts[product].description}
                    bestBuyPrice={paramProducts[product].price}
                    imageURL={paramProducts[product].imageURL}
                    interfaceAsItWereFromAPIParse={paramProducts[product]}
                    radioClickCallback={this.addProductToCatalog}
                    pointsPrice={pointPrice.toString()}
                />
            );
        }

        return products;
    }

    private addProductToCatalog(product: ICatalogItemProps, subtract: boolean = false): void {
        const that: PartnerCatalog = this;

        // console.log("product:", product.interfaceAsItWereFromAPIParse);

        if (!subtract) {

            this.props.addToCatalogue(product.interfaceAsItWereFromAPIParse).then(() => {
                that.setState({
                    recentlyAddedProduct: product.interfaceAsItWereFromAPIParse,
                    addSuccess: true,
                    recentAddOrDeleteEvent: true,
                });
            });
        } else {
            this.props.removeFromCatalogue(product.interfaceAsItWereFromAPIParse).then(() => {
                that.setState({
                    recentlyAddedProduct: product.interfaceAsItWereFromAPIParse,
                    addSuccess: true,
                    recentAddOrDeleteEvent: false,
                });
            })
        }
    }

    public render(): ReactNode {

        const products: ReactNode[] = this.createProductList(this.state.products);

        return (
            <div>
                <div style={{height: 25}}/>

                <div>
                    <p className="aboveSearchBarMessagePleaseString">
                        {PartnerCatalog.selectCatalogItemsMessage}
                    </p>
                </div>

                <div style={{height: 25}}/>

                <Searchbar inputProps={{onChange: this.searchBarOnChange}}/>

                <div style={{height: 30}}/>

                {this.state.addSuccess &&
                <ItemAddedAlert
                    itemName={this.state.recentlyAddedProduct && this.state.recentlyAddedProduct.name}
                    numberInCatalog={this.props.catalogueLength}
                    operatorWord={this.state.recentAddOrDeleteEvent}
                />
                }

                <div style={{verticalAlign: "top"}}>
                    {products}
                </div>

            </div>
        );
    }
}

interface IPartnerCatalogProps extends IContainerProps {

}

interface IPartnerCatalogState extends IContainerState {
    addSuccess: boolean;
    recentlyAddedProduct: IProductInterface;
    recentAddOrDeleteEvent: boolean;
    products: any;
}

export {PartnerCatalog, IPartnerCatalogProps, IPartnerCatalogState};
