const final = 5;
var myitem = 0;
document.getElementById("user_save_btn").onclick = function () {
  let user_name = document.getElementById("userName").value;
  checkUser(user_name);
};
let groceryItems = [];
let groceryList = JSON.parse(localStorage.getItem("groceryList"));
if (groceryList === null) {
  groceryList = {};
}
let user = "";

function checkUser(name) {
  user = name;
  localStorage.setItem("currentUser", user);
  let users = [];
  let userData = localStorage.getItem("userData");
  if (userData !== null) {
    users = userData.split(",");
  }
  if (users.length > 0) {
    if (users.includes(name)) {
      this.getItemListByUser(name);
    } else {
      users.push(name);
      localStorage.setItem("userData", users.toString());
      groceryList[name] = [];
      groceryItems = groceryList[name];
      console.log(groceryList[name]);
      console.log(groceryList);
    }
  } else {
    users.push(name);
    localStorage.setItem("userData", users.toString());
    groceryList[name] = [];
    console.log(groceryList[name]);
    groceryItems = groceryList[name];
    console.log(groceryList);
  }
  document.getElementById("login-form").classList.add("hide");
  document.getElementById("item-list").classList.remove("hide");
}
function getItemListByUser(name) {
  if (groceryList !== null && groceryList[name]) {
    groceryItems = groceryList[name];
  } else {
    groceryList[name] = [];
    groceryItems = groceryList[name];
  }
  this.renderListItems(groceryItems);
}
function addToBasket(item) {
  groceryList[user].push(item);
  console.log(groceryList);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function removeFromBasket(item) {
  const indexItem = groceryList[user].indexOf(item);
  console.log(indexItem);
}

function renderListItems(myGroceryItems) {
  myitem = myGroceryItems.length;
  console.log(myitem === final);
  if (myitem === final) {
    document.getElementById("addbtn").classList.add("hide");
  }
  for (let index = 0; index < myGroceryItems.length; index++) {
    var li = document.createElement("li");
    var t = document.createTextNode(myGroceryItems[index]);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  }
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("Enter a valid item!");
  } else {
    document.getElementById("myUL").appendChild(li);
    this.addToBasket(inputValue);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  ++myitem;
  if (myitem === final) {
    document.getElementById("addbtn").classList.add("hide");
  }
}
