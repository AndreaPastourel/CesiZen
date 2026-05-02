import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}