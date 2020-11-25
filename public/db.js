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
        checkDatabase()
    }
}