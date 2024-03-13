import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

export const Wallet = () => {
    const [data, setData] = useState(null);
    const [credit, setCredit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        wallet();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/transcation/${Cookies.get('_id')}`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const wallet = async () => {
        try {
            const response = await axios.get(`/user/${Cookies.get('_id')}`)
            setCredit(response.data.wallet.token)
        } catch (error) {
            console.log(error, "error");
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            {loading ? (
                <Typography variant="subtitle1" fontStyle="italic">
                    Loading...
                </Typography>
            ) : (
                data && data.length > 0 ? (
                    <div style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}>
                        <Typography variant="h6" fontWeight="bold" margin="10px 0">
                            Total Credit : {credit}
                        </Typography>
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
                )
            )}
        </div>
    );
};
