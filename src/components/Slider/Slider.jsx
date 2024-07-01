import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomeSlider() {
  const data = [
    "https://d6ea5r7lgkrij.cloudfront.net/media/catalog/product/cache/8c7fb13ab07a7e3af1902c979353f9fe/a/l/alexie_men_navy_landscape_1920x1080_1.jpg",
    "https://d6ea5r7lgkrij.cloudfront.net/media/catalog/product/cache/8c7fb13ab07a7e3af1902c979353f9fe/a/l/alexie_wmn_milk_landscape_1920x1080_1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zaFxkuAWGDiDFwxOaNqT_6YgCUgWeuRYtA&s",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {data.map((imageUrl, index) => (
        <div key={index}>
          <img className='w-full h-[500px]' src={imageUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}

export default HomeSlider;
