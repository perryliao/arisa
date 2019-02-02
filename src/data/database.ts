export interface IDatabase {
	partners: {
		[key: string] : IPartner
	}
}

export interface IPartner {
	name: string
	users: {[key: string]: IUser},
	catalogue: {[key: string]: any},
	logo: string,
	primaryColour: string,
	secondaryColour: string,
	pointsToDollar: number,
	transactionEndpoint: string,
	loginEndpoint: string,
}

export interface IUser {
	password: string,
	balance: number,
}

export enum userName {
	CHRISTOPHER = "Christopher",
	SPENCER = "Spencer",
	MICHELLE = "Michelle",
	PERRY = "Perry",
	JERRY = "Jerry",
}

export enum partnerName {
	RBC = "Royal Bank of Canada",
	TD = "TD Canada",
	SCOTIABANK = "Scotiabank",
}

const defaultUser: IUser = {
	password: "1234",
	balance: 10000,
};

const defaultUsers: {[key: string]: IUser} = {
	[userName.CHRISTOPHER]: defaultUser,
	[userName.SPENCER]: defaultUser,
	[userName.MICHELLE]: defaultUser,
	[userName.PERRY]: defaultUser,
	[userName.JERRY]: defaultUser,
};

const defaultCatalogue: any = {};

const defaultPartner: IPartner = {
	name: partnerName.RBC,
	users: defaultUsers,
	catalogue: defaultCatalogue,
	logo: "/logo.svg",
	primaryColour: "#002aff",
	secondaryColour: "#ffbc06",
	pointsToDollar: 100,
	transactionEndpoint: "www.partner-website.com/transaction-endpoint",
	loginEndpoint: "www.partner-website.com/login-endpoint",
};

export const defaultDatabase: IDatabase = {
	partners: {
		[partnerName.RBC]: defaultPartner,
		[partnerName.TD]: defaultPartner,
		[partnerName.SCOTIABANK]: defaultPartner,
	}
};