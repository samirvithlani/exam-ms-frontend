import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

export const Wallet = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
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

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            {loading ? (
                <Typography variant="subtitle1" fontStyle="italic">
                    Loading...
                </Typography>
            ) : (
                data && (
                    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" margin="10px 0">
                            Transaction History: {data.Transcation_history}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" margin="10px 0">
                            Transaction ID: {data.TranscationId}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" margin="10px 0">
                            Wallet Token: {data.wallet.token}
                        </Typography>
                    </div>
                )
            )}
        </div>
    );
};
