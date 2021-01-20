const final = 5;
var myitem = 0;
let user = "";

document.getElementById("user_save_btn").onclick = function () {
  let user_name = document.getElementById("userName").value;
  checkUser(user_name);
};
let groceryItems = [];
var groceryList = localStorage.getItem("groceryList");
if (groceryList === "") {
  groceryList = {};
}else {
  groceryList = JSON.parse(groceryList);
}

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
      const GI = this.getItemListByUser(name);
      this.renderListItems(GI);
    } else {
      users.push(name);
      localStorage.setItem("userData", users.toString());
      groceryList[name] = [];
      groceryItems = groceryList[name];
      document.getElementById("left-item").innerHTML =
        final - groceryItems.length;
    }
  } else {
    users.push(name);
    localStorage.setItem("userData", users.toString());
    groceryList[name] = [];
    groceryItems = groceryList[name];
    document.getElementById("left-item").innerHTML =
      final - groceryItems.length;
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
  return groceryItems;
}
function addToBasket(item) {
  groceryList[user].push(item);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function removeFromBasket(index) {
  --myitem;
  document.getElementById("left-item").innerHTML = final - myitem;
    var list = document.getElementById('mylist'+index);
    list.parentNode.removeChild(list);
    let itemIndex = groceryList[user].map(o => o.id).indexOf(index);
    groceryList[user].splice(itemIndex, 1);
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    this.renderListItems(groceryList[user]);
}

function saveToBucket(groceryList) {
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}
function renderListItems(myGroceryItems) {
  document.getElementById("myUL").innerHTML = ""
  myitem = myGroceryItems.length;
  document.getElementById("left-item").innerHTML = final - myitem;
  if (myitem === final) {
    document.getElementById("addbtn").classList.add("hide");
  }else {
    document.getElementById("addbtn").classList.remove("hide");
  }
  for (let index = 0; index < myGroceryItems.length; index++) {
    var li = document.createElement("li");
    li.setAttribute("id", "mylist" + myGroceryItems[index].id);
    var t = document.createTextNode(myGroceryItems[index].name);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.addEventListener("click", function () {
      console.log(myGroceryItems[index]);
      removeFromBasket(myGroceryItems[index].id);
    });
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
  let itemIndex =  Math.floor(Math.random() * 111111111);
  let totalItem = this.getItemListByUser(user).length;
  var li = document.createElement("li");
  li.setAttribute("id", "mylist" + itemIndex);
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("Enter a valid item!");
  } else {
    document.getElementById("myUL").appendChild(li);
    let newItem = {id: itemIndex, name: inputValue};
    this.addToBasket(newItem);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.addEventListener("click", function () {
    removeFromBasket(itemIndex);
  });
  li.appendChild(span);
  ++myitem;
  document.getElementById("left-item").innerHTML = final - myitem;
  if (myitem === final) {
    document.getElementById("addbtn").classList.add("hide");
  }
}
