import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";
import HowItWorks from "../HowItWorks ";
import CustomerFeedback from "../../components/CustomerFeedback ";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <CustomerFeedback />
    </div>
  );
};

export default Home;
