"use client";
import Antd from "./Antd";
import store from "@/store";
import NextUI from "./NextUI";
import ReactQuery from "./ReactQuery";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Antd>
      <NextUI>
        <Provider store={store}>
          <ReactQuery>{children}</ReactQuery>
        </Provider>
      </NextUI>
    </Antd>
  );
};

export default Providers;
