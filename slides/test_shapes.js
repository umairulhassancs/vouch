const pptxgen = require("pptxgenjs");
let pres = new pptxgen();
let slide = pres.addSlide();
try {
  console.log("ShapeType object:", pres.ShapeType || pptxgen.ShapeType);
  // Test using shape strings
  slide.addShape("ellipse", { x: 1, y: 1, w: 2, h: 2, fill: { color: "FF0000" } });
  slide.addShape("roundRect", { x: 4, y: 1, w: 2, h: 2, fill: { color: "00FF00" } });
  slide.addShape("line", { x: 1, y: 4, w: 5, h: 0, line: { color: "0000FF", width: 2 } });
  
  pres.writeFile({ fileName: "test_shapes.pptx" }).then(() => {
    console.log("Successfully wrote test_shapes.pptx");
  }).catch(err => {
    console.error("Error writing file:", err);
  });
} catch (e) {
  console.error("Error adding shape:", e);
}
