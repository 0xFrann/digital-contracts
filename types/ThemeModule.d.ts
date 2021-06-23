import "styled-components";
import { theme } from "../constants/theme";

export type Theme = typeof theme;

declare module "styled-components" {
  export type Theme = Theme;
}
