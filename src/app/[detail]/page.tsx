'use client'
import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import NftCard from '../NftData/NftCard';

interface NftDetailPageProps {
  params: { id: string }; // Accept the id as a prop
}

const NftDetailPage: React.FC<NftDetailPageProps> = ({ params }: { params: { id: string } }) => {
  const [nftDetail, setNftDetail] = useState<any | null>(null);
// let id=params.detail;
// console.log(id);
// let id2 = "";
// for(let i=0;i<id.length;i++){
//     if(id[i]=='%' && i < 10){
//         id2+=':';
//     }else{
//         id2+=id[i];
//     }
// }

  async function fetchNftDetail() {
    const apiKey = "2f529f33-de82-4e8e-a3cd-abc51cf253bd";
    const response = await fetch(`https://api.rarible.org/v0.1/items/ETHEREUM:0xb66a603f4cfe17e3d27b87a8bfcad319856518b8:32292934596187112148346015918544186536963932779440027682601542850818403729410

    `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    const nftDetailData = await response.json();
    setNftDetail(nftDetailData);
  }

  useEffect(() => {
    fetchNftDetail();
  }, [params.id]); // Include params.id in the dependency array

  return (
    <div className={styles.container}>
      {nftDetail ? (
        <div className={styles.detailCard}>
          <div className={styles.imageContainer}>
            <img src={nftDetail.meta?.content[0]?.url} alt={nftDetail.meta?.name} />
          </div>
          <div className={styles.metaData}>
            <p> Name:{nftDetail.meta?.name}</p>
            <p>Description: {nftDetail.meta?.description}</p>
            <NftCard/>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NftDetailPage;
