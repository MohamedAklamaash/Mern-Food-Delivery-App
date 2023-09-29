import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../components/Footer";
import CardComponent from "../components/Card";
const Home = () => {
  const [fooditems, setfooditems] = useState([]);
  const [foodcategory, setfoodcategory] = useState([]);
  const [index, setIndex] = useState(0);
  const [search, setsearch] = useState("")
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/Food/food_items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[0], response[1]);
    setfooditems(response[0]);
    setfoodcategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{ objectFit: "contain" }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?burger"
              alt="First slide"
              style={{ width: "900px", height: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?pizza"
              alt="Second slide"
              style={{ width: "900px", height: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?pasta"
              alt="Third slide"
              style={{ width: "900px", height: "500px", objectFit: "cover" }}
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <form className=" d-flex align-content-center justify-content-center mt-3  ">
        <input
          type="search"
          placeholder="Search..."
          onChange={(event) => setsearch(event.target.value)}
          style={{ zIndex: "10px",width:"80%" }}
          className="h-300"
        />
        <button type="submit" className=" bg-success z-3">
          Search
        </button>
      </form>
      <div className="container">
        {foodcategory !== []
          ? foodcategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3 ">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditems !== []
                    ? fooditems
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              key={filteritems._id}
                              className="col-12 col-md-6 col-lg-3 "
                            >
                              <CardComponent
                                fooditems={filteritems}
                                options={filteritems.options[0]}
                              />
                            </div>
                          );
                        })
                    : " "}
                </div>
              );
            })
          : " "}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
