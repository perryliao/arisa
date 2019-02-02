import * as React from 'react';
import {ReactNode} from 'react';
import './App.css';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,} from "reactstrap";
import {defaultDatabase, IDatabase, IPartner, IUser, partnerName, userName} from "./data/database";
import {IContainerProps, PopupModalsEnum} from "./containers/Container";
import {CustomerCatalog} from "./containers/CustomerCatalog";
import {IPopupReqs, Popup} from "./components/Popup";

enum page {
	PartnerPortalLogin,
	PartnerPortalSettings,
	PartnerCatalogueSettings,
	UserPortalLogin,
	UserPortalStore,
}

class App extends React.Component<IAppProps, IAppState> {

	public state: IAppState = {
		database: defaultDatabase,
		partnerKey: partnerName.RBC,
		userKey: userName.MICHELLE,
		isOpen: true,
		currentPage: page.PartnerPortalLogin,
		loginPopupOpen: false,
		balancePopupOpen: false,
		processingPopupOpen: false,
		donePopupOpen: false,
	};

	private static pages: {[key: string]: {pointer: any, name: string}} = {
		[page.PartnerPortalLogin]: {pointer: CustomerCatalog, name: "Partner Login"},
		[page.PartnerPortalSettings]: {pointer: CustomerCatalog, name: "Partner Settings"},
		[page.PartnerCatalogueSettings]: {pointer: CustomerCatalog, name: "Partner Catalogue"},
		[page.UserPortalLogin]: {pointer: CustomerCatalog, name: "User Login"},
		[page.UserPortalStore]: {pointer: CustomerCatalog, name: "User Store"},
	};

	constructor(props: IAppProps) {
		super(props);
		this.loginUser = this.loginUser.bind(this);
		this.loginPartner = this.loginPartner.bind(this);
		this.toggle = this.toggle.bind(this);
		this.changePage = this.changePage.bind(this);
		this.createNavLinks = this.createNavLinks.bind(this);
		this.determinePage = this.determinePage.bind(this);
		this.determineModalFunction = this.determineModalFunction.bind(this);
		this.toggleLoginPopup = this.toggleLoginPopup.bind(this);
		this.toggleBalancePopup = this.toggleBalancePopup.bind(this);
		this.toggleLoginPopup = this.toggleLoginPopup.bind(this);
		this.toggleDonePopup = this.toggleDonePopup.bind(this);
	}

	private toggle(): void {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	private changePage(page: any): () => void {
		const that: App = this;
		return (): void => {
			that.setState({currentPage: page as page});
		};
	}

	private async loginUser(username: string, password: string): Promise<boolean> {
		const user: IUser = this.state.database.partners[this.state.partnerKey].users[username];
		const success: boolean = !(user === undefined || user.password !== password);
		if (!success) {
			return false;
		}
		const that: App = this;
		await new Promise((resolve: () => void) => {
			that.setState({userKey: username as userName}, resolve);
		});
		return success;
	}

	private async loginPartner(username: string, password: string): Promise<boolean> {
		const partner: IPartner = this.state.database.partners[username];
		const success: boolean = !(partner === undefined || partner.password !== password);
		if (!success) {
			return false;
		}
		const that: App = this;
		await new Promise((resolve: () => void) => {
			that.setState({partnerKey: username as partnerName}, resolve);
		});
		return !(partner === undefined || partner.password !== password);
	}

	private createNavLinks(pageKey: any): ReactNode {
		return (
			<NavItem key={pageKey}>
				<NavLink
					onClick={this.changePage(pageKey)}
					href="#"
					selected={this.state.currentPage === pageKey}
				>
					{App.pages[pageKey].name}
				</NavLink>
			</NavItem>
		)
	}

	private determinePage(): ReactNode {
		const props: IContainerProps = {
			loginUser: this.loginUser,
			loginPartner: this.loginPartner,
			modalFunction: this.determineModalFunction
		};
		return React.createElement(App.pages[this.state.currentPage].pointer, props);
	}

	private determineModalFunction(key: PopupModalsEnum): IPopupReqs {
		switch(key) {
			case PopupModalsEnum.LOGIN:
				// open payment
				return {toggleFn: this.toggleLoginPopup, open: this.state.loginPopupOpen};
			case PopupModalsEnum.BALANCE:
				return {toggleFn: this.toggleBalancePopup, open: this.state.balancePopupOpen};
			case PopupModalsEnum.PROCESSING:
				return {toggleFn: this.toggleProcessingPopup, open: this.state.processingPopupOpen};
			case PopupModalsEnum.DONE:
				return {toggleFn: this.toggleDonePopup, open: this.state.donePopupOpen};
			default:
				// never come here
				return {toggleFn: this.toggleDonePopup, open: this.state.donePopupOpen};
		}
	}

	private toggleLoginPopup(): void {
		this.setState({loginPopupOpen: !this.state.loginPopupOpen}, () => {
			console.log("login popup clicked");
		});
	}

	private toggleBalancePopup(): void {
		this.setState({balancePopupOpen: !this.state.balancePopupOpen});
	}

	private toggleProcessingPopup(): void {
		this.setState({processingPopupOpen: !this.state.processingPopupOpen});
	}

	private toggleDonePopup(): void {
		this.setState({donePopupOpen: !this.state.donePopupOpen});
	}

	public render() {
		const keys = Object.keys(page)
			.filter(k => typeof page[k as any] === "number"); // ["A", "B"]
		const links: any[] = keys.map(k => page[k as any]); // [0, 1]

		return (
			<div className="App">
				<Navbar color="dark" dark={true} expand="md">
					<NavbarBrand href="#">{this.state.partnerKey}</NavbarBrand>
					<NavbarToggler onClick={this.toggle}/>
					<Collapse isOpen={this.state.isOpen} navbar={true}>
						<Nav className="ml-auto" navbar={true}>
							{links.map(this.createNavLinks)}
						</Nav>
					</Collapse>
				</Navbar>
				<div className="container">
					{this.state.loginPopupOpen && <Popup reqs={this.determineModalFunction(PopupModalsEnum.LOGIN)}/>}
					{this.state.balancePopupOpen && <Popup reqs={this.determineModalFunction(PopupModalsEnum.BALANCE)}/>}
					{this.state.processingPopupOpen && <Popup reqs={this.determineModalFunction(PopupModalsEnum.PROCESSING)}/>}
					{this.state.donePopupOpen && <Popup reqs={this.determineModalFunction(PopupModalsEnum.DONE)}/>}
					{this.determinePage()}
				</div>
			</div>
		);
	}
}

interface IAppProps {

}

interface IAppState {
	database: IDatabase,
	partnerKey: partnerName,
	userKey: userName,
	isOpen: boolean;
	currentPage: page;
	loginPopupOpen: boolean;
	balancePopupOpen: boolean;
	processingPopupOpen: boolean;
	donePopupOpen: boolean;
}

export default App;
