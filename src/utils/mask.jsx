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
    e.target.maxLength = 11; 
    let value = e.target.value;     
    value = value.replace(/\D/g, "");           
    e.target.value = value;
    return e;
}
