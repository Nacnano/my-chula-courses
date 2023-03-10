/*jshint esversion: 6 */
self.importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
self.importScripts(
  'https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js'
)

const firebaseConfig = {
  apiKey: 'xxx',
  authDomain: 'xxx.firebaseapp.com',
  projectId: 'xxx',
  storageBucket: 'xxx.appspot.com',
  messagingSenderId: 'xxx',
  appId: 'xxx'
}

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

self.onmessage = function (e) {
  var retStat = 'ok'
  var cmd = e.data['cmd']
  var data_json = JSON.parse(e.data['data'])
  this.console.log(e.data['data'])

  var group_no = data_json['groupNo']
  var epoch = data_json['epoch']

  switch (cmd) {
    case 'set':
      db.collection('sensor') // collection name
        .doc('' + epoch)
        .set(data_json)
      break
    default:
      retStat = 'nok'
      break
  }

  self.postMessage({ return_status: retStat })
}
