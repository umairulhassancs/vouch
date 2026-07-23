const pptxgen = require("pptxgenjs");
let pres = new pptxgen();
let slide = pres.addSlide();
const C = {
  purple: "8B5CF6",
  textDark: "1E1830",
  textMuted: "6B6478",
  bgLight: "FAF9FD"
};
const chartData = [{
  name: "Illustrative market growth trend",
  labels: ["Today", "+2 yrs", "+4 yrs", "+6 yrs", "+8 yrs"],
  values: [10, 14, 19, 25, 32],
}];
try {
  slide.addChart(pres.ChartType.bar, chartData, {
    x: 0.7, y: 2.65, w: 5.9, h: 3.9,
    barDir: "col", chartColors: [C.purple],
    showTitle: true, title: "Global Smart-Tracker Category — Directional Growth Curve", titleFontSize: 11.5, titleColor: C.textDark,
    showValue: false, showLegend: false,
    catAxisLabelColor: C.textMuted, catAxisLabelFontSize: 9.5,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    dataLabelColor: C.textDark, chartArea: { fill: { color: C.bgLight } },
  });
  pres.writeFile({ fileName: "test_chart_slide6.pptx" }).then(() => {
    console.log("Successfully wrote test_chart_slide6.pptx");
  }).catch(err => {
    console.error("Error writing file:", err);
  });
} catch (e) {
  console.error("Error adding chart:", e);
}
