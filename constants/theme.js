/* eslint-disable */
const AntDColors = require("./colors");
const spacing = require("./spacing");
const fonts = require("./fonts");

const { neutrals } = AntDColors;

const theme = {
  colors: {
    ...AntDColors,
    primary: [
      ...AntDColors.red,
    ]
  },
  spaces: spacing.spaces,
  default: {
    // Custom variables
    baseUnit: spacing.baseUnit,
    spaces: spacing.spaces,
    // Ant Design Variables
    primaryColor: AntDColors.red.primary,
    borderColorBase: neutrals[4],
    borderColorSplit: neutrals[3],
  },
};

/** Override Ant Design variables */
const modifiedVariables = {
  "@font-family": fonts.fontFamily,
  "@primary-color": theme.default.primaryColor,
  "@border-color-base": theme.default.borderColorBase,
  "@border-color-split": theme.default.borderColorSplit,
  "@border-radius-base": `${theme.default.baseUnit}px`,
  "@layout-body-background": theme.colors.neutrals[3],
  "@layout-footer-background": "transparent",
  "@layout-header-background": theme.colors.primary[9],
  "@layout-trigger-background": theme.colors.primary[8],
  "@menu-dark-bg": theme.colors.primary[8]
};

module.exports = { theme, modifiedVariables };
