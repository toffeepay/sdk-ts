import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { resolve: true, compilerOptions: { ignoreDeprecations: "6.0" } },
  clean: true,
  splitting: false,
  noExternal: ["@buf/toffeepay_toffee.bufbuild_es"],
});
