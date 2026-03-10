import { Font } from "@react-pdf/renderer";
import NotoSansRegular from "../assets/fonts/NotoSans-Regular.ttf";
import NotoSansBold from "../assets/fonts/NotoSans-Bold.ttf";

Font.register({
  family: "NotoSans",
  fonts: [
    {
      src: NotoSansRegular,
      fontWeight: "normal",
    },
    {
      src: NotoSansBold,
      fontWeight: "bold",
    },
  ],
});