import Slider from "react-slick";
import img1 from "./../../assets/images/bag.jpg"
import img2 from "./../../assets/images/chair.jpg"
import img3 from "./../../assets/images/bags.jpg"
import img4 from "./../../assets/images/gitar.jpg"


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (

    <section className="py-7 mb-5 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center items-center  ">

        {/* Slider Section */}
        <div className="w-full sm:w-3/4 md:w-2/5 lg:w-2/5">
          <Slider {...settings}>
            <div>
              <img src={img1} alt="Slide 1" className="w-full h-[400px] sm:h-[350px] md:h-[500px] object-cover " />
            </div>
            <div>
              <img src={img2} alt="Slide 2" className="w-full h-[400px] sm:h-[350px] md:h-[500px] object-cover " />
            </div>
          </Slider>
        </div>

        {/* Static Images */}
        <div className="w-full sm:w-3/4 md:w-2/5 lg:w-1/5 flex flex-col mb-[5px]">
          <img src={img3} alt="Image 3" className="w-full h-[200px] sm:h-[175px] md:h-[250px] object-cover " />
          <img src={img4} alt="Image 4" className="w-full h-[200px] sm:h-[175px] md:h-[250px] object-cover " />
        </div>

      </div>
    </section>

  );
}

