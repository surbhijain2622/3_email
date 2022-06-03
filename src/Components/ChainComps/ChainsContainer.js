import {React, useState, useEffect} from 'react'
import axios from '../utils/axios';
import {requests} from '../utils/requests';
import Chain from './Chain';
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
} from "../../store/modules/application/app.action";

export default function ChainsContainer() {
    
    const [chains, setChains] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchChains(){
            dispatch(showLoader());
            const request = await axios.get(requests['fetchUserChains']);
			return request;
        }
        fetchChains().then((res) => {
			const data = res.data.chains;
			setChains(data);
	  		console.log(data);
            dispatch(hideLoader());
		}).catch((e)=>{
			console.log(e);
			setChains([]);
            dispatch(hideLoader());
		});
    }, []);

    return (
        <div className="inner">
            <h1>Manage Chains</h1>
            <div className="cards-container">
                {chains && chains.map((chain, index) => <Chain chain={chain}/>)}
                <div className="card add-icon-card">
                    <div className="add-icon">
                        <Link to="/chains/add"><i className="material-icons">
                            add_circle
                        </i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
