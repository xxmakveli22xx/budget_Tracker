const indexedDB = window.indexedDB || window.mozIndexedDB;

let db;
const request = indexedDB.open("budgetTracker", 1) 

request.onupgradeneeded = ({target}) => {
    let db = target.result;
}