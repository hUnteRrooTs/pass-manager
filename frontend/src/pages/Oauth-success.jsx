import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const userString =
      params.get("user");

    console.log(userString);


    if (!userString) {
      return;
    }

    const user =
      JSON.parse(userString);

    console.log(user);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    navigate("/vault");

  }, []);

  return <p>Logging in...</p>;
}
