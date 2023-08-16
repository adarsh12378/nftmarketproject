import { useEffect, useState } from 'react'
import styles from '../page.module.css'
import Link from 'next/link';
const NftCard: React.FC = (props:any) => {
    console.log(props);
    
    const tokenId = props.tokenId;
    console.log(tokenId)
    console.log(typeof tokenId)

  const [nftList,setNftList] = useState<any[]>([]);

 
  async function fetchData() {


    const apiKey = "2f529f33-de82-4e8e-a3cd-abc51cf253bd";
    const response = await fetch("https://api.rarible.org/v0.1/items/byCollection?collection=ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

   
    const nftDataJSON = await response.json();
    setNftList(nftDataJSON.items); 

    console.log(nftList);
  }
  useEffect(() =>{
    async function fetchData() {
      
    }
    
  },[])
fetchData();
  return (
    <div className={styles.container2}>
    <div className={styles.cardContainer}>
      
    {nftList?.map((nft, key) => (
          <Link href={`/${nft.id}`} key={key}>

            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={nft.meta?.content[0]?.url} alt={nft.meta?.name} />
              </div>
              <div className={styles.metaData}>
                <p>{nft.meta?.name}</p>
              </div>
            </div>
          </Link>
        ))}
        
      
    </div>
  </div>
  )
}

export default NftCard
