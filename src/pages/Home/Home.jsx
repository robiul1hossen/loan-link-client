import Banner from "../../components/Banner";
import AvailableLoans from "../../components/AvailableLoans";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Banner />
      <AvailableLoans />
    </div>
  );
};

export default Home;
