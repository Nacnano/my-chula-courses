data = new Map()
sum = 0
function updateInfo () {
  info = document.getElementById('info')
  info.innerHTML = ''
  info.innerHTML += 'Sum: ' + sum + '<br>'
  for (const [k, v] of data) {
    if (v > 0) info.innerHTML += '' + k + ': ' + v + '<br>'
  }
}

function deleteRow (button) {
  var row = button.parentNode.parentNode
  row.parentNode.removeChild(row)
  let name = row.cells[1].innerHTML
  let price = parseInt(row.cells[2].innerHTML)
  data.set(name, data.get(name) - parseFloat(price))
  sum -= parseFloat(price)
  updateInfo()
}

function addRow () {
  var table = document.getElementById('main-table')

  var newRow = table.insertRow(table.rows.length - 1)

  var cell1 = newRow.insertCell(0)
  var cell2 = newRow.insertCell(1)
  var cell3 = newRow.insertCell(2)
  var cell4 = newRow.insertCell(3)

  cell1.innerHTML = document.getElementById('item-to-add').value
  cell2.innerHTML = document.getElementById('name-to-add').value
  cell3.innerHTML = document.getElementById('price-to-add').value
  cell4.innerHTML =
    '<button id="button-delete" class="delete-row" onclick="deleteRow(this)">ลบ</button>'

  let name = document.getElementById('name-to-add').value
  let price = document.getElementById('price-to-add').value
  data.set(name, (data.get(name) || 0) + parseFloat(price))
  sum += parseFloat(price)
  updateInfo()
}

function addNameAndDropdown () {
  names = [
    'ธีรภัทร ชยานุวงศ์',
    'นิพัทธ์ เชนธนากิจ',
    'โชติพิสิฐ อดุลสีหวัตต์',
    'ปรัชญา เบ็ญจวรรณ'
  ]

  var nameList = document.getElementById('name-list')
  var selectBox = document.getElementById('name-to-add').options

  selectBox.add(new Option('--เลือกผู้ฝากซื้อ--'))
  for (var name of names) {
    let li = document.createElement('li')
    li.innerHTML = name
    nameList.appendChild(li)
    selectBox.add(new Option((text = name), (value = name)))
  }
}

addNameAndDropdown()
