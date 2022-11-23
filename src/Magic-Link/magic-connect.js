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
        if (this.state.walletType === '') {
            web3.eth.getAccounts().then(accounts => console.log(accounts[0]));
            magic.connect.getWalletInfo().then(({ walletType }) => this.setState({ walletType }));
            console.log("walletType", this.state.walletType);
        } else if (this.state.walletType === 'magic') {
            magic.connect.showWallet().then(() => this.setState({ walletType: '' }));
        } else {
            magic.connect.disconnect().then(() => this.setState({ walletType: '' }));
        }


        return (
            <></>
        )
    }
}

export default MagicConnect;