import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";
import HowItWorks from "../HowItWorks ";
import CustomerFeedback from "../../components/CustomerFeedback ";
import WhyChooseLoanLink from "../../components/WhyChooseLoanLink ";
import GetStartedCTA from "../../components/GetStartedCTA ";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <CustomerFeedback />
      <WhyChooseLoanLink />
      <GetStartedCTA />
    </>
  );
};

export default Home;
