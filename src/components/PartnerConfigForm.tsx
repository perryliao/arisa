import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ColoredCircle} from "./ColoredCircle";
import {TextInput} from "./TextInput";
import {Button} from "reactstrap";
import {IDatabase, IPartner, IPartnerOptions} from "../data/database";
import {IContainerProps} from "../containers/Container";
import {page} from "../App";

class PartnerConfigForm extends EnhancedComponent<IPartnerConfigFormProps, IPartnerConfigFormState> {

    public static defaultProps: IPartnerConfigFormProps = {
        ...EnhancedComponent.defaultProps,
    };

    private static setColorsTitle: string = "Set colours";
    private static setPointExchangeTitle: string = "Set point exchange rate";
    private static setAPIEndpointTitle: string = "Set API endpoint";
    private static setTransactionEndpointTitle: string = "Set transaction endpoint";
    private static setLoginEndpointTitle: string = "Set login endpoint";
    private static buttonText: string = "Submit";

    private static centConversionMessage: string = "$0.01 CAD =";
    private static dollarConversionMessage: string = "$1.00 CAD =";

    private static primaryColorPlaceholder: string = "Primary (hex)";
    private static secondaryColorPlaceholder: string = "Secondary (hex)";
    private static pointAmountPlaceholder: string = "Point amount";
    private static apiEndpointPlaceholder: string = "Past API endpoint here";
    private static transactionEndpointPlaceholder: string = "Paste transaction endpoint here";
    private static loginEndpoint: string = "Paste login endpoint here";

    protected constructor(props: IPartnerConfigFormProps) {
        super(props);
        const partner: IPartner = props.database.partners[this.props.partnerKey];
        this.state = {
            ...this.state,
            primaryColor: partner.primaryColour,
            secondaryColor: partner.secondaryColour,
            pointAmountPerDollar: partner.pointsToCent * 100,
            pointAmountPerCent: partner.pointsToCent,
            apiEndpoint: "",
            transactionEndpoint: partner.transactionEndpoint,
            loginEndpoint: partner.loginEndpoint,
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.onPointChange = this.onPointChange.bind(this);
        this.handleGenericTextInputChange = this.handleGenericTextInputChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    private onClick(): void {
        const that: PartnerConfigForm = this;
        this.props.editPartnerOptions({
            primaryColour: this.state.primaryColor,
            secondaryColour: this.state.secondaryColor,
            pointsToCent: this.state.pointAmountPerCent,
            transactionEndpoint: this.state.transactionEndpoint,
            loginEndpoint: this.state.loginEndpoint,
        }).then(that.props.changePage(page.PartnerCatalogueSettings));
    }

    private handleColorChange(whichInput: any): (newColor: string) => void {
        const that: PartnerConfigForm = this;

        return (newColor: string): void => {
            // console.log("which input:", whichInput, "newColor:", newColor);

            that.setState({
                primaryColor: whichInput === "primary" ? newColor : that.state.primaryColor,
                secondaryColor: whichInput === "secondary" ? newColor : that.state.secondaryColor,
            })
        }
    }

    private onPointChange(newPoints: number): void {
        console.log("new points:", newPoints);

        this.setState({
            pointAmountPerCent: newPoints,
            pointAmountPerDollar: newPoints * 100
        });
    }

    private handleGenericTextInputChange(input: string): (newValue: string) => void {
        const that: PartnerConfigForm = this;

        return (newValue: string): void => {
            console.log("input:", input, "value:", newValue);

            // @ts-ignore
            const newState: IPartnerConfigFormState = {...that.state, [input]: newValue};

            that.setState(newState, () => {
                console.log("STATE:", that.state);
            })
        }
    }

    public render(): ReactNode {

        return (
            <div className="partnerConfigFormMasterSpacerThisIsABadSolutionAndNotScalableTryNotToDoThis">
                <div className="partnerConfigFormContainer">


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setColorsTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <div className="partnerConfigFormTextInputContainer">
                                <div style={{width: "80%"}}>
                                    <TextInput
                                        inputProps={{
                                            // @ts-ignore
                                            onChange: this.handleColorChange("primary"),
                                            value: this.state.primaryColor,
                                        }}

                                    />
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "10%"}}>
                                    <ColoredCircle
                                        circleColor={this.state.primaryColor}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <div className="partnerConfigFormTextInputContainer">
                                <div style={{width: "80%"}}>
                                    <TextInput
                                        inputProps={{
                                            // @ts-ignore
                                            onChange: this.handleColorChange("secondary"),
                                            value: this.state.secondaryColor,
                                        }}
                                    />
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "10%"}}>
                                    <ColoredCircle
                                        circleColor={this.state.secondaryColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setPointExchangeTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <div className="partnerConfigFormTextInputContainer">
                                <div style={{width: "40%"}}>
                                    <p className="partnerConfigFormConversionRateText">
                                        {PartnerConfigForm.centConversionMessage}
                                    </p>
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "50%"}}>
                                    <TextInput
                                        inputProps={{
                                            // @ts-ignore
                                            onChange: this.onPointChange,
                                            value: this.state.pointAmountPerCent,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <div className="partnerConfigFormTextInputContainer">
                                <div style={{width: "40%"}}>
                                    <p className="partnerConfigFormConversionRateText">
                                        {PartnerConfigForm.dollarConversionMessage}
                                    </p>
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "50%"}}>
                                    <p className="convertedCentsToDollarsPointDisplay">
                                        {this.state.pointAmountPerDollar}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*<div className="partnerConfigFormSection">*/}
                        {/*<div className="partnerConfigFormTitleTextContainer">*/}
                            {/*<p className="partnerConfigFormTitleText">*/}
                                {/*{PartnerConfigForm.setAPIEndpointTitle}*/}
                            {/*</p>*/}
                        {/*</div>*/}
                        {/*<div className="partnerConfigFormTextInputRowWrapperForMargins">*/}
                            {/*<TextInput*/}
                                {/*inputProps={{*/}
                                    {/*// @ts-ignore*/}
                                    {/*onChange: this.handleGenericTextInputChange("apiEndpoint")*/}
                                {/*}}*/}
                            {/*/>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setLoginEndpointTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <TextInput
                                inputProps={{
                                    // @ts-ignore
                                    onChange: this.handleGenericTextInputChange("loginEndpoint"),
                                    value: this.state.loginEndpoint
                                }}
                            />
                        </div>
                    </div>

                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setTransactionEndpointTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <TextInput
                                inputProps={{
                                    // @ts-ignore
                                    onChange: this.handleGenericTextInputChange("transactionEndpoint"),
                                    value: this.state.transactionEndpoint
                                }}
                            />
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTextInputContainer">
                            <Button className="jerryButton" onClick={this.onClick}>
                                {PartnerConfigForm.buttonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface IPartnerConfigFormProps extends IContainerProps {

}

interface IPartnerConfigFormState extends IEnhancedComponentState {
    primaryColor: string;
    secondaryColor: string;
    pointAmountPerCent: number;
    pointAmountPerDollar: number;
    apiEndpoint: string;
    transactionEndpoint: string;
    loginEndpoint: string;
}

export {PartnerConfigForm, IPartnerConfigFormProps, IPartnerConfigFormState};
