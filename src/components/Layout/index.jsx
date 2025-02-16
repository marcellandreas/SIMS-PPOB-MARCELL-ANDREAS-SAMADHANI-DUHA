import PropTypes from "prop-types";
import Navbar from "../Navbar";
import UserDashboard from "../UserDashboard";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-5 px-2 grid grid-cols-1 md:grid-cols-12 gap-y-20 flex-grow  justify-center  ">
        <>
          <UserDashboard />
        </>
        {children}
      </main>
      {/* <Footer/> */}
    </>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
