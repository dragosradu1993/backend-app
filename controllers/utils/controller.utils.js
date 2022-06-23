const bcrypt = require('bcrypt')
const db = require('../../models')
const profileController = require('../profiles/profile.controller')

const userController = require('../user.controller')

module.exports = {
    hashPwd: async function(pwd) {
        return await bcrypt.hash(pwd, 11)
    },
    
    setUserProfile: async function(userType, userData, userId) {
        return await profileController.add()
        switch(userType) {
            case "STUDENT":
                return await studentProfileController.add(userData, userId)
            case "TEACHER":
                return await teacherProfileController.add(userData, userId)
            case "SECRETARY":
                return await secretaryProfileController.add(userData, userId)
            default:
                return
        }
    },
    
    getProfileDetails: async function(profileId, userRole) {
        var profileDetails;
        switch(userRole) {
            case "STUDENT":
                profileDetails = await db.Students.findOne({
                    where: {
                        profileId: profileId
                    }
                })
                break;
            case "SECRETARY":
                profileDetails = await db.Secretaries.findOne({
                    where: {
                        profileId: profileId
                    }
                })
                break;
            case "TEACHER":
                profileDetails = await db.Teachers.findOne({
                    where: {
                        profileId: profileId
                    }
                })
                break;
            default: 
                profileDetails = null;
                break;
        }
        return profileDetails;
    },

    setProfileDetails: async (profileData, profileId, userRole) => {
        return new Promise(async (resolve, reject) => {
            var profileDetails
            switch (userRole) {
                case "STUDENT":
                    profileDetails = new db.Students(profileData)
                    break;
                case "SECRETARY":
                    profileDetails = new db.Secretaries(profileData)
                    break;
                case "TEACHER":
                    profileDetails = new db.Teachers(profileData)
                default:
                    profileDetails = null
                    break;
            }
            if(profileDetails != null) {
                profileDetails.profileId = profileId
                await profileDetails.save()
                .then((res) => { 
                    resolve(profileDetails)
                })
                .catch((message) => {
                    reject(`Profile details cannot be saved! ${message}`)
                })
            } else {
                resolve("No profile details are required")
            }
        })
    },

    createProfileObject(profile) {
        let profileObject = JSON.parse(JSON.stringify(profile))
        return profileObject
    },

    createUserObject(user, userRole, profile) {
        let userObject = JSON.parse(JSON.stringify(user))
        let userRoleObject = JSON.parse(JSON.stringify(userRole))
        let profileObject = JSON.parse(JSON.stringify(profile))
        userObject.userRole = userRoleObject
        userObject.profile = profileObject
        return userObject
    }
}