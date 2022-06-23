const ADMINMENU = ['Dashboard', 'Toti utilizatorii', 'Utilizatori blocati',  'Utilizatori conectati', 'Adaugare utilizator', 'Adaugare Facultate']
const SECRETARYMENU = ['Dashboard', 'Adaugare promotie', 'Adaugare anunturi' ,'Adaugare studenti', 'Adaugare profesori', 'Proiecte licenta', 'Proiecte disertatie', 'Studenti neinscrisi']
const STUDENTMENU = ['Dashboard', 'Cererile mele', 'Proiectul meu', 'Mesaje']
const TEACHERMENU = ['Dashboard', 'Studenti', 'Proiecte', 'Mesaje']

const ADMINREDIRECT = ['/dashboard', '/all-users', '/blocked-users', '/users-online', 'add-users', '/add-faculty']
const SECRETARYREDIRECT = ['/dashboard', '/add-promotion' ,'/add-announce', '/add-students', '/add-teachers', '/bachelor-projects', '/disertation-projects', '/no-proj-students']
const STUDENTREDIRECT = ['/dashboard', '/my-request', '/my-project', '/messages']
const TEACHERREDIRECT = ['/dashboard', '/my-students', '/my-projects', '/messages']

const ADMINICONS = ['<Dashboard/>', '<Group/>', '<Group/>', '<Group/>', '<Group/>', '<AccountBalance/>']
const SECRETARYICONS = ['<Dashboard/>', '<Add/>','<AddComment/>', '<PersonAddAlt/>', '<PersonAddAlt/>', '<School/>', '<School/>', '<Person/>']
const STUDENTICONS = ['<Dashboard/>', '<Folder/>','<Folder/>', '<Message/>']
const TEACHERICONS = ['<Dashboard/>', '<Person/>', '<Folder/>', '<Message/>']
 


module.exports = {
    generateAppMenuByRole: function (role) {
        let menu = {
            menuList: []
        }
        switch(role) {
            case "ADMIN":
                ADMINMENU.map((adminMenu, index) => {
                    menu.menuList.push({
                        'title': adminMenu,
                        'redirect': ADMINREDIRECT[index],
                        'icon': ADMINICONS[index]
                    })
                })
                break
           case "SECRETARY":
                SECRETARYMENU.map((secretaryMenu, index) => {
                    menu.menuList.push({
                        'title': secretaryMenu,
                        'redirect': SECRETARYREDIRECT[index],
                        'icon': SECRETARYICONS[index]
                    })
                })
                break
            case "STUDENT":
                STUDENTMENU.map((studentMenu, index) => {
                    menu.menuList.push({
                        'title': studentMenu,
                        'redirect': STUDENTREDIRECT[index],
                        'icon': STUDENTICONS[index]
                    })
                })
                break
            case "TEACHER":
                TEACHERMENU.map((teacherMenu, index) => {
                    menu.menuList.push({
                        'title': teacherMenu,
                        'redirect': TEACHERREDIRECT[index],
                        'icon': TEACHERICONS[index]
                    })
                })
        }
        return menu
    },

    generateAdminDashboardContent: function(data, dashboard) {
        // User blocked
        dashboard.content.push({
            'title': 'Utilizatori blocati',
            'titleVariant': 'h5',
            'titleColor': 'white',
            'value': data.length,
            'valueVariant': 'h2',
            'valueColor': 'white',
            'valueWidth': '100'
        }, {
            'title': 'Alt tile',
            'titleVariant': 'h5',
            'titleColor': 'white',
            'value': data.length,
            'valueVariant': 'h2',
            'valueColor': 'white',
            'valueWidth': '100' 
        })

        return dashboard
    },

    generateAllUsersDataGrid: function(rawData) {
        let data = {
            columns: [],
            rows: []
        }
        let width = 100 / 6
        data.columns.push(
            {'field': 'email', 'headerName': 'Email', 'editable': false, 'width': 200},
            {'field': 'lastName', 'headerName': 'Nume', 'editable': false, 'width': 200},
            {'field': 'firstName', 'headerName': 'Prenume', 'editable': false, 'width': 200},
            {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': false, 'width':200},
            {'field': 'roleName', 'headerName': 'Rol', 'editable': false, 'width': 200},
            {'field': 'userBlocked', 'headerName': 'Utilizator blocat', 'editable': false, 'width':200}
        )
        rawData.map((item, index) => {
            data.rows.push(
                {
                    'id': index+1,
                    'email': item.email, 
                    'lastName': item.Profile.lastName,
                    'firstName': item.Profile.firstName,
                    'phoneNumber': item.Profile.phoneNumber,
                    'roleName': item.UserRole.roleName,
                    'userBlocked': item.userBlocked
                }
            )
        })

        return data
    },

    generateAllBlockedUsersDataGrid: function(rawData) {
        let data = {
            columns: [],
            rows: []
        }
        let width = 100 / 6
        data.columns.push(
            {'field': 'email', 'headerName': 'Email', 'editable': false, 'width': 200},
            {'field': 'lastName', 'headerName': 'Nume', 'editable': false, 'width': 200},
            {'field': 'firstName', 'headerName': 'Prenume', 'editable': false, 'width': 200},
            {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': false, 'width':200},
            {'field': 'roleName', 'headerName': 'Rol', 'editable': false, 'width': 200},
            {'field': 'userBlocked', 'headerName': 'Utilizator blocat', 'editable': true, 'width':200}
        )
        rawData.map((item, index) => {
            data.rows.push(
                {
                    'id': index+1,
                    'email': item.email, 
                    'lastName': item.Profile.lastName,
                    'firstName': item.Profile.firstName,
                    'phoneNumber': item.Profile.phoneNumber,
                    'roleName': item.UserRole.roleName,
                    'userBlocked': item.userBlocked
                }
            )
        })

        return data
    }
}