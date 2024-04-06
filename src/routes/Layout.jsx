import { Outlet, Link } from "react-router-dom";
import SideNav from "../components/SideNav";

const Layout = () => {
  return (
    <div className="App">
      <SideNav />
      <div className="rest-of-page">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
