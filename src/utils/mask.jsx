import React from "react";

export const currencyMask = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
    e.target.value = value;
    return e;
}

export const onlyLetters = (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-z\s]+/i, '');       
    e.target.value = value;
    return e;
}

export const cpfMask = (e) => {
    e.target.maxLength = 14; 
    let value = e.target.value;     
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
    e.target.value = value;
    return e;
}

export const phoneMask = (e) => {
    let value = e.target.value; 
    value = value.replace(/\D/g,"");
    value = value.replace(/^0/,"");
    if (value.length > 10) {
        // 11+ digits. Format as 5+4.
        value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3");
    }
    else if (value.length > 5) {
        // 6..10 digits. Format as 4+4
        value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3");
    }
    else if (value.length > 2) {
        // 3..5 digits. Add (0XX..)
        value = value.replace(/^(\d\d)(\d{0,5})/,"($1) $2");
    }
    else {
        // 0..2 digits. Just add (0XX
        value = value.replace(/^(\d*)/, "($1");
    }
    e.target.value = value;
    return e;               
    
}

export const onlyNumbersMax5 = (e) => {
    e.target.maxLength = 5;
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    e.target.value = value;
    return e;
}

export const onlyNumbersMax2 = (e) => {
    e.target.maxLength = 2;
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    e.target.value = value;
    return e;
}

export const horarioMask = (e) => {
    e.target.maxLength = 5;
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    value = value.replace(/(\d)(\d{2})$/, "$1:$2");
    e.target.value = value;
    return e;
}

export const cepMask = (e) => {
    e.target.maxLength = 9; 
    let value = e.target.value;     
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{3})$/, "$1-$2");    
    e.target.value = value;
    return e;
}

