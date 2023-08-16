"use client"
import {useState,useEffect} from "react";
import Axios from "axios";
import NftCard from '../NftCard';
import styles from "../../page.module.css";


export default function NftPage({params}:string){
    const [collectionData,setCollectionData] = useState({});
    useEffect(() =>{
        async function fetchData() {
            console.log("fetching data");
        console.log(params);
        
        const apiKey = "2f529f33-de82-4e8e-a3cd-abc51cf253bd";
        const response = await fetch(`https://api.rarible.org/v0.1/collections/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        });
        const data = await response.json();

        setCollectionData(data);
    
        console.log(data);
        
        }
        fetchData();
    },[]);
    return(
        <div>
            
            <div className={styles.bg}>
            <img src={collectionData.meta?.content[0]?.url} alt={collectionData.name} />

            </div>
           <div className={styles.container}>
            <h2 > Name:{collectionData.name}</h2>
            <div>
                <p>owner:{collectionData.owner}</p>
            </div>
            <div>
                <p>Structure:{collectionData.Structure}</p>
            </div>
            <div>
                <p>Status:{collectionData.status}</p>
            </div>
            <div>
                <p>Symbol:{collectionData.symbol}</p>
            </div>
            <div className={styles.des}>
                <p>{collectionData.meta?.description}</p>  
            </div>

            </div>
           <NftCard tokenId={collectionData.id}/>
        </div>
    );
}