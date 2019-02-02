import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {string} from "prop-types";

class ItemAddedAlert extends EnhancedComponent<IItemAddedAlertProps, IItemAddedAlertState> {

    public static defaultProps: IItemAddedAlertProps = {
        ...EnhancedComponent.defaultProps,
        itemName: "",
        numberInCatalog: 0,
    };

    private static addWord: string = " added to";
    private static subtractWord: string = " removed from";
    private static appendMessageA: string = " catalog! ";
    private static singularNumberMessage: string = " item";
    private static pluralNumberMessage: string = " items";
    private static appendMessageB: string = " in catalog.";

    protected constructor(props: IItemAddedAlertProps) {
        super(props);
        this.state = {
            ...this.state,
        };
    }

    public render(): ReactNode {

        const determinePlural: string = this.props.numberInCatalog === 1 ? ItemAddedAlert.singularNumberMessage : ItemAddedAlert.pluralNumberMessage;

        return (
            <div className="itemAddedAlertContainer">
                <img
                    src={require("../assets/solo-check.png")}
                    className="itemAddedAlertImage"
                />
                <p>
                    {this.props.itemName + (this.props.operatorWord ? ItemAddedAlert.addWord : ItemAddedAlert.subtractWord) + ItemAddedAlert.appendMessageA + this.props.numberInCatalog + determinePlural + ItemAddedAlert.appendMessageB}
                </p>
            </div>
        );
    }
}

interface IItemAddedAlertProps extends IEnhancedComponentProps {
    itemName: string;
    numberInCatalog: number;
    operatorWord?: boolean;
}

interface IItemAddedAlertState extends IEnhancedComponentState {
}

export {ItemAddedAlert, IItemAddedAlertProps, IItemAddedAlertState};
