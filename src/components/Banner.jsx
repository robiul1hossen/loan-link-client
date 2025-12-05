import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../assets/hand-5815508_640.jpg";
import img2 from "../assets/coin.jpg";
import img3 from "../assets/istockphoto-1374485787-612x612.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current?.style?.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper">
        <SwiperSlide>
          <div className="w-full h-[350px] bg-base-200">
            <div className="container mx-auto flex flex-col md:flex-row items-center py-16 px-6 gap-10">
              {/* Left Text Section */}
              <div className="flex-1 space-y-4">
                <h2 className="text-4xl font-bold text-primary">
                  Need a Quick Micro Loan?
                </h2>
                <p className="text-lg text-gray-600">
                  Fast approval, simple requirements, and trusted service.
                  Empower your financial journey with hassle-free micro loans.
                </p>

                <div className="flex gap-4 pt-3">
                  <Link to="/apply-loan" className="btn btn-primary btn-lg">
                    Apply for Loan
                  </Link>
                  <Link
                    to="/loans"
                    className="btn btn-outline btn-primary btn-lg">
                    Explore Loans
                  </Link>
                </div>
              </div>

              {/* Right Image Section */}
              <div className="flex-1">
                <img
                  src={img1}
                  alt="Loan Banner"
                  className="rounded-xl shadow-xl object-cover h-[250px]"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[350px] bg-linear-to-r from-purple-600 to-pink-500 text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center py-20 px-6 gap-12">
              {/* Text Section */}
              <div className="flex-1 space-y-4">
                <h2 className="text-4xl font-bold">
                  Instant Micro Loans for Your Daily Needs
                </h2>
                <p className="text-lg opacity-90">
                  Get approved in minutes. No hidden fees. 100% online
                  processing.
                </p>

                <div className="flex gap-4 pt-3">
                  <Link to="/apply-loan" className="btn btn-secondary btn-lg">
                    Apply for Loan
                  </Link>
                  <Link
                    to="/loans"
                    className="btn btn-outline btn-white btn-lg">
                    Explore Loans
                  </Link>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex-1">
                <img
                  src={img2}
                  alt="Loan Process"
                  className="rounded-xl shadow-xl object-cover h-[250px]"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${img3})` }}>
            <div className="bg-black opacity-[0.75] w-full h-full">
              <div className="container mx-auto py-24 px-6 flex flex-col items-start gap-5">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Your Small Loan, Big Possibilities
                </h2>

                <p className="text-lg text-gray-200 max-w-xl">
                  Affordable, fast, and secure micro loans built for everyone.
                  Get instant approval and start improving your financial
                  future.
                </p>

                <div className="flex gap-4 pt-4">
                  <Link to="/apply-loan" className="btn btn-success btn-lg">
                    Apply for Loan
                  </Link>
                  <Link
                    to="/loans"
                    className="btn btn-outline btn-success btn-lg">
                    Explore Loans
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
