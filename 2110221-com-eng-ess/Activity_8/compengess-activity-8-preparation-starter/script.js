/** 2110221 Computer Engineering Essentials (2022/2),
 *  Department of Computer Engineering, Faculty of Engineering, Chulalongkorn University
 *
 *  Activity 8 (Preparation): Web Development II (Backend and Database)
 *  [Demonstrating how to use AWS SDK v3 to manipulate items in the table (DynamoDB) and send a http GET Request to REST API]
 */

let sortMemberStudentIDAscending = true

// =============================================================================================================================
// <DO THIS #2.1>: Replace 99 with your group number
const groupNumber = 33
// =============================================================================================================================
const groupMembersTableName = 'group_members_' + groupNumber // Table Name in Amazon DynamoDB you want to manipulate.

// <DO THIS #2.2>: Copy and Paste your AWS Credentials information here (and also specify the region)
// [Connect to Database: AWS DynamoDB]
/* IMPORTANT!!
    In general, NEVER PUT YOUR CREDENTIALS DIRECTLY INTO THE CODE!!! 
    due to safety reasons and to prevent the risk of being attacked. The credentials must be stored in a
    separate file and must be kept secret (The file MUST NOT BE UPLOADED to online sites such as GitHub).

    Since the purpose of this task is only for demonstrating how to connect to your database,
    we will allow you to put your credentials information directly into the code. You will see a
    better way to handle these secret information from doing activities in the classroom. 

    You can learn more here: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
 */

const config = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'ASIA3KBOOGM4NDEIWS',
    secretAccessKey: '895ySPhz+F/ZSA6XrWF6RAtfJya0aHEpqU77N3',
    sessionToken:
      'FwoGZXIvYXdzELn//////////wEaDMDBxmyXXDq9yLHATbT/sKKi0cPONpF6+LkmnBK95a3idWRbKMboeGh0hIaGuQhsW6aaZ7xrpJZ4DfERE4ALI3wjxpX1NRgxQoszWrEBi3VJhyMFjjGAvtk7NAJXXaTGmnIFkvYBtWMzUsh1dFx/UzuauY3Hhf62tjCn+joWSPoRtz0ls7oZqpkgxbTplOmz7f5XJ6+pGWuq89UIBHK53fgU66490DO/f07nS5I4uSSq4RuKZXUyIKDPNKp9sne9rfbaNnhMZ0j4x8JBtoNirtJeQso7JHgoAYyLbKb9jeVzw+OloRXjMOXj46UpGKcCCsrM9d7O9BWF9uxmYONdDbuC/1TygAsQA=='
  }
}

// instantiate a DynamoDBClient - an connection object to AWS AmazonDynamoDB
let dynamoDbClient
try {
  dynamoDbClient = new DynamoDBClient(config)
} catch (err) {
  alert(err)
}

// =============================================================================================================
// <DO THIS #2.3>
async function randomFood () {
  /** This function sends a HTTP GET request to https://www.themealdb.com/api/json/v1/1/random.php,
   *  (This is a free public API that returns information about food, such as name, ingredients , etc.
   *  The returned information about the food will continue to change randomly every time this API is called)
   */
  // TYPE YOUR CODE HERE ---------------------------------------------------------------
  // ------------------------------------------------------------------------------------
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch('https://www.themealdb.com/api/json/v1/1/random.php', requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      let food = result['meals'][0]['strMeal']
      document.getElementById('food-to-add').value = food
    })
    .catch(error => console.log('error', error))
}

/* when the 'Random' button is clicked, obtain a new random food name from calling the API and set
 the food name to the value of the input tag. */
document
  .getElementById('food-random-button')
  .addEventListener('click', randomFood)
// =============================================================================================================

let groupMembersData

async function getMembers () {
  /** This function sends a ScanCommand to dynamoDbClient to retrieve all the member items in the table,
   *  then stores the result in the global variable name 'groupMembersData'.
   */
  const scanParams = {
    TableName: groupMembersTableName
  }
  try {
    // use 'ScanCommand' object to retrieve all the items in the table
    groupMembersData = await dynamoDbClient.send(new ScanCommand(scanParams))
    console.log('getting members from the database')
    console.log('groupMembersData:', groupMembersData)
  } catch (err) {
    alert(err)
  }
}

function showMembersInTable (groupMembersData, is_student_id_ascending = true) {
  /** This function re-create and re-render the table once the user enters the website for the first time
   *  or a particular member is being added or deleted.
   */

  if (groupMembersData === undefined) {
    return
  }

  // ======================================================================================================
  // <DO THIS #2.4>: Assign the value to the variable 'members' with an array of objects (members) which
  // can be found inside the variable 'groupMembersData' (replace [] with something else)
  // [HINT]: Try to observe the properties of the 'groupMembersData' variable (which is an JavaScript object)
  const members = groupMembersData['Items']
  // ======================================================================================================

  // sort members based on 'student_id' field in ascending/descending order
  if (is_student_id_ascending) {
    members.sort((a, b) => a.student_id.localeCompare(b.student_id))
  } else {
    members.sort((b, a) => a.student_id.localeCompare(b.student_id))
  }

  // updating the number of members
  document.getElementById('member-count').innerHTML = groupMembersData.Count

  // re-create the HTML table's body
  const table_body = document.getElementById('main-table-body')
  table_body.innerHTML = ''

  // mapping each member to each row of the HTML table
  members.map(member => {
    table_body.innerHTML += `
        <tr id="${member.student_id}">
            <td>${member.student_id}</td>
            <td>${member.full_name}</td>
            <td>${member.nick_name}</td>
            <td>${member.fav_number}</td>
            <td>${member.fav_food}</td>
            <td><button class="operate-button delete-button" onclick="deleteMember('${member.student_id}')">Delete</button></td>
        </tr>
        `
  })
}

async function addMember () {
  /** This function is called when the user pressed the "Add" button.
   *  This function retrieve all the information from the input tag that user entered about the new member and then
   *  check for some basic input validation, if pass, then sends a PutCommand to insert the new member into the table
   *  (the new member's student_id must be unique).
   */

  // collect entered data from the input tags
  const studentIdString = document
    .getElementById('student-id-to-add')
    .value.trim()
  const fullnameString = document.getElementById('fullname-to-add').value.trim()
  const nicknameString = document.getElementById('nickname-to-add').value.trim()
  const favNumber = parseInt(document.getElementById('number-to-add').value)
  const favFood = document.getElementById('food-to-add').value.trim()

  // basic input validation
  let inputError = false
  if (
    studentIdString.length !== 10 ||
    !!!fullnameString ||
    !!!nicknameString ||
    isNaN(favNumber) ||
    !!!favFood
  ) {
    inputError = true
  }
  if (inputError) {
    alert('Please recheck your input data.')
    return
  }

  const memberToAdd = {
    student_id: studentIdString,
    full_name: fullnameString,
    nick_name: nicknameString,
    fav_number: favNumber,
    fav_food: favFood
  }

  const putParams = {
    TableName: groupMembersTableName,
    Item: memberToAdd, // member object to be added
    ConditionExpression: 'attribute_not_exists(student_id)' // add if and only if the student_id not already exists
  }
  try {
    // use 'PutCommand' object to insert an item into the table
    const response = await dynamoDbClient.send(new PutCommand(putParams))
    console.log('adding member to the database')
    console.log(response)
  } catch (err) {
    alert(err)
    return
  }

  // update the member table after successful adding member
  redrawDOM()
}

document.getElementById('add-newrow').addEventListener('click', async () => {
  await addMember()
})

async function deleteMember (studentId) {
  const deleteParams = {
    TableName: groupMembersTableName,
    Key: { student_id: studentId }
  }
  try {
    // use 'DeleteCommand' object to delete an item from the table
    const response = await dynamoDbClient.send(new DeleteCommand(deleteParams))
    console.log(`deleting member id = ${studentId} from the database`)
    console.log(response)
  } catch (err) {
    alert(err)
    return
  }

  // update the member table after successful adding member
  redrawDOM()
}
window.deleteMember = deleteMember

document.addEventListener('DOMContentLoaded', async function (event) {
  await getMembers()
  showMembersInTable(groupMembersData, sortMemberStudentIDAscending)
})

function redrawDOM () {
  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true
    })
  )
  document.getElementById('student-id-to-add').value = ''
  document.getElementById('fullname-to-add').value = ''
  document.getElementById('nickname-to-add').value = ''
  document.getElementById('number-to-add').value = ''
  document.getElementById('food-to-add').value = ''
}

document.getElementById('group-no').innerHTML = groupNumber
document.title = `Group ${groupNumber} - Activity 8 Preparation`

// sorting members by Student ID Logic
const sortStudentIDToggleButton = document.getElementById('student-id-toggle')
function toggleSortMemberBasedOnStudentID (event) {
  if (sortMemberStudentIDAscending) {
    sortMemberStudentIDAscending = false
    sortStudentIDToggleButton.innerHTML = '&#9661;'
  } else {
    sortMemberStudentIDAscending = true
    sortStudentIDToggleButton.innerHTML = '&#9651;'
  }
  showMembersInTable(groupMembersData, sortMemberStudentIDAscending)
}
sortStudentIDToggleButton.addEventListener('click', () => {
  toggleSortMemberBasedOnStudentID()
})
