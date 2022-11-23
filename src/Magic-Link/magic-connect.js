import React, { Component } from 'react';
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

const customNodeOptions = {
    rpcUrl: 'https://polygon-rpc.com/',
    chainId: 137
};

const magic = new Magic('pk_live_99BB6538A84A80DD', {
    extensions: [new ConnectExtension()],
    network: customNodeOptions,
});

const web3 = new Web3(magic.rpcProvider);




class MagicConnect extends Component {
    constructor(props) {
        super(props);
        this.state = { walletType: '' };
    }


    render() {
        web3.eth.getAccounts().then(accounts => console.log(accounts[0]));
        magic.connect.getWalletInfo().then(({ walletType }) => this.setState({ walletType }));
        magic.connect.showWallet();
        return (
            <></>
        )
    }
}

export default MagicConnect;