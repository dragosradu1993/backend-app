const mockUserUtils = require("./mockUser.utils")
const Randexp = require('randexp')

const firstNameList = ['Neacsu', 'Mirel', 'Popa', 'Radu', 'Barbu', 'Toma', 'Manole']
const lastNameMaleList = ['Andrei', 'Marian', 'Alexandru', 'Marius', 'Daniel', 'Vlad', 'Teodor', 'Stefan']
const lastNameFemaleList = ['Andreea', 'Maria', 'Alexandra', 'Daniela', 'Ioana', 'Teodora', 'Stefania', 'Marcela']
const budgetFormList = ['BUGET', 'TAXA']
const educationFormList = ['ZI', 'ID']
const isAdmin = [true, false]


const profile = {
    generateFirstName: () => {
        return firstNameList[randomInteger(0,firstNameList.length-1)]
    },

    generateLastName: (gender) => {
        if(gender === "male") {
            return lastNameMaleList[randomInteger(0,lastNameMaleList.length - 1)]
        }
        return lastNameFemaleList[randomInteger(0,lastNameFemaleList.length -1)]
    },
    
    generatePhoneNumber: () => {
        return `+40${randomInteger(720000000,799999999)}`
    },

    generatePromotion: () => {
        return randomInteger(2010, new Date().getFullYear())
    },

    generateSpecialization: () => {
        return `TestSpecialization+${randomInteger(0,10000)}`
    },

    generateEducationForm: () => {
        return educationFormList[randomInteger(0,1)]
    },

    generateBudgetForm: () => {
        return budgetFormList[randomInteger(0,1)]
    },

    generateIdentityId: (gender) => {
        if(gender === "male") {
            return new Randexp("^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$").gen()
        }
        else {
            return new Randexp("^[2-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$").gen()
        }
    },

    generateIsAdmin: () => {
        return isAdmin[randomInteger(0,1)]
    }

}

 module.exports = {
    generateProfile: (gender) => {
       return {
            firstName: profile.generateFirstName(),
            lastName: profile.generateLastName(gender),
            phoneNumber: profile.generatePhoneNumber(),
            profileImage: ""
       }
    } 
}

function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
