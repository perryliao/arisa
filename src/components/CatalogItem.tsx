import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {IProductInterface} from "../bestBuyAPIs/bestBuyAPIs";
import {Button} from "reactstrap";

class CatalogItem extends EnhancedComponent<ICatalogItemProps, ICatalogItemState> {

    public static defaultProps: ICatalogItemProps = {
        ...EnhancedComponent.defaultProps,
        selected: false,
        title: "iPhone XX 123",
        description: "this is thew newest and bestest iphone",
        imageURL: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/123/12307/12307993.jpg",
        bestBuyPrice: "$100",
        pointsPrice: "100000",
        interfaceAsItWereFromAPIParse: null,
        radioClickCallback: () => {},
        customerVersion: false,
    };

    private static selectedMessage: string = "ITEM IN CATALOG";
    private static retailPriceTitle: string = "Retail Price";
    private static pointsPriceTitle: string = "Your Price in Points";

    private static customerCTAButtonText: string = "Redeem Points";

    protected constructor(props: ICatalogItemProps) {
        super(props);
        this.state = {
            ...this.state,
            selected: props.selected,
        };
        this.toggleChecked = this.toggleChecked.bind(this);
        this.handleCustomerProductSelect = this.handleCustomerProductSelect.bind(this);

        this.wrapRenderDivClassName = "catalogItemWrapRenderOverwrite";
    }

    private toggleChecked(nextCheckStatus: boolean): () => void {
        const that: CatalogItem = this;

        return () => {
            that.setState({
                selected: nextCheckStatus,
            }, () => {
                that.props.radioClickCallback(that.props, !this.state.selected);
            });
        }
    }

    private handleCustomerProductSelect(): void {
        this.props.radioClickCallback(this.props, false);
    }

    public render(): ReactNode {
        return (
            <div className={this.state.selected ? "productCardGreen" : "productCard"} style={{flex: 1}}>

                {!this.props.customerVersion ?
                    <div>
                        {
                            this.state.selected ?
                            <div className="productCardTopRow">
                                <div className="productCardCheckBoxContainer">
                                    <img
                                        src={require("../assets/full-check.png")}
                                        onClick={this.toggleChecked(false)}
                                        className="productCardCheckBox"
                                    />
                                </div>
                                <p className="productCardItemInCatalogMessage">{CatalogItem.selectedMessage}</p>
                            </div> :
                                <div className="productCardTopRow">
                                    <div className="productCardCheckBoxContainer">
                                        <img
                                            src={require("../assets/empty-check.png")}
                                            onClick={this.toggleChecked(true)}
                                            className="productCardCheckBox"
                                        />
                                    </div>
                                </div>
                        }
                    </div> : null
                }

                <div className="productCardProductMainImageContainer">
                    <img
                        src={this.props.imageURL}
                        className="productCardProductMainImage"
                    />
                </div>

                <div className="productCardTextBlockContainer">
                    <div>
                        <p className="productCardProductTitle">
                            {this.props.title.substr(0, 50) + "..."}
                        </p>
                    </div>
                    <div>
                        <p className="productCardProductDescription">
                            {this.props.description.substr(0, 100) + "..."}
                        </p>
                    </div>
                </div>

                {!this.props.customerVersion ?
                    <div className="productCardTextBlockContainer">
                        <div>
                            <p className="productCardPriceMessage">
                                {CatalogItem.retailPriceTitle}
                            </p>
                        </div>
                        <div>
                            <p className={this.state.selected ? "productCardPriceGreen" : "productCardPrice"}>
                                {"$" + this.props.bestBuyPrice}
                            </p>
                        </div>
                    </div> : null
                }

                <div className="productCardTextBlockContainer">
                    <div>
                        <p className="productCardPriceMessage">
                            {CatalogItem.pointsPriceTitle}
                        </p>
                    </div>
                    <div>
                        <p className={this.state.selected ? "productCardPriceGreen" : "productCardPrice"}>
                            {this.props.pointsPrice}
                        </p>
                    </div>
                </div>

                {this.props.customerVersion ?
                    <div className="productCardTextBlockContainer">
                        <Button className="jerryButton jerryButtonSmall" onClick={this.handleCustomerProductSelect}>
                            {CatalogItem.customerCTAButtonText}
                        </Button>
                    </div> : null
                }
            </div>
        );
    }
}

interface ICatalogItemProps extends IEnhancedComponentProps {
    selected?: boolean;
    title: string;
    description: string;
    imageURL: string;
    bestBuyPrice: string;
    pointsPrice: string;
    radioClickCallback: (props: ICatalogItemProps, selected: boolean) => void;
    interfaceAsItWereFromAPIParse: IProductInterface;
    customerVersion: boolean;
}

interface ICatalogItemState extends IEnhancedComponentState {
    selected: boolean;
}

export {CatalogItem, ICatalogItemProps, ICatalogItemState};
