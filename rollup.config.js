/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      esbuild(),
      typescript({ useTsconfigDeclarationDir: true, inlineSources: true }),
    ],
    external: ["react", "react-dom"],
    watch: {
      include: "src/**",
    },
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
