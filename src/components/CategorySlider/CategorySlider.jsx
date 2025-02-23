import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const { data } = useQuery("Categories", getAllCategory);

  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          dots: false, // Optionally hide dots on small screens
        },
      },
    ],
  };
  return (

    <Slider {...settings}>
      {data?.data.data.map((item, idx) => (
        <div key={idx} className="mt-2  ">
          {/* Responsive Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover "
          />

          {/* Responsive Title */}
          <h1 className="font-medium text-lg sm:text-xl md:text-2xl mt-2 ms-3">
            {item.name}
          </h1>
        </div>
      ))}
    </Slider>

  );
}

