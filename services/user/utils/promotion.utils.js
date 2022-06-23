module.exports = {

    isValidYear: function (year) {
        const validYear = /^(19|20)\d{2}$/
        return validYear.test(String(year))
    }, 

    validateYear: function (req, res) {
        return new Promise((resolve, reject) => {
            if(Object.keys(req.body).length === 0) {
                reject("There is no information to create a new promotion", 404)
            }
            if(!this.isValidYear(req.body.year)) {
                reject("Year is invalid", 404)
            } else {
                resolve("Data are passed!", 200)
            }
        })
    }
}