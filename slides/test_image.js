const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

let pres = new pptxgen();
let slide = pres.addSlide();

const LOGO = path.join(__dirname, "assets/logo.png");
const ICON = path.join(__dirname, "assets/icons/tag_purple.png");

console.log("LOGO path:", LOGO, "exists:", fs.existsSync(LOGO));
console.log("ICON path:", ICON, "exists:", fs.existsSync(ICON));

try {
  // Try adding logo
  slide.addImage({ path: LOGO, x: 1, y: 1, w: 2, h: 2 });
  
  // Try adding icon
  slide.addImage({ path: ICON, x: 4, y: 1, w: 1, h: 1 });
  
  // Try adding relative paths
  const relativeLogo = "./assets/logo.png";
  const relativeIcon = "./assets/icons/tag_purple.png";
  slide.addImage({ path: relativeLogo, x: 1, y: 4, w: 2, h: 2 });
  slide.addImage({ path: relativeIcon, x: 4, y: 4, w: 1, h: 1 });

  pres.writeFile({ fileName: "test_image.pptx" }).then(() => {
    console.log("Successfully wrote test_image.pptx");
  }).catch(err => {
    console.error("Error writing presentation:", err);
  });
} catch (e) {
  console.error("Error adding images:", e);
}
