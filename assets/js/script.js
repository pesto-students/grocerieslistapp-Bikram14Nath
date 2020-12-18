document.getElementById('user_save_btn').onclick = function () {
    let user_name = document.getElementById('userName').value;
    checkUser(user_name);
}

function checkUser(name) {
    let users = [];
    let userData = localStorage.getItem('userData');
    if (userData !== null) {
        users = userData.split(',');
    }
    if (users.length > 0) {
        if (users.includes(name)) {
            // get item list
            const items = getItemListByUser(name);
        } else {
            users.push(name);
            localStorage.setItem('userData', users.toString());
        }
    } else {
        users.push(name);
        localStorage.setItem('userData', users.toString());
    }
}
function getItemListByUser(name){
    let groceryList = JSON.parse( localStorage.getItem('groceryList'));
    let myList = [];
    if (groceryList !== null && groceryList[name]) {
        myList = groceryList[name];
    }
    console.log(typeof(myList));
    return myList;
    // else {
    //     groceryList = {};
    //     groceryList[name] = [];
    // }
    // groceryList[name].push('pudina');
    // localStorage.setItem('groceryList', JSON.stringify(groceryList))
}

addItemToList(){
    
}