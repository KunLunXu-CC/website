import { create } from "zustand";
import { User } from "@/gql/graphql";

interface IUserState extends Partial<User> {}

interface IUserStore extends IUserState {
  setUser: (user: User) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  setUser: (user) => set(user),
}));

export default useUserStore;
