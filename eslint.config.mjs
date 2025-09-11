import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    rules: {
      semi :["error", "never"],
      eqeqeq : ["error", "always"],
      curly : ["error", "all"],
      quotes: ["error", "double"],
      indent: ["error", 2],
    }
  }

])
