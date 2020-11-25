const { json } = require("express");

const indexedDB = window.indexedDB || window.mozIndexedDB;

let db;
const request = indexedDB.open("budgetTracker", 1) 

request.onupgradeneeded = ({target}) => {
    let db = target.result;
    db.createObjectStore("working", {autoIncrement: true});

}
request.onsuccess = ({target}) => {
    let db = target.result;
    if(navigator.onLine){
        checkDatabase();
    }
}
function saveDB(record){
    const transaction = db.transaction(["pending"], "readwrite")
    const storage = transaction.objectStore("pending");
    storage.add(record);
}

request.onerror = function(e){
    console.log("Error",e.target.errorCode);
}

function getDataBase(){
    const transaction = db.transaction(["pending"], "readwrite")
    const storage = transaction.objectStore("pending");
    const getall = storage.getAll();
    getall.onsuccess = function(){
        if(getall.result.length > 0){
            fetch("/api/transaction/bulk", {
                method:"POST", 
                body: json.stringify(getall.result),
                headers:{
                   Accept: "application/json, text/plain",
                   "Content-Type": "application/json" 
                }
            }).then(function (response){
                return response.json();
            }).then(function(){
                const transaction = db.transaction(["pending"], "readwrite")
                const storage = transaction.objectStore("pending");
                storage.clear();
                


            })

        }
    } 


}
window.addEventListener("Online", getDataBase);
