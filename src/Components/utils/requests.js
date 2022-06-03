export const SITE_URL = process.env.REACT_APP_SITE_URL;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_URL2 = process.env.REACT_APP_SERVER_URL2;

export const requests = {
	fetchUserChains: '/chains',
	doLogin: '/login',
	doRegister: '/register',
	doOAuthLogin: '/oauthlogin',
	createEmailGroup: '/email-group',
	getEmailGroups: '/email-group',
	deleteEmailGroup: '/email-group',
	updateEmailGroup: '/email-group',
	doLogout: '/logout',
    fetchChainById: '/chains',
    fetchEmailGroups: '/email-group',
    createNewChain: '/chains',
    updateChain: '/chains',
	deleteChain: '/chains',
	addMailCred: '/addmailcred',
	getMailCred: '/users/getcred',
	updateChainStatus: '/chain/updatestatus',
};
