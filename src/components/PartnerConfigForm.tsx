import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ColoredCircle} from "./ColoredCircle";
import {TextInput} from "./TextInput";
import {Button} from "reactstrap";

class PartnerConfigForm extends EnhancedComponent<IPartnerConfigFormProps, IPartnerConfigFormState> {

    public static defaultProps: IPartnerConfigFormProps = {
        ...EnhancedComponent.defaultProps,
    };

    private static setColorsTitle: string = "Set colours";
    private static setPointExchangeTitle: string = "Set point exchange rate";
    private static setAPIEndpointTitle: string = "Set API endpoint";
    private static setTransactionEndpointTitle: string = "Set transaction endpoint";
    private static setLoginEndpointTitle: string = "Set transaction endpoint";
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
        this.state = {
            ...this.state,
            primaryColor: null,
            pointAmountPerDollar: 1231,
        };
        this.onPointChange = this.onPointChange.bind(this);
    }

    private onPointChange(newPoints: number): void {
        if (typeof newPoints !== "number") {
            return;
        }

        this.setState({
            pointAmountPerCent: newPoints.toString(),
            pointAmountPerDollar: newPoints * 100
        });
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
                                    <TextInput/>
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
                                    <TextInput/>
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
                                <div style={{width: "30%"}}>
                                    <p className="partnerConfigFormConversionRateText">
                                        {PartnerConfigForm.centConversionMessage}
                                    </p>
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "60%"}}>
                                    <TextInput/>
                                </div>
                            </div>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <div className="partnerConfigFormTextInputContainer">
                                <div style={{width: "30%"}}>
                                    <p className="partnerConfigFormConversionRateText">
                                        {PartnerConfigForm.dollarConversionMessage}
                                    </p>
                                </div>
                                <div style={{width: "5%"}}/>
                                <div style={{width: "60%"}}>
                                    <p className="convertedCentsToDollarsPointDisplay">
                                        {this.state.pointAmountPerDollar}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setAPIEndpointTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <TextInput/>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setTransactionEndpointTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <TextInput/>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTitleTextContainer">
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setLoginEndpointTitle}
                            </p>
                        </div>
                        <div className="partnerConfigFormTextInputRowWrapperForMargins">
                            <TextInput/>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div className="partnerConfigFormTextInputContainer">
                            <Button className="jerryButton">
                                {PartnerConfigForm.buttonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

interface IPartnerConfigFormProps extends IEnhancedComponentProps {
}

interface IPartnerConfigFormState extends IEnhancedComponentState {
    primaryColor: string;
    secondaryColor: string;
    pointAmountPerCent: string;
    pointAmountPerDollar: number;
    apiEndpoint: string;
    transactionEndpoint: string;
    loginEndpoint: string;
}

export {PartnerConfigForm, IPartnerConfigFormProps, IPartnerConfigFormState};
