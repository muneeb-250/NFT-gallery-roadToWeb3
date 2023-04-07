import React from 'react'
import './index.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Header = () => {
    return (
        <div className="header">
            <h1>MuniArtz</h1>
            <ConnectButton accountStatus="avatar" showBalance={false} />
        </div>
    )
}

export default Header