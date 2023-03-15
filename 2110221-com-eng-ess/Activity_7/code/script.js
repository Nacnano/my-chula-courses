function deleteRow (button) {
  var row = button.parentNode.parentNode
  row.parentNode.removeChild(row)
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
    '<button id="button delete" class="delete-row" onclick="deleteRow(this)">ลบ</button>'
}
