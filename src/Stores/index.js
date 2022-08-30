import { atom } from "recoil"

export const Language = atom({
    key : "LANG",
    default : false
})

export const Theme = atom({
    key : "THEME",
    default : false
})

export const Curency = atom({
    key : "CURENCY",
    default : {
        currency : "Indonesia Rupiah",
        abbreviation : "IDR",
        symbol : "Rp"
    }
})