import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  }, []);
  return (
    <section>
      <h1>Unauthorized</h1>
      <p>Redirecting...</p>
      <br />
    </section>
  );
};

export default Error;
