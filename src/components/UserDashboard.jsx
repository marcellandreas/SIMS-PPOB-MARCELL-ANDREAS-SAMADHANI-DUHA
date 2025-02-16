import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { BalanceCard } from "./Card/BalanceCard";
import { HomeProfileCard } from "./Card/HomeProfileCard";
// Redux
import { fetchProfile } from "../redux/Slices/ProfileSlice";
import { fetchBalance } from "../redux/Slices/balanceSlice";

const UserDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => setShowBalance(!showBalance);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const { first_name, last_name, profile_image } = useSelector(
    (state) => state.profile
  );

  const { balance: balanceSaldo } = useSelector((state) => state.balance);
  return (
    <>
      {/* Profil Pengguna */}
      <HomeProfileCard
        firstName={first_name}
        lastName={last_name}
        profileImage={profile_image}
      />

      {/* Kotak Saldo */}
      <BalanceCard
        toggleBalance={toggleBalance}
        showBalance={showBalance}
        balanceSaldo={balanceSaldo}
      />
    </>
  );
};

export default UserDashboard;
