function mywork_groupNumber () {
  return 35
}
function mywork_countSteps () {
  let countSteps = 0
  let finishMove = false
  const baseLine = 0.2
  for (var i = 0; i < chartData.length; ++i) {
    const z = chartData[i].zs
    if (finishMove == false && z > baseLine) {
      countSteps += 1
    }
    finishMove = z > baseLine
  }
  return countSteps
}
