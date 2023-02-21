import React, { useState } from 'react'
import Header from '../Header/Header'
import './index.css'

const Home = () => {
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const fetchNFTs = async () => {
        let nfts;
        console.log("fetching nfts");
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };

        if (!collection.length) {

            const fetchURL = `${baseURL}?owner=${wallet}`;

            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        } else {
            console.log("fetching nfts for collection owned by address")
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        }

        if (nfts) {
            console.log("nfts:", nfts)
            setNFTs(nfts.ownedNfts)
        }
    }
    return (
        <div className="home">
            <Header />
            <h1 className='text-center text-3xl mt-10 text-white'>NFT GALLERY</h1>
            <div className="flex flex-col items-center justify-center py-8 gap-y-3">
                <div className="flex flex-col w-full justify-center items-center gap-y-2">
                    <input value={wallet} onChange={(e) => setWalletAddress(e.target.value)} type="text" placeholder="Add your wallet address"></input>
                    <input value={collection} onChange={(e) => setCollectionAddress(e.target.value)} type="text" placeholder="Add the collection address"></input>
                    <label className="text-white"><input type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
                    <button className='text-white' onClick={fetchNFTs}>Let's go! </button>
                </div>
            </div>
        </div>
    )
}

export default Home