import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { homeContexts } from "../context/home.context";
import { ButtonOk } from "@/components/button.ok";
import { useRouter } from "next/router";

export function HomePage() {
  const contextHome = useContext(homeContexts);
  console.log(process.env.TEST_ENV);
  const router = useRouter();

  return (
    <Observer>
      {() => (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>full model คือ model ที่เห็นอาคารทั้งหมด</p>
          <p>part model คือ model ที่เห็นเฉพาะส่วนชั้นนั้นๆ</p>
          <div className="grid gap-4 mt-4">
            <ButtonOk
              text="full model"
              onClick={() => {
                router.push("/fullModel");
              }}
            />
            <ButtonOk
              text="part model"
              onClick={() => {
                router.push("/partModel");
              }}
            />
          </div>
        </div>
      )}
    </Observer>
  );
}

export default HomePage;
