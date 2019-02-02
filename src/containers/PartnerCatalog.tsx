import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {searchProducts} from "../bestBuyAPIs/bestBuyAPIs";

class PartnerCatalog extends Container<IPartnerCatalogProps, IPartnerCatalogState> {
	public static defaultProps: IPartnerCatalogProps = {
		...Container.defaultProps,
	};

	private testInputRef: any;

	protected constructor(props: IPartnerCatalogProps) {
		super(props);
		this.state = {
			...this.state,
			searchValue: "",
			response: null,
		};

		this.saveTestRef = this.saveTestRef.bind(this);
		this.onChangeTestText = this.onChangeTestText.bind(this);
		this.testSearch = this.testSearch.bind(this);
	}

	private saveTestRef(ref: any): void {
		this.testInputRef = ref;
	}

	private onChangeTestText(e: any): void {
		// console.log("e:", e.target.value);
		this.setState({
			searchValue: e.target.value,
		});
	}

	private testSearch(): void {
		console.log("test search:", this.state.searchValue);
		searchProducts(this.state.searchValue).then((res: any) => {

			console.log("res 2:", res);
			this.setState({
				response: res,
			});
		}).catch((err: any) => {
			console.log("err:", err);
		});
	}

	public render(): ReactNode {
		return (
			<div>
				<input placeholder={"test input search"} onChange={this.onChangeTestText}/>
				<button onClick={this.testSearch}>test search</button>
				<div>
					{JSON.stringify(this.state.response)}
				</div>
			</div>
		);
	}
}

interface IPartnerCatalogProps extends IContainerProps {

}

interface IPartnerCatalogState extends IContainerState {
	searchValue: string;
	response: any;
}

export {PartnerCatalog, IPartnerCatalogProps, IPartnerCatalogState};
