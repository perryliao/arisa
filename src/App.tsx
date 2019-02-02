import * as React from 'react';
import {ReactNode} from 'react';
import './App.css';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,} from "reactstrap";
import {defaultDatabase, IDatabase, IPartner, IPartnerOptions, IUser, partnerName, userName} from "./data/database";
import {IContainerProps, PopupModalsEnum} from "./containers/Container";
import {CustomerCatalog} from "./containers/CustomerCatalog";
import {IPopupReqs, Popup} from "./components/Popup";
import {IProductInterface} from "./bestBuyAPIs/bestBuyAPIs";
import {PartnerCatalog} from "./containers/PartnerCatalog";
import {PartnerConfig} from "./containers/PartnerConfig";
import {Login} from "./components/PopupContents/Login";
import {Balance} from "./components/PopupContents/Balance";
import {Done} from "./components/PopupContents/Done";

export enum page {
    PartnerPortalLogin,
    PartnerPortalSettings,
    PartnerCatalogueSettings,
    // UserPortalLogin,
    UserPortalStore,
}

class App extends React.Component<IAppProps, IAppState> {

    public state: IAppState = {
        database: defaultDatabase,
        partnerKey: partnerName.RBC,
        userKey: userName.MICHELLE,
        isOpen: true,
        currentPage: page.PartnerPortalSettings,
        loginPopupOpen: false,
        balancePopupOpen: false,
		donePopupOpen: false,
        currentViewingPointPrice: "0",
    };

    private static pages: { [key: string]: { pointer: any, name: string } } = {
        [page.PartnerPortalLogin]: {pointer: CustomerCatalog, name: "Partner Login"},
        [page.PartnerPortalSettings]: {pointer: PartnerConfig, name: "Partner Settings"},
        [page.PartnerCatalogueSettings]: {pointer: PartnerCatalog, name: "Partner Catalogue"},
        // [page.UserPortalLogin]: {pointer: CustomerCatalog, name: "User Login"},
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
		this.toggleDonePopup = this.toggleDonePopup.bind(this);
        this.addToCatalogue = this.addToCatalogue.bind(this);
        this.removeFromCatalogue = this.removeFromCatalogue.bind(this);
        this.editPartnerOptions = this.editPartnerOptions.bind(this);
        this.updateCurrentViewingPointPrice = this.updateCurrentViewingPointPrice.bind(this);
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

    private async addToCatalogue(product: IProductInterface): Promise<void> {
        const database: IDatabase = JSON.parse(JSON.stringify(this.state.database));
        database.partners[this.state.partnerKey].catalogue[product.id] = product;
        await new Promise((resolve: () => void) => {
            this.setState({database}, resolve)
        });
    }

    private async removeFromCatalogue(product: IProductInterface): Promise<void> {
        const database: IDatabase = JSON.parse(JSON.stringify(this.state.database));
        try {
            delete database.partners[this.state.partnerKey].catalogue[product.id];
            await new Promise((resolve: () => void) => {
                this.setState({database}, resolve)
            });
        } catch (err) {

        }
    }

	private async makeTransaction(points: number): Promise<boolean> {
		const user: IUser = this.state.database.partners[this.state.partnerKey].users[this.state.userKey];
		if (points > user.balance) {
			return false;
		}
		const database: IDatabase = JSON.parse(JSON.stringify(this.state.database));
		database.partners[this.state.partnerKey].users[this.state.userKey].balance -= points;
		await new Promise((resolve: () => void) => {
			this.setState({database}, resolve)
		});
		return true;
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

	private async editPartnerOptions(partnerOptions: IPartnerOptions): Promise<void> {
		const database: IDatabase = JSON.parse(JSON.stringify(this.state.database));
		database.partners[this.state.partnerKey] = {
			...database.partners[this.state.partnerKey],
			...partnerOptions,
		};
		await new Promise((resolve: () => void) => {
			this.setState({database}, resolve)
		});
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
            modalFunction: this.determineModalFunction,
            addToCatalogue: this.addToCatalogue,
            removeFromCatalogue: this.removeFromCatalogue,
            editPartnerOptions: this.editPartnerOptions,
            database: this.state.database,
            partnerKey: this.state.partnerKey,
            userKey: this.state.userKey,
            catalogueLength: Object.keys(this.state.database.partners[this.state.partnerKey].catalogue).length,
            makeTransaction: this.makeTransaction,
            changePage: this.changePage,
            updateCurrentViewingPointPrice: this.updateCurrentViewingPointPrice,
        };
        return React.createElement(App.pages[this.state.currentPage].pointer, props);
    }

    private determineModalFunction(key: PopupModalsEnum): IPopupReqs {
        switch (key) {
            case PopupModalsEnum.LOGIN:
                // open login
                return {
                    toggleFn: this.toggleLoginPopup,
                    open: this.state.loginPopupOpen,
                    component: <Login
						onClick={this.toggleLoginPopup}
						login={this.loginUser}
						balancePopupFn={this.toggleBalancePopup}
					/>
                };
			case PopupModalsEnum.DONE:
				// open DONE
				return {
					toggleFn: this.toggleDonePopup,
					open: this.state.donePopupOpen,
					component: <Done
						onClick={this.toggleDonePopup}
					/>
				}
            default:
                return {
                    toggleFn: this.toggleBalancePopup,
                    open: this.state.balancePopupOpen,
                    component: <Balance
						onClick={this.toggleBalancePopup}
						addedPoints={this.state.currentViewingPointPrice}
						callDone={this.toggleDonePopup}
					/>,
                    rounded: true
                };
        }
    }

    private toggleLoginPopup(): void {
        this.setState({loginPopupOpen: !this.state.loginPopupOpen});
    }

    private toggleBalancePopup(): void {
        this.setState({balancePopupOpen: !this.state.balancePopupOpen});
    }

	private toggleDonePopup(): void {
		this.setState({donePopupOpen: !this.state.donePopupOpen});
	}

    private updateCurrentViewingPointPrice(newPrice: string): void {
        this.setState({
            currentViewingPointPrice: newPrice,
        })
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
                    {this.state.loginPopupOpen &&
						<Popup
							reqs={this.determineModalFunction(PopupModalsEnum.LOGIN)}
							modalClassName={"loginPopup"}
						/>
					}
                    {this.state.balancePopupOpen &&
                   		<Popup
							reqs={this.determineModalFunction(PopupModalsEnum.BALANCE)}
							modalClassName={"balancePopup"}
						/>
                   	}
					{this.state.donePopupOpen &&
                    <Popup
                        reqs={this.determineModalFunction(PopupModalsEnum.DONE)}
                        modalClassName={"loginPopup"}
                    />
					}
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
	donePopupOpen: boolean;
    currentViewingPointPrice: string;
}

export default App;
