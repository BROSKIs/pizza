document.getElementById("pizza-form").onsubmit = validate;

function validate(){

    clearErrors();
    let isValid = true;
    let fname = document.getElementById("fname").value.trim();
    if(!fname){
        document.getElementById("err-fname").style.display = "inline-block";
        isValid = false;
    }
    let lname = document.getElementById("lname").value.trim();
    if(!lname){
        document.getElementById("err-lname").style.display = "inline-block";
        isValid=false;
    }
    let email = document.getElementById("email").value.trim();
    if(!email){
        document.getElementById("err-email").style.display = "inline-block";
        isValid=false;
    }

    let size = document.getElementById("size").value;
    if(size=="none"){
        document.getElementById("err-size").style.display = "inline-block";
        isValid=false;
    }
    //delivery pick up
    let pickup = document.getElementById("pickup");
    let delivery = document.getElementById("delivery");
    if(!pickup.checked && !delivery.checked){
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }
    return isValid;
}
// Clears all error messages when form is submited
function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i=0; i<errors.length; i++){
        errors[i].style.display = "none";
    }
}



