import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ColoredCircle} from "./ColoredCircle";

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
        };
    }

    public render(): ReactNode {

        return (
            <div className="partnerConfigFormMasterSpacerThisIsABadSolutionAndNotScalableTryNotToDoThis">
                <div className="partnerConfigFormContainer">


                    <div className="partnerConfigFormSection">
                        <div>
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setColorsTitle}
                            </p>
                        </div>
                        <div>
                            <ColoredCircle/>
                        </div>
                        <div>
                            <ColoredCircle/>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div>
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setPointExchangeTitle}
                            </p>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div>
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setAPIEndpointTitle}
                            </p>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div>
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setTransactionEndpointTitle}
                            </p>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">
                        <div>
                            <p className="partnerConfigFormTitleText">
                                {PartnerConfigForm.setLoginEndpointTitle}
                            </p>
                        </div>
                    </div>


                    <div className="partnerConfigFormSection">

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
