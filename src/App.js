import './static/templates/styles.css';
import Dashboard from './Components/DashboardComps/Dashboard';
import Footer from './Components/Footer';
import CustomNavbar from './Components/NavBar/CustomNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageChains from './Components/ChainComps/ManageChains';
import ManageEmails from './Components/EmailComps/ManageEmails';
import CreateEmail from './Components/EmailComps/CreateEmail';
import CreateChain from './Components/ChainComps/CreateChain';
import EditEmail from './Components/EmailComps/EditEmail';
import HandleLogin from './Components/LoginComps/HandleLoginPanels';
import AddMailCred from './Components/MailComps/AddMailCred';
import Loader from './Components/Loader';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route
						path='/login'
						exact
						render={(props) => <HandleLogin loginPanel {...props} />}
					/>
					<Route
						path='/register'
						exact
						render={(props) => <HandleLogin {...props} />}
					/>
					<Route path='/'>
						<Loader/>
						<CustomNavbar />
						<Switch>
							<Route path='/' exact component={Dashboard}></Route>
							<Route path='/chains/manage' exact component={ManageChains}></Route>
							<Route path='/email/edit/:id' exact component={EditEmail} />
							<Route path='/email/manage' exact component={ManageEmails}></Route>
							<Route path='/email/add' exact component={CreateEmail}></Route>
							<Route path='/chains/add/:chainId?' exact component={CreateChain}></Route>
              				<Route path='/mailcred' exact component={AddMailCred}></Route>
						</Switch>
						<Footer />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
