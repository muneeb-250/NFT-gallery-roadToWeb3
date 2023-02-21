import React from 'react'
import './index.css'
const NFTCard = ({ nft }) => {
    const descSlicer = desc => {
        const words = desc.split(' ');
        const slicedWords = words.slice(0, 12);
        const result = slicedWords.join(' ');
        return result;
    }
    return (
        <div className="card">
            <div className="card__image">
                <img src={nft.media[0].gateway} alt="nft__image" />
            </div>
            <div className="card__info">
                <div className="card__title">{nft.title}</div>
                <div className="card__id">Id: {nft.id.tokenId.slice(-4)}</div>
                <div className="card__contract">{`${nft.contract.address.slice(0, 5)}...${nft.contract.address.slice(-4)}`}</div>
            </div>
            <div className="card__description">
                <strong>Description: <br /></strong>
                {descSlicer(nft.description)}...
            </div>
            <a target="_blank" href={`https://etherscan.io/token/${nft.contract.address}`} className="nft__link">View on Etherscan</a>
        </div>
    )
}

export default NFTCard;