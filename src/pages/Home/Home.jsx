import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Banner />
      <AvailableLoans />
    </div>
  );
};

export default Home;
