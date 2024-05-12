import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";
import "../css/product-detail.css";
import { Link } from "react-router-dom";

function ProductDetailPage({ onAddToCart, cartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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

  const handleSizeSelect = (index) => {
    setSelectedSize(product.sizes[index]);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const newItem = {
      id: id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      size: selectedSize,
      imagePath: product.imagePath[0],
    };

    onAddToCart(newItem);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="Homepage">
        <div>
          <div>
            <Link to="/product" className="link">
              <h1>Jordan</h1>
            </Link>
            <p>Shoes</p>
          </div>
          <div>
            <Link to="/cart" className="link">
              <button>
                Cart {cartItems.length !== 0 ? `(${cartItems.length})` : ""}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="ProductDetailPage">
        {showAlert && <div className="alert">Item added to cart!</div>}
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
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <div className="size-buttons">
              <p>Size:</p>
              {product.sizes.map((size, index) => (
                <button
                  key={size}
                  className={`size-button ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleSizeSelect(index)}
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
    </>
  );
}

ProductDetailPage.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default ProductDetailPage;
