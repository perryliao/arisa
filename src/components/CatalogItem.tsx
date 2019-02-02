import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class CatalogItem extends EnhancedComponent<ICatalogItemProps, ICatalogItemState> {

    public static defaultProps: ICatalogItemProps = {
        ...EnhancedComponent.defaultProps,
        selected: false,
        title: "iPhone XX 123",
        description: "this is thew newest and bestest iphone",
        imageURL: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/123/12307/12307993.jpg",
        bestBuyPrice: "$100",
        pointsPrice: "100,000",
    };

    private static selectedMessage: string = "ITEM IN CATALOG";
    private static retailPriceTitle: string = "Retail Price";
    private static pointsPriceTitle: string = "Your Price in Points";

    protected constructor(props: ICatalogItemProps) {
        super(props);
        this.state = {
            ...this.state,
            selected: props.selected,
        };

        this.wrapRenderDivClassName = "catalogItemWrapRenderOverwrite";
    }

    private toggleChecked(nextCheckStatus: boolean): () => void {
        const that: CatalogItem = this;

        return () => {
            that.setState({
                selected: nextCheckStatus,
            }, () => {

                // TODO call Chris' api to update the catalog item
            });
        }
    }

    public render(): ReactNode {
        return (
            <div className={this.state.selected ? "productCardGreen" : "productCard"}>

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

                <div className="productCardProductMainImageContainer">
                    <img
                        src={this.props.imageURL}
                        className="productCardProductMainImage"
                    />
                </div>

                <div className="productCardTextBlockContainer">
                    <div>
                        <p className="productCardProductTitle">
                            {this.props.title}
                        </p>
                    </div>
                    <div>
                        <p className="productCardProductDescription">
                            {this.props.description}
                        </p>
                    </div>
                </div>

                <div className="productCardTextBlockContainer">
                    <div>
                        <p className="productCardPriceMessage">
                            {CatalogItem.retailPriceTitle}
                        </p>
                    </div>
                    <div>
                        <p className={this.state.selected ? "productCardPriceGreen" : "productCardPrice"}>
                            {this.props.bestBuyPrice}
                        </p>
                    </div>
                </div>

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
}

interface ICatalogItemState extends IEnhancedComponentState {
    selected: boolean;
}

export {CatalogItem, ICatalogItemProps, ICatalogItemState};
