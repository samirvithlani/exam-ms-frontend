import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

export const Wallet = () => {
    const [data, setData] = useState(null);
    const [credit, setCredit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestingCredit, setRequestingCredit] = useState(false);
    const [enteredCredit, setEnteredCredit] = useState("");
    const[userdata,setUserdata] = useState([''])
    const user = Cookies.get('_id')
    useEffect(() => {
        fetchData();
        wallet();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/transcation/${user}`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const wallet = async () => {
        try {
            const response = await axios.get(`/user/${user}`)
            setCredit(response?.data?.wallet?.token)
            setUserdata(response.data)
        } catch (error) {
            console.log(error, "error");
        }
    }

    const handleRequestCredit = () => {
        setRequestingCredit(true);
    }

    const handleCreditInputChange = (event) => {
        setEnteredCredit(event.target.value);
    }

    const handleSubmitCredit = async() => {
        console.log("Entered Credit:", enteredCredit);
        try {
            const data = {user:user,requestedCredit:Number(enteredCredit)};
            const response = await axios.post("http://localhost:3000/credit",data)
            const tran = {user:user,walletType:userdata.wallet.walletType,wallet:userdata.wallet._id,Transcation_history:`Request ${enteredCredit} credit `}
            const transction = await axios.post('/transcation',tran)
        } catch (error) {
            console.log(error,"error");
        }
        setRequestingCredit(false);
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            {loading ? (
                <Typography variant="subtitle1" fontStyle="italic">
                    Loading...
                </Typography>
            ) : (
                <>
                    {requestingCredit && (
                        <div>
                            <input type="text" value={enteredCredit} onChange={handleCreditInputChange} />
                            <button onClick={handleSubmitCredit}>Submit</button>
                        </div>
                    )}
                    {credit !== null && (
                        <>
                            <Typography variant="h6" fontWeight="bold" margin="10px 0">
                                Total Credit : {credit}
                            </Typography>
                            <button onClick={handleRequestCredit}>Request Credit</button>
                        </>
                    )}
                    {data && data.length > 0 ? (
                        <div style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}>
                            <Typography variant="h6" fontWeight="bold" margin="10px 0">
                                Transaction History
                            </Typography>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {data.map(transaction => (
                                    <li key={transaction._id}>
                                        <Typography variant="subtitle1">
                                            Transaction ID: {transaction.TranscationId}
                                        </Typography>
                                        <Typography variant="body1">
                                            History: {transaction.Transcation_history}
                                        </Typography>
                                        <hr style={{ margin: '10px 0' }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <Typography variant="subtitle1">
                            No data found.
                        </Typography>
                    )}
                </>
            )}
        </div>
    );
};
