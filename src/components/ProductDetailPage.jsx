import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";
import "../css/product-detail.css";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const shoeCollection = collection(db, "Shoes");
    const getProduct = async () => {
      try {
        const data = await getDocs(shoeCollection);
        const shoeData = data.docs.map((doc) => doc.data());
        if (id >= 0 && id < shoeData.length) {
          setProduct(shoeData[id]);
        } else {
          console.log("Product not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    console.log(`Added ${product.name} (Size: ${selectedSize}) to cart`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="ProductDetailPage">
      <div className="product-info">
        <div className="image-container">
          <img
            className="big-image"
            src={`https://firebasestorage.googleapis.com/v0/b/it-sysarch32-store-maratas.appspot.com/o/${encodeURIComponent(
              currentImage || product.imagePath[0]
            )}?alt=media`}
            alt={`${product.brand} ${product.name}`}
          />
          <div className="thumbnail-container">
            {product.imagePath.map((image, index) => (
              <img
                key={index}
                className="thumbnail"
                src={`https://firebasestorage.googleapis.com/v0/b/it-sysarch32-store-maratas.appspot.com/o/${encodeURIComponent(
                  image
                )}?alt=media`}
                alt={`${product.brand} ${product.name} ${index}`}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Brand: {product.brand}</p>
          <div className="size-buttons">
            {["7", "8", "9", "10", "11", "12", "13"].map((size) => (
              <button
                key={size}
                className={`size-button ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
