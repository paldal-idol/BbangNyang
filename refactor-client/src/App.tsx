import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, GamePage, RoomPage, RootPage } from "@pages";
import "index.css";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/room/:id",
    element: <RoomPage />,
  },
  {
    path: "/game/:id",
    element: <GamePage />,
  },
]);

function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isValidBrowser, setIsValidBrowser] = useState(true);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  const checkBrowserChrome = () => {
    const agt = navigator.userAgent.toLowerCase();
    const isChrome = agt.indexOf("chrome") !== -1;

    setIsValidBrowser(isChrome);
  };

  useEffect(() => {
    checkBrowserChrome();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isValidBrowser && (
        <ErrorPage message={"Chrome 브라우저만 지원합니다😥"} />
      )}
      {windowSize < 800 && (
        <ErrorPage message={"화면 크기는 최소 800px 이상이어야 합니다😅"} />
      )}
      <RouterProvider router={ROUTER} />
    </>
  );
}

export default App;
