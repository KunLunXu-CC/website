import { IResourceItem } from '../types';
import createDisclosureStore from '@/store/createDisclosureStore';

const useMoveModalStore = createDisclosureStore<IResourceItem>();

export default useMoveModalStore;
