import { create } from 'zustand';
import { UserItemFragment } from '@/gql/graphql';

interface IUserState extends Partial<UserItemFragment> {}

interface IUserStore extends IUserState {
  setUser: (user: UserItemFragment) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  setUser: (user) => set(user),
}));

export default useUserStore;
