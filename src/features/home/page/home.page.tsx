import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { homeContexts } from "../context/home.context";

export function HomePage() {
  const contextHome = useContext(homeContexts);
  console.log(process.env.TEST_ENV);

  return (
    <Observer>
      {() => (
        <div className=" h-screen">
          <p>env name {process.env.TEST_ENV}</p>
        </div>
      )}
    </Observer>
  );
}

export default HomePage;
