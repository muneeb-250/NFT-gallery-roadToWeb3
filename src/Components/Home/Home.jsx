import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import NFTCard from '../NFTCard/NFTCard';
import './index.css'

const Home = () => {
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);
    const [pageKey, setPageKey] = useState();
    const [loading, setLoading] = useState(false);

    //Fetch NFTs function
    const fetchNFTs = async () => {
        let nfts;
        setLoading(true);
        console.log("fetching nfts");
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };

        if (!collection.length) {
            const fetchURL = `${baseURL}?owner=${wallet}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        }
        // else if (!collection.length && pageKey) {
        //     const fetchURL = `${baseURL}?owner=${wallet}?pagekey=${pageKey}`;
        //     nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        // }

        else {
            console.log("fetching nfts for collection owned by address")
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        }

        if (nfts) {
            setLoading(false);
            console.log("nfts:", nfts)
            setNFTs(nfts.ownedNfts)
            setPageKey(nfts.pageKey);
        }
    }

    //Fetch NFTs for Collection function 
    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            var requestOptions = {
                method: 'GET'
            };
            const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API}/getNFTsForCollection/`;
            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
            const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
            if (nfts) {
                console.log("NFTs in collection:", nfts)
                setNFTs(nfts.nfts);

            }
        }
    }

    const handleFetch = () => {
        if (fetchForCollection) {
            fetchNFTsForCollection();
        } else {
            fetchNFTs();
        }
    }
    // https://eth-mainnet.g.alchemy.com/nft/v2/docs-demo/getNFTs?owner=0xd45058Bf25BBD8F586124C479D384c8C708CE23A&pageKey=MHgwNDE5NzkxYjc4NzRmN2JiNzE5YWNjNTIxYTRkYzhmOTVkNzg4MGQ1OjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNmU1MjpmYWxzZQ%3D%3D&pageSize=100&withMetadata=false
    const fetchNextPage = async () => {
        let nfts;
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };
        if (pageKey) {
            console.log('fetching more results')
            const fetchURL = `${baseURL}?owner=${wallet}&?pagekey=${pageKey}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        }
        if (nfts) {
            console.log("nfts:", nfts)
            setNFTs(nfts.ownedNfts);
        }
    }

    return (
        <div className="home">
            <Header />
            <h1 className='text-center text-5xl mt-10 text-gradient'>NFT GALLERY</h1>
            <div className="flex flex-col items-center justify-center py-8 gap-y-3">
                <div className="flex flex-col w-full justify-center items-center gap-y-2">
                    <input value={wallet} disabled={fetchForCollection} onChange={(e) => setWalletAddress(e.target.value)} type="text" placeholder="Add your wallet address"></input>
                    <input value={collection} onChange={(e) => setCollectionAddress(e.target.value)} type="text" placeholder="Add the collection address"></input>
                    <label className="text-white"><input type={"checkbox"} className="mr-2" value={fetchForCollection} onChange={(e) => setFetchForCollection(e.target.checked)}></input>Fetch for collection</label>
                    <button className='text-white' onClick={handleFetch}>Let's go!</button>
                </div>
            </div>
            <br />
            {loading && (<h1>Fetching...</h1>)}
            {NFTs && (
                <div className='flex-card'>
                    {NFTs.length && NFTs.map(nft => (
                        <NFTCard nft={nft} />
                    ))}
                </div>
            )}


            {
                pageKey ? <button onClick={fetchNextPage}>Next Page</button> : <h1>end of results</h1>
            }
        </div >
    )
}

export default Home;