import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/api/graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/": {
      preset: "client",
    },
  },
};

export default config;
