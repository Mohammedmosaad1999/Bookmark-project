var bookmarkName = document.getElementById("bookmarkName") ;
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var error = document.getElementById("error");
var closeBtn = document.getElementById("closeBtn");
 
 var dataList ;
 if (localStorage.getItem("dataList") === null){
    dataList =[];
 }else {
    dataList= JSON.parse(localStorage.getItem("dataList"));
    displayData(dataList);
 }
 
 
 function getData(){
    if(bookmarkNameValidation() && bookmarkURLValidation()){
        var data ={
            name:bookmarkName.value,
            url:bookmarkURL.value,
        }
        error.classList.replace("d-block","d-none");

        dataList.push(data);
    }else{
        error.classList.replace("d-none","d-block");

        console.log("invalid data");
    };

    
    
    saveToLocalStorage();
    displayData(dataList);
    clearData();
    console.log(dataList);
}
function displayData(dList){
    var cartoona ="";
    for( var i=0 ; i < dList.length ; i++){
        cartoona += `
        <tr>
        <td>${i+1}</td>
        <td>${dList[i].name}</td>
        <td>
            <button id = "visitBtn" onclick="visitData(${i})" class="btn btn-primary" data-index="index">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </td>
          <td>
            <button onclick="deleteData(${i})" class="btn btn-danger pe-2" data-index="index">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td> `
    }
    tableContent.innerHTML = cartoona;


}
function clearData(){
    bookmarkName.value = "";
    bookmarkURL.value = "";
}
function deleteData(index){
    dataList.splice(index , 1);
    saveToLocalStorage();
    displayData(dataList);
}
function saveToLocalStorage(){
    localStorage.setItem("dataList" , JSON.stringify(dataList));
}

function bookmarkNameValidation(){
    var regex =/^[A-Z][a-z]{3,9}$/;
    if (regex.test(bookmarkName.value)){
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        return false;
    }
}

function bookmarkURLValidation(){
    var regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;
    if (regex.test(bookmarkURL.value)){
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");
        return false;
    }
}
function closeBtnClick(){
    error.classList.replace("d-block","d-none");
}
function visitData(index){
    window.open(dataList[index].url);
}


