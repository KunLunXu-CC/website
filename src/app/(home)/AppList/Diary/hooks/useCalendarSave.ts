import { graphql } from "@/gql";
import { useCallback } from "react";
import {
  DiaryFields,
  CreateDiariesMutation,
  UpdateDiariesMutation,
  CreateDiariesMutationVariables,
  UpdateDiariesMutationVariables,
} from "@/gql/graphql";
import { client } from "@/store/graphql";
import { useMutation } from "@tanstack/react-query";
import useCalendarStore from "./useCalendarStore";

// 创建日记
const CreateDiariesDocument = graphql(`
  mutation CreateDiaries($body: [DiaryFields!]!) {
    createDiaries(body: $body) {
      change {
        ...DiaryItem
      }
    }
  }
`);

// 修改日记
const UpdateDiariesDocument = graphql(`
  mutation UpdateDiaries($body: DiaryFields!, $conds: DiarySearch!) {
    updateDiaries(body: $body, conds: $conds) {
      change {
        ...DiaryItem
      }
    }
  }
`);

const useCalendarSave = () => {
  const { updateDiaries } = useCalendarStore();
  const { mutateAsync: create } = useMutation<
    CreateDiariesMutation,
    Error,
    CreateDiariesMutationVariables
  >({
    mutationKey: ["createDiaries"],
    mutationFn: (variables) => client.request(CreateDiariesDocument, variables),
  });

  const { mutateAsync: update } = useMutation<
    UpdateDiariesMutation,
    Error,
    UpdateDiariesMutationVariables
  >({
    mutationKey: ["updateDiaries"],
    mutationFn: (variables) => client.request(UpdateDiariesDocument, variables),
  });

  const onSave = useCallback(
    async ({ body, id }: { body: DiaryFields; id?: string | null }) => {
      const res = id
        ? await update({ body, conds: { id } })
        : await create({ body });

      const { change } =
        (res as CreateDiariesMutation).createDiaries ??
        (res as UpdateDiariesMutation).updateDiaries;

      updateDiaries(change);
    },
    [create, update, updateDiaries],
  );

  return { onSave };
};

export default useCalendarSave;
