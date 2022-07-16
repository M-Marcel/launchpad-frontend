import React from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";


export default function useGetNativeBalance() {
    const { user, isInitialized } = useMoralis();
    const [nativeBalance, setNativeBalance] = React.useState(0);
    const Web3Api = useMoralisWeb3Api();
    React.useEffect(() => {
        const fetchNativeBalance = async () => {
            // get BSC native balance for a given address
            const options = {
                chain: process.env.REACT_APP_NET_ID,
                address: user?.get("ethAddress")
            };
            const bscBalance = await Web3Api.account.getNativeBalance(options);
            setNativeBalance(bscBalance.balance);
        };
        if (isInitialized && user) {
            fetchNativeBalance();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return nativeBalance;
}
