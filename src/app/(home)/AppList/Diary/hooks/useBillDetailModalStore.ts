import { DiaryItemFragment } from "@/gql/graphql";
import createDisclosureStore from "@/store/createDisclosureStore";

const useBillDetailModalStore = createDisclosureStore<DiaryItemFragment[]>();

export default useBillDetailModalStore;
