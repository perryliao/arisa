import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import {defaultDatabase, IDatabase, IPartner, IUser, partnerName, userName} from "./data/database";

class App extends React.Component<IAppProps, IAppState> {

	public state: IAppState = {
		database: defaultDatabase,
		partnerKey: partnerName.RBC,
		userKey: userName.MICHELLE,
	};

	constructor(props: IAppProps) {
		super(props);
	}

	private async loginUser(username: string, password: string): Promise<boolean> {
		const user: IUser = this.state.database.partners[this.state.partnerKey].users[username];
		return !(user === undefined || user.password !== password);
	}

	private async loginPartner(username: string, password: string): Promise<boolean> {
		return true;
	}


	public render() {
		return (
			<div className="App">

				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to React</h1>
				</header>
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
}

export default App;
