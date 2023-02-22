const fireStoreModule = new Worker('firestoreModule.js')

$(document).ready(function () {
  document.title = 'CompEngEss PEDO # ' + mywork_groupNumber()
  $('#pedo-result-sent').attr('data-group', mywork_groupNumber())
  $('#pedo-header-groupno').html(mywork_groupNumber())
  $('#pedo-result-sent').off('click').on('click', extras_clickSendData)
})
function extras_countStepsAndShowModal () {
  $('#pedo-result-display-value').html('--')
  var step = mywork_countSteps()
  $('#pedo-result-display-value').html(parseInt(step))
  $('#pedo-result').modal('show')
}
function extras_clickSendData () {
  var groupNo = parseInt($(this).attr('data-group'))
  var stepData = parseInt($('#pedo-result-display-value').text())
  extras_sendData(groupNo, stepData)
  $('#pedo-result').modal('hide')
}
function extras_sendData (groupNo, stepData) {
  var timestamp = Math.floor(Date.now() / 1000)
  var postMsg = {
    cmd: 'set',
    data:
      '{"groupNo":' +
      '' +
      groupNo +
      ',"stepData":' +
      '' +
      stepData +
      ',"epoch":' +
      '' +
      timestamp +
      '}'
  }
  fireStoreModule.postMessage(postMsg)

  console.log('To send: ' + groupNo + ', ' + stepData)
}
