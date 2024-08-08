"use client";
import { graphql } from "@/gql";
import client from "@/gql/client";
import { useQuery } from "@tanstack/react-query";

const getUserInfoDocument = graphql(`
  query getUserInfo {
    userInfo {
      user {
        id
        name
      }
      message
    }
  }
`);

const Demo = () => {
  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => client.request(getUserInfoDocument),
  });

  console.log(data);

  return <div>11</div>;
};

export default Demo;
