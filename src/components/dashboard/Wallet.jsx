import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

export const Wallet = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let response = await axios.get(`/transcation/${id}`);
            console.log(response.data.wallet.token, "response");
            setData(response.data);
        } catch (error) {
            console.error(error, "error");
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const id = Cookies.get('_id');

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h1>Transaction History: {data.Transcation_history}</h1>
                    <h1>Transaction ID: {data.TranscationId}</h1>
                    <h1>Token: {data.wallet.token}</h1>
                </div>
            )}
        </div>
    );
};
