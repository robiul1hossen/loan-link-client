import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";
import HowItWorks from "../HowItWorks ";
import CustomerFeedback from "../../components/CustomerFeedback ";
import WhyChooseLoanLink from "../../components/WhyChooseLoanLink ";
import GetStartedCTA from "../../components/GetStartedCTA ";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <CustomerFeedback />
      <WhyChooseLoanLink />
      <GetStartedCTA />
    </div>
  );
};

export default Home;
