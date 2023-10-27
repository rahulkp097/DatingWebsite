import React from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import HomeScreen from "../../components/user/Home";
import UserHomeProfileCards from "../../components/user/UserHomeProfileCards";

function UserHomeScreen() {
  const userInfoStr = localStorage.getItem("userInfo");

  return (
    <>
      {userInfoStr && <Header />}
      {userInfoStr ? <UserHomeProfileCards /> : <HomeScreen />}
      <Footer />
    </>
  );
}

export default UserHomeScreen;
