import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";
import HowItWorks from "../HowItWorks ";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Banner />
      <AvailableLoans />
      <HowItWorks />
    </div>
  );
};

export default Home;
