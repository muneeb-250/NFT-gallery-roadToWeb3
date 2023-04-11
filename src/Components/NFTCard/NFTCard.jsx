import React from 'react'
import './index.css'
import CopyIcon from '../../assets/copy.png';
// address for challenge 2: 0x38140b7F622E5C3c2F11d4531718B6ED892bD235
const NFTCard = ({ nft }) => {
    const descSlicer = desc => {
        const words = desc.split(' ');
        const slicedWords = words.slice(0, 12);
        const result = slicedWords.join(' ');
        return result;
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(nft.contract.address)
            .then(() => {
                alert("Address copied to clipboard");
            })
            .catch((error) => {
                console.error("Failed to copy address: ", error);
            });
    }
    return (
        <div className="card shadow-lg">
            <div className="card__image">
                <img src={nft.media[0].gateway} alt={nft.title} />
            </div>
            <div className="card__info">
                <div className="card__title">{nft.title}</div>
                <div className="card__id">Id: {nft.id.tokenId.slice(-4)}</div>
                <div className="card__contract">{`${nft.contract.address.slice(0, 5)}...${nft.contract.address.slice(-4)}`}</div>
            </div>
            <div className="card__description">
                <strong>Description: <br /></strong>
                {descSlicer(nft.description)}...
                <img src={CopyIcon} alt="copy-address" onClick={handleCopy} className="card__img" />
            </div>






            <a target="_blank" href={`https://etherscan.io/token/${nft.contract.address}`} className="nft__link bg-indigo-500 hover:bg-indigo-600 duration-300 transition-all">View on Etherscan</a>
        </div>
    )
}

export default NFTCard;