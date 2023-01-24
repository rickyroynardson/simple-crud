import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Authed() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!user) {
    return <Loading />;
  }
  return <Outlet />;
}
