import { last } from "lodash";
import { create } from "zustand";
import { urlParams } from "@/utils";
import { User } from "@/gql/graphql";

import apps from "@/app/(home)/AppList/config";

export interface IApp {
  code: string;
  name: string;
  isMin?: boolean;
  isMax?: boolean;
}

export interface IAppState {
  docks: IApp[];
  opens: IApp[];
}

export interface AppStore extends IAppState {
  initAppStore: (user: User) => void;
  openApp: (app: IApp) => void;
  closeApp: (app: IApp) => void;
  stickApp: (app: IApp) => void;
  minimizeApp: (app: IApp) => void;
  maximizeApp: (app: IApp) => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  docks: [],
  opens: [],
  initAppStore: (user) => {
    const { auth } = user.role!;

    // 1. dock 栏
    const docks = auth!
      .map((v: any) => {
        const { code, name } = apps[v.code] || {};
        return { code, name };
      })
      .filter((v: any) => v.code && v.name);

    // 2. 默认开启的「应用」
    const appCodeOfUrl = urlParams("app");
    const defaultOpen = docks.find((v) => v.code === appCodeOfUrl);
    const opens = defaultOpen
      ? [{ ...defaultOpen, isMin: false, isMax: false }]
      : [];

    set({ opens, docks });
  },

  openApp: (app) => {
    const { opens } = get();

    const current = opens.find((v) => v.code === app.code);

    const newOpens = current
      ? opens.map((v) => ({
          ...v,
          isMin: v.code === app.code ? !v.isMin : v.isMin,
        }))
      : [...opens, { ...app, isMin: false, isMax: false }];

    set({ opens: newOpens });
  },

  closeApp: (app) =>
    set({
      opens: get().opens.filter((v) => v.code !== app.code),
    }),

  minimizeApp: (app) =>
    set({
      opens: get().opens.map((v) => ({
        ...v,
        isMin: v.code === app.code ? !v.isMin : v.isMin,
      })),
    }),

  maximizeApp: (app) =>
    set({
      opens: get().opens.map((v) => ({
        ...v,
        isMax: v.code === app.code ? !v.isMax : v.isMax,
      })),
    }),

  stickApp: (app) => {
    const { opens } = get();

    if (last(opens)?.code === app.code) {
      return false;
    }

    set({
      opens: [...opens.filter((v) => v.code !== app.code), app],
    });
  },
}));

export default useAppStore;
