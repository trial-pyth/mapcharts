import Charts from "../charts/Charts";
import Header from "../header/Header";
import Map from "../map/Map";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="mapCharts">
        <div className="map-container">
          <Map />
        </div>
        <div className="chart-container">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default Home;
