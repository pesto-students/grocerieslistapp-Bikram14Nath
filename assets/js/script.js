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
            
        } else {
            users.push(name);
            console.log("inside else", users);
            localStorage.setItem('userData', users.toString());
        }
    } else {
        users.push(name);
        localStorage.setItem('userData', users.toString());
    }
}
function getItemListByUser(name){
    let groceryList = localStorage.getItem('groceryList');
}