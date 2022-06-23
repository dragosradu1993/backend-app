const fs = require('fs')
const path = require('path')
const multiparty = require('multiparty')

const pathList = ["logo", "image", "document", "userAvatar", "others"]
module.exports = {
    createDirectory: async function (dirPath) {
        fs.mkdirSync(dirPath, {recursive: true})
    },

    envDirectory: function(env)  {
        let dir = path.resolve("./")
        return dir + "/resources/" + env + "/upload/"
    },

    createUploadPath: async function(req) {
        return new Promise(async (resolve, reject) => {

        })
    },

    setPath: function(typeOfContent, directory) {
        switch(typeOfContent) {
            case "logo":
                return directory + "logo/"
                break
            case "image":
                return directory + "images/"
                break
            case "document":
                return directory + "documents/"
                break
            case "userAvatar":
                return directory + "userAvatars/"
                break
            default:
                return directory + "others/"
                break
        }
    },

    initUploadDirectories: async function(env) {
        let baseDirectory = this.envDirectory(env)
        for (i=0;i<pathList.length; i++)
        {
            let path = this.setPath(pathList[i], baseDirectory)
            await this.createDirectory(path)
        }
        console.log("Directories are initiated!")
        
    }
}