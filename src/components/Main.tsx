import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRevalidator } from "react-router-dom";

function Main({ children }: { children: JSX.Element[] | JSX.Element }) {
  const [isLoading, setIsLoading] = useState(false);
  const revalidate = useRevalidator();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getIsConfigRedMesh = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/isConfigRedMesh");
        const data = await res.text();
        if (data === "false") {
          navigate("/redMesh", { replace: true });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getIsConfigRedMesh();
  }, []);

  useEffect(() => {
    const source = new EventSource("/events");
    
    source.addEventListener("changedConnections", (e) => {
      location.pathname.startsWith("/dispositives") && revalidate.revalidate();
      console.log(e.data);
    });

    source.addEventListener("doorSensorChange", (e) => {
      location.pathname.endsWith("doorSensor") && revalidate.revalidate();
      console.log(e.data);
    });
    return () => {
      source.close();
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-lg "></span>
      </div>
    );

  return (
    <div className="bg-base-100">
      <div className="m-auto min-w-[300px] max-w-7xl">{children}</div>
    </div>
  );
}

export default Main;
