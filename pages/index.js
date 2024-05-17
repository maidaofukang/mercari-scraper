import { useState } from 'react';

export default function Home() {
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState(null);

  const fetchProductInfo = async () => {
    if (!productId) return;
    const res = await fetch(`/api/product?id=${productId}`);
    const data = await res.json();
    setProductInfo(data);
  };

  return (
    <div>
      <h1>Mercari Product Scraper</h1>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
      />
      <button onClick={fetchProductInfo}>Fetch Product Info</button>
      {productInfo && (
        <div>
          <h2>{productInfo.name}</h2>
          <img src={productInfo.mainImage} alt={productInfo.name} />
          <p>Price: {productInfo.price}</p>
          <p>Sold: {productInfo.sold ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
