import React from 'react'
import axios from '../utils/axios';
import axiosServer2 from 'axios';
import {requests, SERVER_URL2} from '../utils/requests';
import { Link, useHistory } from 'react-router-dom';
import ChainTimelineTitle from './ChainTimelineTitle';
import { useSelector } from 'react-redux';

export default function Chain(props) {

    const chain = props.chain;
    const history = useHistory();
    const authToken = useSelector(state => state.auth.token)

    const deleteChain = () => {
        async function deleteChainData(){
            const request = await axios.delete(requests['deleteChain']+"/"+chain._id);
            return request;
        }

        deleteChainData().then((res) => {
            alert("Deleted");
            window.location.href = `/chains/manage`;
        }).catch((e)=>{
            console.log(e);
        });
    }

    const startStopChain = () => {
        async function updateChainStatus(){
            var data = {status: !chain.status}
            const url = SERVER_URL2 + requests['updateChainStatus']+"/"+chain._id;
            const request = await axiosServer2({
                method:"post",
                url:url, 
                data:data,
                headers:{
                    "Authorization":"Bearer "+authToken
                }});
            return request;
        }

        updateChainStatus().then((res) => {
            window.location.href = `/chains/manage`;
        }).catch((e)=>{
            console.log(e);
        });
    }

    return (
        <div className="card">
            <div className="card-top">
                <h1 className="sub-head-text">{chain.chainname}</h1>
                <div className={`status-icon ${chain.status? 'green':'red'}`}></div>
            </div>
            <ChainTimelineTitle frequency={chain.frequency}/>
            <h5>{chain.emailgroupid && chain.emailgroupid.groupName}</h5>
            <div className="card-footer">
                <div className="chain-icons">
                    {!chain.status?<a className="chain-icon" onClick={startStopChain}><i className="material-icons">play_arrow</i></a>:
                    <a className="chain-icon" onClick={startStopChain}><i className="material-icons">pause</i></a>}
                    <Link to={`/chains/add/${chain._id}`} className="chain-icon"><i className="material-icons">edit</i></Link>
                    <a className="chain-icon" onClick={deleteChain}><i className="material-icons">delete</i></a>
                </div>
            </div>
        </div>
    )
}