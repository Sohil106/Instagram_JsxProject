import Explore from "./Explore";
import HomeLayout from "../../layouts/HomeLayout";

const Home = () => {
  return (
    <HomeLayout>
      <div className="app-container overflow-hidden">
        <Explore />
      </div>
    </HomeLayout>
  );
};

export default Home;
