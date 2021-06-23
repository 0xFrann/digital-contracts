const ANTColors = require("@ant-design/colors");

const colors = {
  blue: ANTColors.blue,
  cyan: ANTColors.cyan,
  geekblue: ANTColors.geekblue,
  generate: ANTColors.generate,
  gold: ANTColors.gold,
  green: ANTColors.green,
  grey: ANTColors.grey,
  lime: ANTColors.lime,
  magenta: ANTColors.magenta,
  orange: ANTColors.orange,
  presetDarkPalettes: ANTColors.presetDarkPalettes,
  presetPalettes: ANTColors.presetPalettes,
  presetPrimaryANTColors: ANTColors.presetPrimaryANTColors,
  purple: ANTColors.purple,
  red: ANTColors.red,
  volcano: ANTColors.volcano,
  yellow: ANTColors.yellow,
  neutrals: [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#434343",
    "#262626",
    "#1f1f1f",
    "#141414",
    "#000000",
  ],
};

colors.neutrals.primary = colors.neutrals[6];

module.exports = colors;
