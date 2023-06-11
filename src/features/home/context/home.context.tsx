import { createContext, useContext } from "react";
import { makeAutoObservable } from "mobx";
import { storesGlobal } from "@/stores/global.store";

class HomeContexts {
  //   count: number;

  data_profile: Array<{}>;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.data_profile = [];
    this.testStoreGoble();
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------

  testStoreGoble() {
    // this.storesGoble.storesContexts;
    console.log(storesGlobal.value);
    storesGlobal.add(2);
    console.log(storesGlobal.getValue());
  }
}

export const homeContexts = createContext(new HomeContexts());
