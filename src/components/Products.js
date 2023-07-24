import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./smallcomps/productcard";
import axios from "axios";
import Header from "./Header";
import { RiFilter2Line, RiSearch2Line } from "react-icons/ri";
import SideNav from "./smallcomps/sidebar";
import Grid from "@mui/material/Grid";
import { Cart } from "./context";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({
    priceRange: [],
    colors: [],
    type: [],
    gender: [],
    search: ""
  });
  const [searchitem, setSearchitem] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { dispatch } = useContext(Cart);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
    dispatch({
      type: "addToCart",
      payload: product
    });
  };

  const performApi = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      setProducts(res.data);
      setAllData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtercomponents = () => {
    let filterItems = products;
    const searchName = filteredProducts.search.toLowerCase();
    const searchParams = ["color", "gender", "name", "price"];
    if (filteredProducts.search) {
      filterItems = filterItems.filter((i) =>
        searchParams.some((k) => {
          const property = i[k];
          if (typeof property === "string") {
            return property.toLowerCase().includes(searchName);
          } else if (typeof property === "number") {
            return property.toString().toLowerCase().includes(searchName);
          }
          return false;
        })
      );
    }
    if (filteredProducts.gender.length) {
      filterItems = filterItems.filter((i) =>
        filteredProducts.gender.includes(i.gender.toLowerCase())
      );
    }
    if (filteredProducts.type.length) {
      filterItems = filterItems.filter((i) =>
        filteredProducts.type.includes(i.type.toLowerCase())
      );
    }
    if (filteredProducts.colors.length) {
      filterItems = filterItems.filter((i) =>
        filteredProducts.colors.includes(i.color.toLowerCase())
      );
    }
    if (filteredProducts.priceRange.length) {
      filterItems = filterItems.filter((i) => {
        const priceItem = i.price;
        return filteredProducts.priceRange.some((r) => {
          const { minPrice, maxPrice } = JSON.parse(r);
          return priceItem >= minPrice && priceItem <= maxPrice;
        });
      });
    }
    setAllData(filterItems);
  };

  const sidenavColor = (e) => {
    let fitems = [...filteredProducts.colors];
    if (e.target.checked) fitems = [...filteredProducts.colors, e.target.value];
    else fitems.splice(filteredProducts.colors.indexOf(e.target.value), 1);
    setFilteredProducts({ ...filteredProducts, colors: fitems });
  };
  const sidenavPrice = (e) => {
    let fitems = [...filteredProducts.priceRange];
    if (e.target.checked)
      fitems = [...filteredProducts.priceRange, e.target.value];
    else fitems.splice(filteredProducts.priceRange.indexOf(e.target.value), 1);
    setFilteredProducts({ ...filteredProducts, priceRange: fitems });
  };
  const sidenavGender = (e) => {
    let fitems = [...filteredProducts.gender];
    if (e.target.checked) fitems = [...filteredProducts.gender, e.target.value];
    else fitems.splice(filteredProducts.gender.indexOf(e.target.value), 1);
    setFilteredProducts({ ...filteredProducts, gender: fitems });
  };
  const sidenavType = (e) => {
    let fitems = [...filteredProducts.type];
    if (e.target.checked) fitems = [...filteredProducts.type, e.target.value];
    else fitems.splice(filteredProducts.type.indexOf(e.target.value), 1);
    setFilteredProducts({ ...filteredProducts, type: fitems });
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    performApi();
  }, []);
  useEffect(() => {
    filtercomponents();
    console.log(allData);
  }, [filteredProducts]);

  return (
    <div className="main-container">
      <Header cartItems={cartItems} />
      <div className="searchRow">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) =>
              setFilteredProducts({
                ...filteredProducts,
                search: e.target.value
              })
            }
            value={filteredProducts.search}
          />
          <div className="search-icon">
            <RiSearch2Line />
          </div>
          <div className="filter-icon">
            <RiFilter2Line onClick={() => setShowSidebar(!showSidebar)} />
          </div>
        </div>
      </div>
      <div className="home-container">
        <Grid container spacing={2}>
          {/* Sidebar */}
          {showSidebar && (
            <Grid item xs={6} md={4}>
              <SideNav
                showSidenav={showSidebar}
                setShowSidenav={setShowSidebar}
                sidenavColor={sidenavColor}
                sidenavGender={sidenavGender}
                sidenavType={sidenavType}
                sidenavPrice={sidenavPrice}
              />
            </Grid>
          )}

          <Grid item xs={6} md={8}>
            <div className="parentProduct">
              <Grid container spacing={0}>
                {allData &&
                  allData.map((product) => (
                    <Grid item xs={12} md={4} lg={4} key={product.id}>
                      <ProductCard
                        productInfo={product}
                        handleAddToCart={handleAddToCart}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Products;
