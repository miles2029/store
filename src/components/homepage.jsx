// HomePage.js
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom"; // Import Link from React Router
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/homepage.css";
import ProductCard from "./ProductCard";

function HomePage() {
  const [shoeList, setShoeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const shoeCollection = collection(db, "Shoes");
  useEffect(() => {
    const getShoeList = async () => {
      try {
        const data = await getDocs(shoeCollection);
        const shoeData = data.docs.map((doc) => doc.data());
        setShoeList(shoeData);
      } catch (err) {
        console.error(err);
      }
    };

    getShoeList();
  }, []);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="Homepage">
      <div>
        <h1>Jordan</h1>
        <p>Shoes</p>
      </div>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        selectedItem={currentIndex}
        onChange={handleSlideChange}
      >
        {shoeList.map((shoe, index) => (
          <div key={index}>
            <div>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/it-sysarch32-store-maratas.appspot.com/o/${encodeURIComponent(
                  shoe.imagePath[0]
                )}?alt=media`}
                alt={`${shoe.brand} ${shoe.name} 0`}
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div className="featured-products">
        <h3>Featured Products</h3>
        <div className="product-list">
          {shoeList.map((shoe, index) => (
            <Link key={index} to={`/product/${index}`}>
              <ProductCard
                name={shoe.name}
                price={Number(shoe.price)}
                image={`https://firebasestorage.googleapis.com/v0/b/it-sysarch32-store-maratas.appspot.com/o/${encodeURIComponent(
                  shoe.imagePath[0]
                )}?alt=media`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
