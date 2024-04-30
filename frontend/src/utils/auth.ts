import { useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

function useAuth() {
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      Router.push("/login");
    }
  }, []);
}
