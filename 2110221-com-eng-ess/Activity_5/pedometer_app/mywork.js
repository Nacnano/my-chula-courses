function mywork_groupNumber () {
  return 35
}
function mywork_countSteps () {
  for (var i = 0; i < chartData.length; i++) {
    console.log(
      chartData[i].xs +
        ',' +
        chartData[i].ys +
        ',' +
        chartData[i].zs +
        ',' +
        chartData[i].as +
        ',' +
        chartData[i].bs +
        ',' +
        chartData[i].gs
    )
  }
  return Math.ceil(Math.random() * 30)
}
