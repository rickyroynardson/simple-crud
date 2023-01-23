import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Guest() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, []);

  if (auth) {
    return <Loading />;
  }
  return <Outlet />;
}
