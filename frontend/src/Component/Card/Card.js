import React, { useEffect } from "react";
import "./Card.css";
import { formatIndianRupee, getImage } from "../../Helper/utills";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom'
export default function Card(props) {
  // const [name,color,price]
  const { images, price, name, color,_id } = props.data;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  const navigate=useNavigate()

  return (
    <>
      {props.data && (
        <div className="p-card " data-aos="zoom-in">
          <div className="" onClick={()=>{navigate("/productDetails/"+_id)}}>
            <Slider {...settings}>
              {images.length &&
                images.map((img, i) => {
                  return (
                    <div>
                      <img src={getImage(img)} className="c-card-img" alt="" />
                    </div>
                  );
                })}
            </Slider>

          <h1 className="p-card-name pb-2 ">{name}</h1>
          <h1 className="p-card-color pb-2">({color})</h1>
          <h6 className="p-card-price pb-2">{formatIndianRupee(price)}</h6>
          </div>

          <div className="container-fluid">
          <div className="row p-1 ">
            <div className="col-12">
              <button className="btn btn-dark rounded-0 w-100 ">
                Contact Us
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
