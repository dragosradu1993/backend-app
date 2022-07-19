const { connect } = require("../../../app")
const facultiesController = require("../../../controllers/faculties.controller")
const messagesController = require("../../../controllers/messages.controller")
const secretariesController = require("../../../controllers/secretaries.controller")
const studentController = require("../../../controllers/student.controller")
const userController = require("../../../controllers/user.controller")

const ADMINMENU = ['Dashboard', 'Toti utilizatorii', 'Utilizatori blocați', 'Adăugare utilizator', 'Adăugare facultate']
const SECRETARYMENU = ['Dashboard', 'Adăugare promoție', 'Adăugare anunțuri' ,'Adăugare studenți', 'Adăugare profesori', 'Proiecte licență', 'Proiecte disertație', 'Studenți neînscriși']
const STUDENTMENU = ['Dashboard', 'Cererile mele', 'Proiectele mele', 'Mesaje']
const TEACHERMENU = ['Dashboard', 'Cereri studenți', 'Proiecte', 'Mesaje']

const ADMINREDIRECT = ['/dashboard', '/all-users', '/blocked-users', '/add-users', '/add-faculty']
const SECRETARYREDIRECT = ['/dashboard', '/add-promotion' ,'/add-announce', '/add-students', '/add-teachers', '/bachelor-projects', '/disertation-projects', '/no-proj-students']
const STUDENTREDIRECT = ['/dashboard', '/my-request', '/my-projects', '/messages']
const TEACHERREDIRECT = ['/dashboard', '/my-request', '/my-projects', '/messages']

const ADMIN_CONTENT_TYPE = ['page', 'page', 'page', 'page', 'page']
const SECRETARY_CONTENT_TYPE = ['page', 'dialog', 'dialog', 'page', 'page', 'page', 'page', 'page']
const STUDENT_CONTENT_TYPE = ['page', 'page', 'page', 'page', 'page', 'page']
const TEACHER_CONTENT_TYPE = ['page', 'page', 'page', 'page', 'page', 'page']

const ADMINICONS = ['<Dashboard/>', '<Group/>', '<Group/>', '<Group/>', '<AccountBalance/>']
const SECRETARYICONS = ['<Dashboard/>', '<Add/>','<AddComment/>', '<PersonAddAlt/>', '<PersonAddAlt/>', '<School/>', '<School/>', '<Person/>']
const STUDENTICONS = ['<Dashboard/>', '<Folder/>','<Folder/>', '<Message/>']
const TEACHERICONS = ['<Dashboard/>', '<Folder/>', '<Folder/>', '<Message/>']

const SETTINGS  = {
    addStudentsBySecretaryTextFields: [
        {
            label: 'Email',
            id: `textfield1`,
            valueType: 'email',
            sendKey: 'email',
            type: 'text'
        },
        {
            label: 'Nume',
            id: `textfield2`,
            valueType: 'lastName',
            sendKey: 'lastName',
            type: 'text'
        },
        {
            label: 'Prenume',
            id: `textfield3`,
            valueType: 'firstName',
            sendKey: 'firstName',
            type: 'text'
        },
        {
            label: 'CNP',
            id: `textfield4`,
            valueType: 'identityId',
            sendKey: 'identityId',
            type: 'text'
        },
    ],
    addStudentsBySecretaryAutoComplete: [
        {
            isAutocomplete: true,
            id: `textfieldautocomplete1`,
            options: [
                { title: 'Licență', value: 'LICENTA', key: 'type' },
                { title: 'Master', value: 'MASTER', key: 'type' }
            ],
            label: 'Forma de învățământ',
            sendKey: 'type',
        },
        {
            isAutocomplete: true,
            id: `textfieldautocomplete2`,
            options: [
                { title: 'Zi', value: 'ZI', key: 'educationForm' },
                { title: 'La distanță', value: 'ID', key: 'educationForm' }
            ],
            label: 'Frecvență',
            sendKey: 'educationForm',
        },
        {
            isAutocomplete: true,
            id: `textfieldautocomplete3`,
            options: [
                { title: 'Buget', value: 'BUGET', key: 'budgetForm' },
                { title: 'Taxă', value: 'TAXA', key: 'budgetForm' }
            ],
            label: 'Forma de finanțare',
            sendKey: 'budgetForm',
        }
    ],
    addTeachersBySecretaryTextFields: [
        {
            label: 'Email',
            id: `textfield1`,
            valueType: 'email',
            sendKey: 'email',
            type: 'text'
        },
        {
            label: 'Nume',
            id: `textfield2`,
            valueType: 'lastName',
            sendKey: 'lastName',
            type: 'text'
        },
        {
            label: 'Prenume',
            id: `textfield3`,
            valueType: 'firstName',
            sendKey: 'firstName',
            type: 'text'
        },
        {
            label: 'Departament',
            id: `textfield4`,
            valueType: 'department',
            sendKey: 'department',
            type: 'text'
        },
        {
            label: 'Număr locuri pentru licență',
            id: `textfield5`,
            valueType: 'availableSlotsBachelors',
            sendKey: 'availableSlotsBachelors',
            type: 'text'
        },
        {
            label: 'Număr locuri pentru disertație',
            id: `textfield6`,
            valueType: 'availableSlotsDisertations',
            sendKey: 'availableSlotsDisertations',
            type: 'text'
        }
    ],
    addTeachersBySecretaryAutoComplete: [
        {
            isAutocomplete: true,
            id: `textfieldautocomplete1`,
            options: [
                { title: 'Da', value: true, key: 'isCoordinatorBachelors' },
                { title: 'Nu', value: false, key: 'isCoordinatorBachelors' }
            ],
            label: 'Coordonator proiecte licență',
            sendKey: 'isCoordinatorBachelors',
        },
        {
            isAutocomplete: true,
            id: `textfieldautocomplete2`,
            options: [
                { title: 'Da', value: true, key: 'isCoordinatorDisertation' },
                { title: 'Nu', value: false, key: 'isCoordinatorDisertation' }
            ],
            label: 'Coordonator proiecte disertație',
            sendKey: 'isCoordinatorDisertation',
        }
    ],
    addUsersByAdminTextFields: [
        {
            label: 'Email',
            id: `textfield1`,
            valueType: 'email',
            sendKey: 'email',
            type: 'text'
        },
        {
            label: 'Parola',
            id: `textfield2`,
            valueType: 'password',
            sendKey: 'password',
            type: 'text'
        },
        {
            label: 'Nume',
            id: `textfield3`,
            valueType: 'lastName',
            sendKey: 'lastName',
            type: 'text'
        },
        {
            label: 'Prenume',
            id: `textfield4`,
            valueType: 'firstName',
            sendKey: 'firstName',
            type: 'text'
        },
        {
            label: 'Telefon',
            id: `textfield5`,
            valueType: 'phoneNumber',
            sendKey: 'phoneNumber',
            type: 'text'
        }
    ],
    addUsersByAdminAutoComplete: [
        {
            isAutocomplete: true,
            id: `textfieldautocomplete1`,
            options: [
                { title: 'Administrator', value: 'ADMIN', key: 'roleName' },
                { title: 'Secretariat', value: 'SECRETARY', key: 'roleName' },
                { title: 'Student', value: 'STUDENT', key: 'roleName' },
                { title: 'Profesor', value: 'TEACHER', key: 'roleName' },
            ],
            label: 'Rol',
            sendKey: 'roleName',
        }
    ],      
}

const SETTINGS_FIELDS = {
    role: {
        admin: {
            textFields: {
                addUsers: [
                    {
                        label: 'Email',
                        id: `textfield1`,
                        valueType: 'email',
                        sendKey: 'email',
                        type: 'text'
                    },
                    {
                        label: 'Parola',
                        id: `textfield2`,
                        valueType: 'password',
                        sendKey: 'password',
                        type: 'text'
                    },
                    {
                        label: 'Nume',
                        id: `textfield3`,
                        valueType: 'lastName',
                        sendKey: 'lastName',
                        type: 'text'
                    },
                    {
                        label: 'Prenume',
                        id: `textfield4`,
                        valueType: 'firstName',
                        sendKey: 'firstName',
                        type: 'text'
                    },
                    {
                        label: 'Telefon',
                        id: `textfield5`,
                        valueType: 'phoneNumber',
                        sendKey: 'phoneNumber',
                        type: 'text'
                    }
                ],
                addFaculties: [
                    {
                        label: 'Nume facultate',
                        id: `textfield1`,
                        valueType: 'name',
                        sendKey: 'name',
                        type: 'text'
                    },
                    {
                        label: 'Adresă facultate',
                        id: `textfield2`,
                        valueType: 'address',
                        sendKey: 'address',
                        type: 'text'
                    },
                    {
                        label: 'Telefon',
                        id: `textfield3`,
                        valueType: 'phoneNumber',
                        sendKey: 'phoneNumber',
                        type: 'text'
                    },
                    {
                        label: 'Cod facultate',
                        id: `textfield4`,
                        valueType: 'shortName',
                        sendKey: 'shortName',
                        type: 'text'
                    }              
                ]
            },
            autoComplete: {
                addUsers: [
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete1`,
                        options: [
                            { title: 'Administrator', value: 'ADMIN', key: 'roleName' },
                            { title: 'Secretariat', value: 'SECRETARY', key: 'roleName' },
                            { title: 'Student', value: 'STUDENT', key: 'roleName' },
                            { title: 'Profesor', value: 'TEACHER', key: 'roleName' },
                        ],
                        label: 'Rol',
                        sendKey: 'roleName',
                    }
                ]
            }
        },
        secretary: {
            textFields: {
                addStudents: [
                    {
                        label: 'Email',
                        id: `textfield1`,
                        valueType: 'email',
                        sendKey: 'email',
                        type: 'text'
                    },
                    {
                        label: 'Nume',
                        id: `textfield2`,
                        valueType: 'lastName',
                        sendKey: 'lastName',
                        type: 'text'
                    },
                    {
                        label: 'Prenume',
                        id: `textfield3`,
                        valueType: 'firstName',
                        sendKey: 'firstName',
                        type: 'text'
                    },
                    {
                        label: 'CNP',
                        id: `textfield4`,
                        valueType: 'identityId',
                        sendKey: 'identityId',
                        type: 'text'
                    },
                ],
                addTeachers: [
                    {
                        label: 'Email',
                        id: `textfield1`,
                        valueType: 'email',
                        sendKey: 'email',
                        type: 'text'
                    },
                    {
                        label: 'Nume',
                        id: `textfield2`,
                        valueType: 'lastName',
                        sendKey: 'lastName',
                        type: 'text'
                    },
                    {
                        label: 'Prenume',
                        id: `textfield3`,
                        valueType: 'firstName',
                        sendKey: 'firstName',
                        type: 'text'
                    },
                    {
                        label: 'Departament',
                        id: `textfield4`,
                        valueType: 'department',
                        sendKey: 'department',
                        type: 'text'
                    },
                    {
                        label: 'Număr locuri pentru licență',
                        id: `textfield5`,
                        valueType: 'availableSlotsBachelors',
                        sendKey: 'availableSlotsBachelors',
                        type: 'text'
                    },
                    {
                        label: 'Număr locuri pentru disertație',
                        id: `textfield6`,
                        valueType: 'availableSlotsDisertations',
                        sendKey: 'availableSlotsDisertations',
                        type: 'text'
                    }
                ]
            },
            autoComplete: {
                addStudents: [
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete1`,
                        options: [
                            { title: 'Licență', value: 'LICENTA', key: 'type' },
                            { title: 'Master', value: 'MASTER', key: 'type' }
                        ],
                        label: 'Forma de învățământ',
                        sendKey: 'type',
                    },
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete2`,
                        options: [
                            { title: 'Zi', value: 'ZI', key: 'educationForm' },
                            { title: 'La distanță', value: 'ID', key: 'educationForm' }
                        ],
                        label: 'Frecvență',
                        sendKey: 'educationForm',
                    },
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete3`,
                        options: [
                            { title: 'Buget', value: 'BUGET', key: 'budgetForm' },
                            { title: 'Taxă', value: 'TAXA', key: 'budgetForm' }
                        ],
                        label: 'Forma de finanțare',
                        sendKey: 'budgetForm',
                    }
                ],
                addTeachers: [
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete1`,
                        options: [
                            { title: 'Da', value: true, key: 'isCoordinatorBachelors' },
                            { title: 'Nu', value: false, key: 'isCoordinatorBachelors' }
                        ],
                        label: 'Coordonator proiecte licență',
                        sendKey: 'isCoordinatorBachelors',
                    },
                    {
                        isAutocomplete: true,
                        id: `textfieldautocomplete2`,
                        options: [
                            { title: 'Da', value: true, key: 'isCoordinatorDisertation' },
                            { title: 'Nu', value: false, key: 'isCoordinatorDisertation' }
                        ],
                        label: 'Coordonator proiecte disertație',
                        sendKey: 'isCoordinatorDisertation',
                    }
                ]
            }
        }
    }
}


module.exports = {
    generateAppMenuByRole: function (data) {
        let menu = {
            menuList: []
        }
        switch(data.role) {
            case "ADMIN":
                ADMINMENU.map((adminMenu, index) => {
                    menu.menuList.push({
                        'title': adminMenu,
                        'redirect': ADMINREDIRECT[index],
                        'redirectType': ADMIN_CONTENT_TYPE[index],
                        'icon': ADMINICONS[index]
                    })
                })
                break
           case "SECRETARY":
                SECRETARYMENU.map((secretaryMenu, index) => {
                    if(data.type === 'LICENTA'){
                        if(SECRETARYREDIRECT[index] !== '/disertation-projects') {
                            menu.menuList.push({
                                'title': secretaryMenu,
                                'redirect': SECRETARYREDIRECT[index],
                                'redirectType': SECRETARY_CONTENT_TYPE[index],
                                'icon': SECRETARYICONS[index]
                            })
                        }
                    }
                    if(data.type === 'MASTER'){
                        if(SECRETARYREDIRECT[index] !== '/bachelor-projects') {
                            menu.menuList.push({
                                'title': secretaryMenu,
                                'redirect': SECRETARYREDIRECT[index],
                                'redirectType': SECRETARY_CONTENT_TYPE[index],
                                'icon': SECRETARYICONS[index]
                            })
                        }
                    }
                })
                break
            case "STUDENT":
                STUDENTMENU.map((studentMenu, index) => {
                    menu.menuList.push({
                        'title': studentMenu,
                        'redirect': STUDENTREDIRECT[index],
                        'redirectType': STUDENT_CONTENT_TYPE[index],
                        'icon': STUDENTICONS[index]
                    })
                })
                break
            case "TEACHER":
                TEACHERMENU.map((teacherMenu, index) => {
                    menu.menuList.push({
                        'title': teacherMenu,
                        'redirect': TEACHERREDIRECT[index],
                        'redirectType': TEACHER_CONTENT_TYPE[index],
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
            'titleColor': '#1a1a1a',
            'value': data.length,
            'valueVariant': 'h2',
            'valueColor': '#1a1a1a',
            'valueWidth': '100',
            'cardColor': data.length ? '#ff5c33' : '#99CAF9'
        }, {
            'title': 'Alt tile',
            'titleVariant': 'h5',
            'titleColor': '#1a1a1a',
            'value': data.length,
            'valueVariant': 'h2',
            'valueColor': '#1a1a1a',
            'valueWidth': '100',
            'cardColor': data.length ? '#ff5c33' : '#99CAF9'
        })

        return dashboard
    },
        
    calculateHowManyDays: (deadline) => {
            const deadlineDate = new Date(deadline)
            const todayDate = new Date(Date.now())
            const substract = deadlineDate.getTime() - todayDate.getTime()
            const days = Math.ceil(substract / (1000*3600*24))
            let dateLimit
            if(days <= 0) {
                    dateLimit = {
                        isOutdated: true,
                        bgColorAnnounce: '#e0e0e0',
                        textColorAnnounce: '#424242',
                        bgcolor: '#e0e0e0',
                        color: '#424242',
                        textColorTime : '#b71c1c',
                        dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                        dateLimitSubtitle: 'Timpul limită a expirat sau promoția aleasă nu este cea curentă',
                        dateLimitSubtitle2: 'Zile rămase',
                        numberOfDays: 0
                    }
            }
            if(days > 0 && days <= 15) {
                    dateLimit = {
                        isOutdated: false,
                        bgColorAnnounce: '#3f51b5',
                        textColorAnnounce: '#fafafa',
                        bgcolor: 'white',
                        color: '#212121',
                        textColorTime : '#fbc02d',
                        dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                        dateLimitSubtitle: `Nu uita, data limită pentru alegerea temei este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                        dateLimitSubtitle2: 'Zile rămase',
                        numberOfDays: days
                    }
            }
            if(days > 15) {
                    dateLimit = {
                        isOutdated: false,
                        bgColorAnnounce: '#3f51b5',
                        textColorAnnounce: '#fafafa',
                        bgcolor: 'white',
                        color: '#212121',
                        textColorTime : '#33691e',
                        dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                        dateLimitSubtitle: `Data limită pentru alegerea temei este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                        dateLimitSubtitle2: 'Zile rămase',
                        numberOfDays: days
                    }
            }
            return dateLimit
        },

        calculateHowManyDaysTeachers: (deadline, type) => {
            const deadlineDate = new Date(deadline)
            const todayDate = new Date(Date.now())
            const substract = deadlineDate.getTime() - todayDate.getTime()
            const days = Math.ceil(substract / (1000*3600*24))
            let dateLimit
            if(type==='SLOTS') {
                if(days <= 0) {
                    dateLimit = {
                        isOutdated: true,
                        bgColorAnnounce: '#e0e0e0',
                        textColorAnnounce: '#424242',
                        bgcolor: '#e0e0e0',
                        color: '#424242',
                        textColorTime : '#b71c1c',
                        dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                        dateLimitSubtitle: 'Timpul limită a expirat sau promoția aleasă nu este cea curentă',
                        dateLimitSubtitle2: 'Zile rămase',
                        numberOfDays: 0
                    }
                }
                if(days > 0 && days <= 15) {
                        dateLimit = {
                            isOutdated: false,
                            bgColorAnnounce: '#3f51b5',
                            textColorAnnounce: '#fafafa',
                            bgcolor: 'white',
                            color: '#212121',
                            textColorTime : '#fbc02d',
                            dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                            dateLimitSubtitle: `Nu uita, data limită pentru setarea locurilor disponibile este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                            dateLimitSubtitle2: 'Zile rămase',
                            numberOfDays: days
                        }
                }
                if(days > 15) {
                        dateLimit = {
                            isOutdated: false,
                            bgColorAnnounce: '#3f51b5',
                            textColorAnnounce: '#fafafa',
                            bgcolor: 'white',
                            color: '#212121',
                            textColorTime : '#33691e',
                            dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                            dateLimitSubtitle: `Data limită pentru setarea locurilor disponibile este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                            dateLimitSubtitle2: 'Zile rămase',
                            numberOfDays: days
                        }
                }
            }
            if(type==='REQUESTS') {
                if(days <= 0) {
                    dateLimit = {
                        isOutdated: true,
                        bgColorAnnounce: '#e0e0e0',
                        textColorAnnounce: '#424242',
                        bgcolor: '#e0e0e0',
                        color: '#424242',
                        textColorTime : '#b71c1c',
                        dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                        dateLimitSubtitle: 'Timpul limită a expirat sau promoția aleasă nu este cea curentă',
                        dateLimitSubtitle2: 'Zile rămase',
                        numberOfDays: 0
                    }
                }
                if(days > 0 && days <= 15) {
                        dateLimit = {
                            isOutdated: false,
                            bgColorAnnounce: '#3f51b5',
                            textColorAnnounce: '#fafafa',
                            bgcolor: 'white',
                            color: '#212121',
                            textColorTime : '#fbc02d',
                            dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                            dateLimitSubtitle: `Nu uita, data limită pentru acceptarea cererilor este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                            dateLimitSubtitle2: 'Zile rămase',
                            numberOfDays: days
                        }
                }
                if(days > 15) {
                        dateLimit = {
                            isOutdated: false,
                            bgColorAnnounce: '#3f51b5',
                            textColorAnnounce: '#fafafa',
                            bgcolor: 'white',
                            color: '#212121',
                            textColorTime : '#33691e',
                            dateLimitValue: deadlineDate.toLocaleDateString('ro-RO'),
                            dateLimitSubtitle: `Data limită pentru acceptarea cererilor este ${deadlineDate.toLocaleDateString('ro-RO')}`,
                            dateLimitSubtitle2: 'Zile rămase',
                            numberOfDays: days
                        }
                }
            }

            return dateLimit
        },        

    generateTeacherDashboard: async function (data) {
        let dashboard = {
            title: `Salut ${data.user.Profile.firstName} ${data.user.Profile.lastName}`,
            user: {
                id: data.user.id,
                profileId: data.user.Profile.id
            },
            views: []            
        }

        let view
        let faculties = data.faculty
        for(let i = 0; i < faculties.length; i++) {
            let faculty = {}
            let teachers = faculties[i].Teachers
            for(let j = 0; j < teachers.length; j++) {
                const messagesRead = await messagesController.getRead(teachers[j].id, teachers[j].Promotions[0].id)
                const messagesUnread = await messagesController.getRead(teachers[j].id, teachers[j].Promotions[0].id)
                const messages = await messagesController.getMessages(teachers[j].id, teachers[j].Promotions[0].id)
                faculty = {
                    ...faculty,
                    title: `${faculties[i].name}\nPromoția ${teachers[j].Promotions[0].year}`,
                    facultyName: faculties[i].name,
                    promotionYear: teachers[j].Promotions[0].year,
                    isCurrentPromotion: teachers[j].Promotions[0].isCurrent,
                    facultyId: faculties[i].id,
                    promotionId: teachers[j].Promotions[0].id,
                    teacherId: teachers[j].id,
                    availableSlotsBachelors: teachers[j].Promotions[0].Promotions_Teachers.availableSlotsBachelors,
                    availableSlotsDisertations: teachers[j].Promotions[0].Promotions_Teachers.availableSlotsDisertations,
                    isCoordinatorBachelors: teachers[j].Promotions[0].Promotions_Teachers.isCoordinatorBachelors,
                    isCoordinatorDisertation: teachers[j].Promotions[0].Promotions_Teachers.isCoordinatorDisertation,
                    messages: {
                        read: [],
                        notRead: [],
                        all: []
                    },
                    dateLimits: {
                        students: this.calculateHowManyDaysTeachers(teachers[j].Promotions[0].dateLimitStudents,'REQUESTS'),
                        teachers: this.calculateHowManyDaysTeachers(teachers[j].Promotions[0].dateLimitTeachers,'SLOTS'),
                    },
                    projects: {
                        bachelors: [],
                        disertations: [],
                        bachelorsStatus: {
                            pending: 0,
                            rejected: 0,
                            approved: 0
                        },
                        disertationsStatus: {
                            pending: 0,
                            rejected: 0,
                            approved: 0
                        },
                    },
                    myStudents: {
                        bachelors: [],
                        disertations: []
                    }

                }
                if(messagesRead) {
                    let message = {}
                    for(let m=0;m<messagesRead.length;m++) {
                        message = {
                            id: messagesRead[m].id,
                            text: messagesRead[m].text,
                            senderName: messagesRead[m].senderName,
                            senderId: messagesRead[m].senderId,
                            receiverId: messagesRead[m].receiverId,
                            state: messagesRead[m].state
                        }
                        faculty.messages.read.push(message)
                    }
                }
                if(messagesUnread) {
                    let message = {}
                    for(let m=0;m<messagesUnread.length;m++) {
                        message = {
                            id: messagesUnread[m].id,
                            text: messagesUnread[m].text,
                            senderName: messagesUnread[m].senderName,
                            senderId: messagesUnread[m].senderId,
                            receiverId: messagesUnread[m].receiverId,
                            state: messagesUnread[m].state
                        }
                        faculty.messages.notRead.push(message)
                    }
                }

                if(messages) {
                    let message = {}
                    for(let m=0;m<messages.length;m++) {
                        message = {
                            id: messages[m].id,
                            text: messages[m].text,
                            senderName: messages[m].senderName,
                            senderId: messages[m].senderId,
                            receiverId: messages[m].receiverId,
                            state: messages[m].state
                        }
                        faculty.messages.all.push(message)
                    }
                }

                let projects = teachers[j].Promotions[0].Projects
                let myStudent, students
                students = teachers[j].Promotions[0].Students
                for(let k=0; k<projects.length; k++) {
                    if(projects[k].TeacherId === teachers[j].id) {
                            if(projects[k].type === 'LICENTA') {
                                for(l=0;l<students.length;l++) {
                                    myStudent = {}
                                    if(projects[k].StudentId === students[l].id) {
                                        if(projects[k].state === 'APPROVED') {
                                            myStudent = {
                                                studentId: students[l].id,
                                                studentType: students[l].type,
                                                profileId: students[l].ProfileId,
                                                firstName: students[l].Profile.firstName,
                                                lastName: students[l].Profile.lastName
                                            }
                                            faculty.projects.bachelorsStatus.approved = faculty.projects.bachelorsStatus.approved + 1
                                            faculty.myStudents.bachelors.push(myStudent)
                                        }
                                        if(projects[k].state === 'PENDING') {
                                            faculty.projects.bachelorsStatus.pending = faculty.projects.bachelorsStatus.pending + 1
                                        }
                                        if(projects[k].state === 'REJECTED') {
                                            faculty.projects.bachelorsStatus.rejected = faculty.projects.bachelorsStatus.rejected + 1
                                        }
                                        faculty.projects.bachelors.push({
                                            id: projects[k].id,
                                            name: projects[k].name,
                                            description: projects[k].description,
                                            type: projects[k].type,
                                            rejectReason: projects[k].rejectReason,
                                            state: projects[k].state,
                                            FacultyId: projects[k].FacultyId,
                                            StudentId: projects[k].StudentId,
                                            TeacherId: projects[k].TeacherId,
                                            PromotionId: projects[k].PromotionId,
                                            studentName: `${students[l].Profile.firstName} ${students[l].Profile.lastName}`
                                        })
                                    }
                            }
                            if(projects[k].type === 'MASTER') {
                                for(l=0;l<students.length;l++) {
                                    myStudent = {}
                                    if(projects[k].StudentId === students[l].id) {
                                        if(projects[k].state === 'APPROVED') {
                                            myStudent = {
                                                studentId: students[l].id,
                                                studentType: students[l].type,
                                                profileId: students[l].ProfileId,
                                                firstName: students[l].Profile.firstName,
                                                lastName: students[l].Profile.lastName
                                            }
                                            faculty.projects.disertationsStatus.approved = faculty.projects.disertationsStatus.approved + 1
                                            faculty.myStudents.disertations.push(myStudent)
                                        }
                                        if(projects[k].state === 'PENDING') {
                                            faculty.projects.disertationsStatus.pending = faculty.projects.disertationsStatus.pending + 1
                                        }
                                        if(projects[k].state === 'REJECTED') {
                                            faculty.projects.disertationsStatus.rejected = faculty.projects.disertationsStatus.rejected + 1
                                        }
                                        faculty.projects.disertations.push({
                                            id: projects[k].id,
                                            name: projects[k].name,
                                            description: projects[k].description,
                                            type: projects[k].type,
                                            rejectReason: projects[k].rejectReason,
                                            state: projects[k].state,
                                            FacultyId: projects[k].FacultyId,
                                            StudentId: projects[k].StudentId,
                                            TeacherId: projects[k].TeacherId,
                                            PromotionId: projects[k].PromotionId,
                                            studentName: `${students[l].Profile.firstName} ${students[l].Profile.lastName}`
                                        })
                                    }
                                }
                            }
                        }
                    }
                }


                view = {...faculty}
            }
            dashboard.views.push(view)
        }
        return dashboard
    },

    generateStudentDashboard: async function (data) {
        let dashboard = {
            title: `Salut ${data.user.Profile.firstName} ${data.user.Profile.lastName}`,
            user: {
                id: data.user.id,
                profileId: data.user.Profile.id
            },
            tabs: []
        }
        let tab
        for(let i = 0; i < data.educationForms.length; i++) {
            if(data.educationForms[i].value === 'LICENTA') {
                tab = {
                    title: data.educationForms[i].title,
                    key: data.educationForms[i].key,
                    value: data.educationForms[i].value,
                    views: []
                }
                let faculties = data.facultyBachelors
                for(let j=0;j<faculties.length;j++ ) {
                    //Each faculty
                    let faculty = {}
                    let students = faculties[j].Students
                    for(let k=0;k<students.length;k++) {
                        faculty = {
                            ...faculty,
                            title: `${faculties[j].name}\nPromoția ${students[k].Promotions[0].year}`,
                            facultyName: faculties[j].name,
                            promotionYear: students[k].Promotions[0].year,
                            isCurrentPromotion: students[k].Promotions[0].isCurrent,
                            facultyId: faculties[j].id,
                            promotionId: students[k].Promotions[0].id,
                            studentId: students[k].id,
                            teachers: [],
                            projects: [],
                            dateLimit: this.calculateHowManyDays(students[k].Promotions[0].dateLimitStudents)
                        }
                        let teachers = students[k].Promotions[0].Teachers
                        for(let l=0;l<teachers.length;l++) {
                            if(teachers[l].Promotions_Teachers.isCoordinatorBachelors) {
                                let teacher = {
                                    teacherId: teachers[l].id,
                                    isSelected: false,
                                    teacherDepartment: teachers[l].department,
                                    profileId: teachers[l].ProfileId,
                                    availableSlots: teachers[l].Promotions_Teachers.availableSlotsBachelors,
                                    name: `${teachers[l].Profile.lastName} ${teachers[l].Profile.firstName}`
                                }
                                faculty.teachers.push(teacher)
                            }
                        }
                        let projects = students[k].Promotions[0].Projects
                        for(let m=0;m<projects.length;m++) {
                            if(projects[m].StudentId === students[k].id) {
                                let project = {
                                    id: projects[m].id,
                                    FacultyId: projects[m].FacultyId,
                                    PromotionId: projects[m].PromotionId,
                                    StudentId: projects[m].StudentId,
                                    TeacherId: projects[m].TeacherId,
                                    createdAt: projects[m].createdAt,
                                    description: projects[m].description,
                                    name: projects[m].name,
                                    rejectReason: projects[m].rejectReason,
                                    state: projects[m].state,
                                    type: projects[m].type,
                                    updatedAt: projects[m].updatedAt
                                }
                                faculty.projects.push(project)
                            }
                        }
                        tab.views.push(faculty)
                    }
                }
                dashboard.tabs.push(tab)
            }
            if(data.educationForms[i].value === 'MASTER') {
                tab = {
                    title: data.educationForms[i].title,
                    key: data.educationForms[i].key,
                    value: data.educationForms[i].value,
                    views: []
                }
                let faculties = data.facultyDisertations
                for(let j=0;j<faculties.length;j++ ) {
                    //Each faculty
                    let faculty = {}
                    let students = faculties[j].Students
                    for(let k=0;k<students.length;k++) {
                        faculty = {
                            ...faculty,
                            title: `${faculties[j].name}\nPromoția ${students[k].Promotions[0].year}`,
                            facultyName: faculties[j].name,
                            promotionYear: students[k].Promotions[0].year,
                            isCurrentPromotion: students[k].Promotions[0].isCurrent,
                            facultyId: faculties[j].id,
                            promotionId: students[k].Promotions[0].id,
                            studentId: students[k].id,
                            teachers: [],
                            projects: [],
                            dateLimit: this.calculateHowManyDays(students[k].Promotions[0].dateLimitStudents)
                        }
                        let teachers = students[k].Promotions[0].Teachers
                        for(let l=0;l<teachers.length;l++) {
                            if(teachers[l].Promotions_Teachers.isCoordinatorDisertation) {
                                let teacher = {
                                    teacherId: teachers[l].id,
                                    teacherDepartment: teachers[l].department,
                                    profileId: teachers[l].ProfileId,
                                    availableSlots: teachers[l].Promotions_Teachers.availableSlotsDisertations,
                                    name: `${teachers[l].Profile.lastName} ${teachers[l].Profile.firstName}`
                                }
                                faculty.teachers.push(teacher)
                            }
                        }
                        let projects = students[k].Promotions[0].Projects
                        for(let m=0;m<projects.length;m++) {
                            if(projects[m].StudentId === students[k].id) {
                                let project = {
                                    id: projects[m].id,
                                    FacultyId: projects[m].FacultyId,
                                    PromotionId: projects[m].PromotionId,
                                    StudentId: projects[m].StudentId,
                                    TeacherId: projects[m].TeacherId,
                                    createdAt: projects[m].createdAt,
                                    description: projects[m].description,
                                    name: projects[m].name,
                                    rejectReason: projects[m].rejectReason,
                                    state: projects[m].state,
                                    type: projects[m].type,
                                    updatedAt: projects[m].updatedAt
                                }
                                faculty.projects.push(project)
                            }
                        }
                        tab.views.push(faculty)
                    }
                }
                dashboard.tabs.push(tab)
            }

        }
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

    generateDataGridPage: async function(facultyId, location, otherData) {
        let data = {
            page: {
                title: '',
                areButtons: false,
                buttons: []
              },
            dataGrid: {
                isEditable: false,
                settings: {
                  show: false,
                  loading: true,
                  rows: [],
                  columns: [],
                  columnThreshold: 0,
                  localeText: {
                    toolbarColumns: 'Coloane',
                    toolbarFilters: 'Filtre',
                    toolbarDensity: 'Mod afișare',
                    toolbarExportPrint: 'Printează',
                    toolbarExportCSV: 'Exportă în CSV',
                    toolbarExport: 'Exportă'
                  },
                  checkboxSelection: true
                }
            },
        }

        switch(location) {
            //Admin
            case 'admin-add-users':
                data.page.title = 'Adăugare utilizator'
                data.page.areButtons = true
                data.page.buttons = [
                    {
                        isUploadButton: true,
                        isDisabled: false,
                        icon: 'file-upload',
                        text: 'Încarcă fișier Excel',
                        action: 'upload-file',
                        type: 'upload-users'
                    },
                    {
                        isUploadButton: false,
                        isDisabled: false,
                        icon: 'add',
                        text: 'Adaugă un nou utilizator',
                        action: 'dialog',
                        type: 'add-one-user'
                    },  
                    {
                        isUploadButton: false,
                        isDisabled: false,
                        icon: 'add',
                        text: 'Înregistrează utilizatorii',
                        action: 'submit',
                        type: 'register-users'
                    },                  
                ]
                data.dataGrid.isEditable = true
                data.dataGrid.settings = {
                    show: true,
                    loading: false,
                    rows: [],
                    columns: [
                        {'field': 'email', 'headerName': 'Email', 'editable': true, 'flex': 1},
                        {'field': 'password', 'headerName': 'Parola', 'editable': true, 'flex': 1},
                        {'field': 'lastName', 'headerName': 'Nume', 'editable': true, 'flex': 1},
                        {'field': 'firstName', 'headerName': 'Prenume', 'editable': true, 'flex': 1},
                        {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': true, 'flex': 1},
                        {'field': 'roleName', 'headerName': 'Rol', 'editable': true, 'flex': 1},
                    ],
                    columnThreshold:6,
                    localeText: {
                        toolbarColumns: 'Coloane',
                        toolbarFilters: 'Filtre',
                        toolbarDensity: 'Mod afișare',
                        toolbarExportPrint: 'Printează',
                        toolbarExportCSV: 'Exportă în CSV',
                        toolbarExport: 'Exportă'
                      },
                      checkboxSelection: false
                    }
                break
                case 'admin-add-faculties':
                    data.page.title = 'Adăugare facultate'
                    data.page.areButtons = true
                    data.page.buttons = [
                        {
                            isUploadButton: true,
                            isDisabled: false,
                            icon: 'file-upload',
                            text: 'Încarcă fișier Excel',
                            action: 'upload-file',
                            type: 'upload-faculties'
                        },
                        {
                            isUploadButton: false,
                            isDisabled: false,
                            icon: 'add',
                            text: 'Adaugă o nouă facultate',
                            action: 'dialog',
                            type: 'add-one-faculty'
                        },  
                        {
                            isUploadButton: false,
                            isDisabled: false,
                            icon: 'add-business',
                            text: 'Înregistrează facultățile',
                            action: 'submit',
                            type: 'register-faculties'
                        },                  
                    ]
                    data.dataGrid.isEditable = true
                    data.dataGrid.settings = {
                        show: true,
                        loading: false,
                        rows: [],
                        columns: [
                            {'field': 'name', 'headerName': 'Nume facultate', 'editable': true, 'flex': 1},
                            {'field': 'address', 'headerName': 'Adresă facultate', 'editable': true, 'flex': 1},
                            {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': true, 'flex': 1},
                            {'field': 'shortName', 'headerName': 'Cod facultate', 'editable': true, 'flex': 1}
                        ],
                        columnThreshold:6,
                        localeText: {
                            toolbarColumns: 'Coloane',
                            toolbarFilters: 'Filtre',
                            toolbarDensity: 'Mod afișare',
                            toolbarExportPrint: 'Printează',
                            toolbarExportCSV: 'Exportă în CSV',
                            toolbarExport: 'Exportă'
                          },
                          checkboxSelection: false
                        }
                    break

            case 'secretary-add-students':
                data.page.title = 'Adăugare studenți',

                data.page.areButtons = true
                data.page.buttons = [
                    {
                        isUploadButton: true,
                        isDisabled: false,
                        icon: 'file-upload',
                        text: 'Încarcă fișier Excel',
                        action: 'upload-file',
                        type: 'upload-student'
                    },
                    {
                        isUploadButton: false,
                        isDisabled: false,
                        icon: 'add',
                        text: 'Adaugă un nou student',
                        action: 'dialog',
                        type: 'add-one-student'
                    },  
                    {
                        isUploadButton: false,
                        isDisabled: false,
                        icon: 'add',
                        text: 'Înregistrează studenții',
                        action: 'submit',
                        type: 'register-students'
                    },                  
                ]
                data.dataGrid.isEditable = true
                data.dataGrid.settings = {
                    show: true,
                    loading: false,
                    rows: [],
                    columns: [
                        {'field': 'email', 'headerName': 'Email', 'editable': true, 'flex': 1},
                        {'field': 'lastName', 'headerName': 'Nume', 'editable': true, 'flex': 1},
                        {'field': 'firstName', 'headerName': 'Prenume', 'editable': true, 'flex': 1},
                        {'field': 'identityId', 'headerName': 'CNP', 'editable': true, 'flex': 1},
                        {'field': 'type', 'headerName': 'Forma de învățământ', 'editable': true, 'flex': 1},
                        {'field': 'educationForm', 'headerName': 'Frecvența', 'editable': true, 'flex': 1},
                        {'field': 'budgetForm', 'headerName': 'Forma de finanțare', 'editable': true, 'flex': 1}
                    ],
                    columnThreshold:6,
                    localeText: {
                        toolbarColumns: 'Coloane',
                        toolbarFilters: 'Filtre',
                        toolbarDensity: 'Mod afișare',
                        toolbarExportPrint: 'Printează',
                        toolbarExportCSV: 'Exportă în CSV',
                        toolbarExport: 'Exportă'
                      },
                      checkboxSelection: false
                }
                break
                case 'secretary-add-teachers':
                    data.page.title = 'Adăugare profesori',
    
                    data.page.areButtons = true
                    data.page.buttons = [
                        {
                            isUploadButton: true,
                            isDisabled: false,
                            icon: 'file-upload',
                            text: 'Încarcă fișier Excel',
                            action: 'upload-file',
                            type: 'upload-teacher'
                        },
                        {
                            isUploadButton: false,
                            isDisabled: false,
                            icon: 'add',
                            text: 'Adaugă un nou profesor',
                            action: 'dialog',
                            type: 'add-one-teacher'
                        },  
                        {
                            isUploadButton: false,
                            isDisabled: false,
                            icon: 'add',
                            text: 'Înregistrează profesorii',
                            action: 'submit',
                            type: 'register-teachers'
                        },                  
                    ]
                    data.dataGrid.isEditable = true
                    data.dataGrid.settings = {
                        show: true,
                        loading: false,
                        rows: [],
                        columns: [
                            {'field': 'email', 'headerName': 'Email', 'editable': true, 'flex': 1},
                            {'field': 'lastName', 'headerName': 'Nume', 'editable': true, 'flex': 1},
                            {'field': 'firstName', 'headerName': 'Prenume', 'editable': true, 'flex': 1},
                            {'field': 'department', 'headerName': 'Departament', 'editable': true, 'flex': 1},
                            {'field': 'isCoordinatorBachelors', 'headerName': 'Licență', 'editable': true, 'flex': 1},
                            {'field': 'isCoordinatorDisertation', 'headerName': 'Master', 'editable': true, 'flex': 1},
                            {'field': 'availableSlotsBachelors', 'headerName': 'Locuri licență', 'editable': true, 'flex': 1},
                            {'field': 'availableSlotsDisertations', 'headerName': 'Locuri master', 'editable': true, 'flex': 1}
                        ],
                        columnThreshold:6,
                        localeText: {
                            toolbarColumns: 'Coloane',
                            toolbarFilters: 'Filtre',
                            toolbarDensity: 'Mod afișare',
                            toolbarExportPrint: 'Printează',
                            toolbarExportCSV: 'Exportă în CSV',
                            toolbarExport: 'Exportă'
                          },
                          checkboxSelection: false
                    }
                    break
                case 'secretary-get-bachelors':
                    data.page.title = 'Proiecte licență'
                    data.page.areButtons = true
                    data.page.buttons = [
                        {
                            isUploadButton: false,
                            isSelectInput: true,
                            props: {
                                defaultValue: otherData.promotions[0],
                                labelId: 'promotion-native-label',
                                id: 'promotion-native',
                                label: 'Promoția'
                            },
                            values: otherData.promotions,
                            isDisabled: false,
                            icon: '',
                            text: 'Promoția',
                            action: 'getData',
                            type: 'get-promotion'
                        },
                        {
                            isUploadButton: false,
                            isDisabled: false,
                            icon: 'refresh',
                            text: 'Actualizează',
                            action: 'refresh',
                            type: 'refresh-data'
                        }                 
                    ]
                    data.dataGrid.isEditable = true
                    data.dataGrid.settings = {
                        show: true,
                        loading: false,
                        rows: [],
                        columns: [
                            {'field': 'studentName', 'headerName': 'Nume student', 'editable': false, 'flex': 1},
                            {'field': 'projectName', 'headerName': 'Tema propusă', 'editable': false, 'flex': 1},
                            {'field': 'teacherName', 'headerName': 'Nume profesor', 'editable': false, 'flex': 1},
                            {'field': 'status', 'headerName': 'Status', 'editable': false, 'flex': 1}

                        ],
                        columnThreshold:6,
                        localeText: {
                            toolbarColumns: 'Coloane',
                            toolbarFilters: 'Filtre',
                            toolbarDensity: 'Mod afișare',
                            toolbarExportPrint: 'Printează',
                            toolbarExportCSV: 'Exportă în CSV',
                            toolbarExport: 'Exportă'
                          },
                          checkboxSelection: false
                    }
                    break
                    case 'secretary-get-disertation':
                        data.page.title = 'Proiecte disertație'
                        data.page.areButtons = true
                        data.page.buttons = [
                            {
                                isUploadButton: false,
                                isSelectInput: true,
                                props: {
                                    defaultValue: otherData.promotions[0],
                                    labelId: 'promotion-native-label',
                                    id: 'promotion-native',
                                    label: 'Promoția'
                                },
                                values: otherData.promotions,
                                isDisabled: false,
                                icon: '',
                                text: 'Promoția',
                                action: 'getData',
                                type: 'get-promotion'
                            },
                            {
                                isUploadButton: false,
                                isDisabled: false,
                                icon: 'refresh',
                                text: 'Actualizează',
                                action: 'refresh',
                                type: 'refresh-data'
                            }                 
                        ]
                        data.dataGrid.isEditable = true
                        data.dataGrid.settings = {
                            show: true,
                            loading: false,
                            rows: [],
                            columns: [
                                {'field': 'studentName', 'headerName': 'Nume student', 'editable': false, 'flex': 1},
                                {'field': 'projectName', 'headerName': 'Tema propusă', 'editable': false, 'flex': 1},
                                {'field': 'teacherName', 'headerName': 'Nume profesor', 'editable': false, 'flex': 1},
                                {'field': 'status', 'headerName': 'Status', 'editable': false, 'flex': 1}
    
                            ],
                            columnThreshold:6,
                            localeText: {
                                toolbarColumns: 'Coloane',
                                toolbarFilters: 'Filtre',
                                toolbarDensity: 'Mod afișare',
                                toolbarExportPrint: 'Printează',
                                toolbarExportCSV: 'Exportă în CSV',
                                toolbarExport: 'Exportă'
                              },
                              checkboxSelection: false
                        }
                        break
                        case 'secretary-get-no-proj-students':
                            data.page.title = 'Studenți neînscriși'
                            data.page.areButtons = true
                            data.page.buttons = [
                                {
                                    isUploadButton: false,
                                    isSelectInput: true,
                                    props: {
                                        defaultValue: otherData.promotions[0],
                                        labelId: 'promotion-native-label',
                                        id: 'promotion-native',
                                        label: 'Promoția'
                                    },
                                    values: otherData.promotions,
                                    isDisabled: false,
                                    icon: '',
                                    text: 'Promoția',
                                    action: 'getData',
                                    type: 'get-promotion'
                                },
                                {
                                    isUploadButton: false,
                                    isDisabled: false,
                                    icon: 'refresh',
                                    text: 'Actualizează',
                                    action: 'refresh',
                                    type: 'refresh-data'
                                }                 
                            ]
                            data.dataGrid.isEditable = true
                            data.dataGrid.settings = {
                                show: true,
                                loading: false,
                                rows: [],
                                columns: [
                                    {'field': 'email', 'headerName': 'Email', 'editable': true, 'flex': 1},
                                    {'field': 'lastName', 'headerName': 'Nume', 'editable': true, 'flex': 1},
                                    {'field': 'firstName', 'headerName': 'Prenume', 'editable': true, 'flex': 1},
                                    {'field': 'identityId', 'headerName': 'CNP', 'editable': true, 'flex': 1},
                                    {'field': 'type', 'headerName': 'Forma de învățământ', 'editable': true, 'flex': 1},
                                    {'field': 'educationForm', 'headerName': 'Frecvența', 'editable': true, 'flex': 1},
                                    {'field': 'budgetForm', 'headerName': 'Forma de finanțare', 'editable': true, 'flex': 1}
        
                                ],
                                columnThreshold:6,
                                localeText: {
                                    toolbarColumns: 'Coloane',
                                    toolbarFilters: 'Filtre',
                                    toolbarDensity: 'Mod afișare',
                                    toolbarExportPrint: 'Printează',
                                    toolbarExportCSV: 'Exportă în CSV',
                                    toolbarExport: 'Exportă'
                                  },
                                  checkboxSelection: false
                            }
                            break
                            case 'admin-get-all-users':
                                data.page.title = 'Toți utilizatorii'
                                data.page.areButtons = true
                                data.page.buttons = [
                                    {
                                        isUploadButton: false,
                                        isDisabled: false,
                                        icon: 'refresh-icon',
                                        text: 'Reîncarcă',
                                        action: 'refresh-data',
                                        type: 'refresh-users'
                                    },            
                                ]
                                data.dataGrid.isEditable = true
                                data.dataGrid.settings = {
                                    show: true,
                                    loading: false,
                                    rows: [],
                                    columns: [
                                        {'field': 'email', 'headerName': 'Email', 'editable': false, 'flex': 1},
                                        {'field': 'password', 'headerName': 'Parola', 'editable': false, 'flex': 1},
                                        {'field': 'lastName', 'headerName': 'Nume', 'editable': false, 'flex': 1},
                                        {'field': 'firstName', 'headerName': 'Prenume', 'editable': false, 'flex': 1},
                                        {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': false, 'flex': 1},
                                        {'field': 'roleName', 'headerName': 'Rol', 'editable': false, 'flex': 1},
                                    ],
                                    columnThreshold:6,
                                    localeText: {
                                        toolbarColumns: 'Coloane',
                                        toolbarFilters: 'Filtre',
                                        toolbarDensity: 'Mod afișare',
                                        toolbarExportPrint: 'Printează',
                                        toolbarExportCSV: 'Exportă în CSV',
                                        toolbarExport: 'Exportă'
                                      },
                                      checkboxSelection: false
                                    }
                                for(let i=0;i<otherData.users.length;i++) {
                                    data.dataGrid.settings.rows.push({
                                        id: otherData.users[i].id,
                                        email: otherData.users[i].email,
                                        lastName: otherData.users[i].Profile.lastName,
                                        firstName: otherData.users[i].Profile.firstName,
                                        phoneNumber: otherData.users[i].Profile.phoneNumber,
                                        roleName: otherData.users[i].UserRole.roleName
                                    })
                                }
                            break
                            case 'admin-get-all-blocked-users':
                                data.page.title = 'Utilizatori blocați'
                                data.page.areButtons = true
                                data.page.buttons = [
                                    {
                                        isUploadButton: false,
                                        isDisabled: false,
                                        icon: 'refresh-icon',
                                        text: 'Reîncarcă',
                                        action: 'refresh-data',
                                        type: 'refresh-users'
                                    }, 
                                    {
                                        isUploadButton: false,
                                        isDisabled: false,
                                        icon: 'lock-open',
                                        text: 'Deblocare utilizator',
                                        action: 'unblock-user',
                                        type: 'unblock-user'
                                    },             
                                ]
                                data.dataGrid.isEditable = true
                                data.dataGrid.settings = {
                                    show: true,
                                    loading: false,
                                    rows: [],
                                    columns: [
                                        {'field': 'email', 'headerName': 'Email', 'editable': false, 'flex': 1},
                                        {'field': 'lastName', 'headerName': 'Nume', 'editable': false, 'flex': 1},
                                        {'field': 'firstName', 'headerName': 'Prenume', 'editable': false, 'flex': 1},
                                        {'field': 'phoneNumber', 'headerName': 'Telefon', 'editable': false, 'flex': 1},
                                        {'field': 'roleName', 'headerName': 'Rol', 'editable': false, 'flex': 1},
                                    ],
                                    columnThreshold:6,
                                    localeText: {
                                        toolbarColumns: 'Coloane',
                                        toolbarFilters: 'Filtre',
                                        toolbarDensity: 'Mod afișare',
                                        toolbarExportPrint: 'Printează',
                                        toolbarExportCSV: 'Exportă în CSV',
                                        toolbarExport: 'Exportă'
                                      },
                                      checkboxSelection: true
                                    }
                                for(let i=0;i<otherData.users.length;i++) {
                                    data.dataGrid.settings.rows.push({
                                        id: otherData.users[i].id,
                                        email: otherData.users[i].email,
                                        lastName: otherData.users[i].Profile.lastName,
                                        firstName: otherData.users[i].Profile.firstName,
                                        phoneNumber: otherData.users[i].Profile.phoneNumber,
                                        roleName: otherData.users[i].UserRole.roleName
                                    })
                                }
                            break
        }

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
    },


    generateDialogData: async function(user, location, otherData) {
        let count = 1
        let data = {
            open: true,
            location: location,
            title: '',
            description: '',
            content: []
        }
        let content = {
            description: '',
            fields: []
        }
        let field = {
            isAutocomplete: false,
            options: [],
            id: '',
            label: '',

        }
        
        let json, jsonOtherData
        if(Object.keys(user).length > 0){
            json = JSON.parse(user)
        }
        if(otherData) {
            if(Object.keys(otherData).length > 0){
                jsonOtherData = JSON.parse(otherData)
            }
        }

        
        if(location === 'FIRST-LOGIN' || location === 'AFTER-RESET-PASSWORD') {
            
            //Get user profile
            const userProfile = await userController.getProfile(json.id, 'password')
            if(userProfile) {
                data.title = `Salut ${userProfile.Profile.firstName} ${userProfile.Profile.lastName}!`
            } else {
                data.title = `Salut!`
            }
            //Set the description for new password
            if(location === 'AFTER-RESET-PASSWORD') {
                data.description = 'Pentru că tocmai ți-ai resetat parola va fi nevoie să-ți setezi una nouă'
                content.description = 'Reține că parola trebuie să fie diferită de cea primită prin email'
            } else {
                data.description = 'Pentru că ești la prima autentificare, este nevoie completezi câmpurile de mai jos'
                content.description = 'Pentru început este nevoie să-ți setezi o nouă parolă'
            }
            data.content = []
            //Set password content
            field = {...field, 
                label: 'Noua parolă',
                id: `textfield-${count}`,
                type: 'password',
                valueType: 'password',
                required: true,
                sendKey: 'password'
            }

            count++
            content.fields.push(field)
            field = {...field, label: 'Repetă noua parolă', id: `textfield-${count}`, valueType: 'repeatPassword'}
            content.fields.push(field)
            data.content.push(content)
            count++

            if(location === 'FIRST-LOGIN') {
                if(json.roleName === 'ADMIN') {

                }
                if(json.roleName === 'SECRETARY') {
                    //Forma de invatamant
                    content = {
                        description: '',
                        fields: []
                    }
                    content.description = 'Alege forma de învățământ. Aceasta ulterior poate fi modificată din setările profilului.'
                    field = {
                        isAutocomplete: true,
                        id: `textfield-${count}`,
                        options: [
                            { title: 'Licență', value: 'LICENTA', key: 'type' },
                            { title: 'Master', value: 'MASTER', key: 'type' }
                        ],
                        label: 'Forma de învățământ',
                        sendKey: 'type',
                    }
                    count++
                    content.fields.push(field)
                    data.content.push(content)
    
    
                    //Facultatea
                    const faculties = await facultiesController.getAll()
                    if(faculties) {
                        content = {
                            description: '',
                            fields: []
                        }
                        content.description = 'Alegeți facultatea din care faceți parte.'
                        let options = []
                        faculties.map((item, index) => {
                            options.push({
                                value: item.id,
                                title: item.name,
                                shortName: item.shortName,
                                key: 'facultyId'
                            })
                        })
                        field = {
                            isAutocomplete: true,
                            options: options,
                            label: 'Facultatea',
                            sendKey: 'facultyId',
                        }
                        content.fields.push(field)
                        data.content.push(content)
                    }
     
                }
                if(json.roleName === 'TEACHER') {
        
                }
                if(json.roleName === 'STUDENT') {
        
                }
            }
        }

        if(location === 'RESET-PASSWORD') {
            data.title = 'Resetează parola!'
            data.description = ''
            data.content = []
            content.description = 'Ai uitat parola? Introduce adresa de email și vei primi o nouă parolă temporară!'
            field = {
                ...field,
                isAutocomplete: false,
                label: 'Email',
                id: `textfield-${count}`,
                required: true,
                valueType: 'email',
                sendKey: 'email',
                type: 'text'
            }
            count++
            content.fields.push(field)
            data.content.push(content)
        }

        if(location === '/add-promotion') {
            data.title = ''
            data.description = ''
            data.content = []
            const userProfile = await userController.getProfile(json.id, 'password')
            if(userProfile) {
                const secretaryData = await secretariesController.get(userProfile.Profile.id)
                if(secretaryData) {
                    const facultyData = await facultiesController.getAllDataFaculty(secretaryData.facultyId, json.roleName, userProfile.Profile.id)
                    if(facultyData) {
                        data.title = `Adaugă o nouă promoție pentru ${facultyData.name}`
                        data.description = 'Pentru a adăuga o nouă promoție sunt necesare următoarele informații:'
                        content = {
                            description: '',
                            fields: []
                        }
                        content.description = 'Anul în care promoția încheie ciclul de studiu'
                        field = {
                            ...field,
                            isAutocomplete: false,
                            label: 'Promoția',
                            id: `textfield-${count}`,
                            required: true,
                            valueType: 'year',
                            sendKey: 'year',
                            type: 'text'
                        }
                        count++
                        content.fields.push(field)
                        data.content.push(content)
                        content = {
                            description: '',
                            fields: []
                        }
                        content.description = 'Data limită pentru anul în care studenții pot alege tema lucrării finale și a profesorului coordonator'
                        field = {
                            ...field,
                            isAutocomplete: false,
                            label: 'Data limită pentru studenți (format YYYY-MM-DD)',
                            id: `textfield-${count}`,
                            required: true,
                            valueType: 'dateLimitStudents',
                            sendKey: 'dateLimitStudents',
                            type: 'text'
                        }
                        count++
                        content.fields.push(field)
                        data.content.push(content)
                        content = {
                            description: '',
                            fields: []
                        }
                        content.description = 'Data limită în care profesorii aleg optiunile de a coordona lucrările de licență sau disertație.'
                        field = {
                            ...field,
                            isAutocomplete: false,
                            label: 'Data limită pentru profesori (format YYYY-MM-DD)',
                            id: `textfield-${count}`,
                            required: true,
                            valueType: 'dateLimitTeachers',
                            sendKey: 'dateLimitTeachers',
                            type: 'text'
                        }
                        count++
                        content.fields.push(field)
                        data.content.push(content)
                    }
                }
            }
        }
        if(location === '/add-announce') {
            data.title = 'Adaugă un nou anunț'
            data.description = 'Aici vei putea scrie anunțuri ce pot fi vizibile atât de către studenți, dar și de profesori'
            data.content = []
            content = {
                description: 'Pentru început, te rog alege către cine va fi trimis mesajul',
                fields: []
            }
            let field = {
                isAutocomplete: true,
                id: `textfield-${count}`,
                options: [                            
                    { title: 'Toți profesorii', value: 'ALL-TEACHERS', key: 'to' },
                    { title: 'Toți studenții', value: 'ALL-STUDENTS', key: 'to' },
                    { title: 'Studenții neînscriși', value: 'NO-PROJECT-STUDENTS', key: 'to' }
                ],
                label: 'Către cine...',
                sendKey: 'to',
            }
            count++
            content.fields.push(field)
            data.content.push(content)

            content = {
                description: 'Scrie mai jos mesajul',
                fields: []
            }
            field = {
                ...field,
                isAutocomplete: false,
                label: '',
                id: `textfield-${count}`,
                required: true,
                multiline: true,
                valueType: 'message',
                sendKey: 'message',
                type: 'text'
            }
            count++
            content.fields.push(field)
            data.content.push(content)
        }

        if(location === 'student-add-project-request') {
            data = {
                open: true,
                location: location,
                title: '',
                description: '',
                content: []
            }
            content = {
                description: '',
                fields: []
            }
            field = {
                isAutocomplete: false,
                options: [],
                id: '',
                label: '',
    
            }
            if(otherData) {
                data.title = 'Trimite solicitare de coordonare proiect',
                data.description = `Ai ales să trimiți o cerere de coordonare proiect către profesorul ${jsonOtherData.TeacherName}.\nPentru a putea trimite această solicitare, este nevoie să completezi toate câmpurile de mai jos!`,
                data.content = [],
                content = {
                    description: 'Pentru început, te rog scrie tema proiectului propus',
                    fields: []
                }
                field = {
                    ...field,
                    isAutocomplete: false,
                    label: 'Tema propusă',
                    id: `textfield1`,
                    required: true,
                    valueType: 'name',
                    sendKey: 'name',
                    type: 'text'
                }

                count++
                content.fields.push(field)
                data.content.push(content)
    
                content = {
                    description: 'Te rog oferă o descriere a proiectului propuse, inclusiv tehnologiile folosite în realizarea acestuia.',
                    fields: []
                }
                field = {
                    ...field,
                    isAutocomplete: false,
                    label: '',
                    id: `textfield2`,
                    required: true,
                    multiline: true,
                    valueType: 'description',
                    sendKey: 'description',
                    type: 'text'
                }
                count++
                content.fields.push(field)
                data.content.push(content)

            }
        }

        //Admin
        if(location === 'add-one-user') {
            data.title = 'Adaugă un nou utilizator'
            data.description = 'Ai optat pentru adăugarea manuală a unui utilizator. Pentru a face asta sunt necesare datele de mai jos'
            data.content = []
            content = {
                description: '',
                fields: []
            }
            SETTINGS.addUsersByAdminTextFields.map((item, index) => {
                field = {
                    ...field,
                    isAutocomplete:false,
                    label:item.label,
                    id:`${item.id}-${count}`,
                    required:true,
                    valueType:item.valueType,
                    sendKey:item.sendKey,
                    type:item.text
                }
                content.fields.push(field)
                count++
            })
            SETTINGS.addUsersByAdminAutoComplete.map((item, index) => {
                field = {
                    isAutocomplete: true,
                    id: `${item.id}-${count}`,
                    options: item.options,
                    label: item.label,
                    sendKey: item.sendKey,
                }
                content.fields.push(field)
                count++
            })
            data.content.push(content)
        }

        if(location === 'add-one-faculty') {
            data.title = 'Adaugă o nouă'
            data.description = 'Ai optat pentru adăugarea manuală a unei facultăți. Pentru a face asta sunt necesare datele de mai jos'
            data.content = []
            content = {
                description: '',
                fields: []
            }
            SETTINGS_FIELDS.role.admin.textFields.addFaculties.map((item, index) => {
                field = {
                    ...field,
                    isAutocomplete:false,
                    label:item.label,
                    id:`${item.id}`,
                    required:true,
                    valueType:item.valueType,
                    sendKey:item.sendKey,
                    type:item.text
                }
                content.fields.push(field)
                count++
            })
            data.content.push(content)            
        }


        //Secretary
        if(location === 'add-one-student') {
            data.title = 'Adaugă un nou student'
            data.description = 'Ai optat pentru adăugarea manuală a unui student. Pentru a face asta sunt necesare datele de mai jos'
            data.content = []
            content = {
                description: '',
                fields: []
            }
            SETTINGS.addStudentsBySecretaryTextFields.map((item, index) => {
                field = {
                    ...field,
                    isAutocomplete:false,
                    label:item.label,
                    id:`${item.id}-${count}`,
                    required:true,
                    valueType:item.valueType,
                    sendKey:item.sendKey,
                    type:item.text
                }
                content.fields.push(field)
                count++
            })
            SETTINGS.addStudentsBySecretaryAutoComplete.map((item, index) => {
                field = {
                    isAutocomplete: true,
                    id: `${item.id}-${count}`,
                    options: item.options,
                    label: item.label,
                    sendKey: item.sendKey,
                }
                content.fields.push(field)
                count++
            })
            data.content.push(content)


        }

        if(location === 'add-one-teacher') {
            data.title = 'Adaugă un nou profesor'
            data.description = 'Ai optat pentru adăugarea manuală a unui profesor. Pentru a face asta sunt necesare datele de mai jos'
            data.content = []
            content = {
                description: '',
                fields: []
            }
            SETTINGS.addTeachersBySecretaryTextFields.map((item, index) => {
                field = {
                    ...field,
                    isAutocomplete:false,
                    label:item.label,
                    id:`${item.id}-${count}`,
                    required:true,
                    valueType:item.valueType,
                    sendKey:item.sendKey,
                    type:item.text
                }
                content.fields.push(field)
                count++
            })
            SETTINGS.addTeachersBySecretaryAutoComplete.map((item, index) => {
                field = {
                    isAutocomplete: true,
                    id: `${item.id}-${count}`,
                    options: item.options,
                    label: item.label,
                    sendKey: item.sendKey,
                }
                content.fields.push(field)
                count++
            })
            data.content.push(content)
        }

        return data

    } 
}