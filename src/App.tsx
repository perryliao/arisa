import * as React from 'react';
import './App.css';
import {
	Collapse,
	Nav,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	NavItem,
	NavLink,
} from "reactstrap";
import {defaultDatabase, IDatabase, IPartner, IUser, partnerName, userName} from "./data/database";

class App extends React.Component<IAppProps, IAppState> {

	public state: IAppState = {
		database: defaultDatabase,
		partnerKey: partnerName.RBC,
		userKey: userName.MICHELLE,
		isOpen: true,
		currentPage: "",
	};

	constructor(props: IAppProps) {
		super(props);
		this.loginUser = this.loginUser.bind(this);
		this.loginPartner = this.loginPartner.bind(this);
		this.toggle = this.toggle.bind(this);
		this.changePage = this.changePage.bind(this);
	}

	private toggle(): void {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	private changePage(page: string): () => void {
		const that: App = this;
		return (): void => {
			that.setState({currentPage: page});
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


	public render() {
		return (
			<div className="App">
				<Navbar color="dark" dark={true} expand="md">
					<NavbarBrand href="https://www.lucky9lanes.com/">Lucky 9 Lanes</NavbarBrand>
					<NavbarToggler onClick={this.toggle}/>
					<Collapse isOpen={this.state.isOpen} navbar={true}>
						<Nav className="ml-auto" navbar={true}>
							<NavItem>
								<NavLink
									onClick={this.changePage("description")}
									href="#"
								>
									Description
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									onClick={this.changePage("versionA")}
									selected={this.state.currentPage === "versionA"}
									href="#"
								>
									Version A
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									onClick={this.changePage("versionB")}
									selected={this.state.currentPage === "versionB"}
									href="#"
								>
									Version B
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									onClick={this.changePage("adminPortal")}
									selected={this.state.currentPage === "adminPortal"}
									href="#"
								>
									Admin Portal
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
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
	currentPage: string;
}

export default App;
