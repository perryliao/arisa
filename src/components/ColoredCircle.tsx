import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class ColoredCircle extends EnhancedComponent<IColoredCircleProps, IColoredCircleState> {

    public static defaultProps: IColoredCircleProps = {
        ...EnhancedComponent.defaultProps,
        circleColor: "#003B64",
    };

    protected constructor(props: IColoredCircleProps) {
        super(props);
        this.state = {
            ...this.state,
        };
    }

    public render(): ReactNode {

        return (
            <div className="circledColoredDiv" style={{backgroundColor: this.props.circleColor}}/>
        );
    }
}

interface IColoredCircleProps extends IEnhancedComponentProps {
    circleColor: string;
}

interface IColoredCircleState extends IEnhancedComponentState {
}

export {ColoredCircle, IColoredCircleProps, IColoredCircleState};
