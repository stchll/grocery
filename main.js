let userRegister = [
    {
        user: 'Vitalik',
        password: '123',
        image: './img/users/Vitalik.png',
    },

    {
        user: 'Bogdan',
        password: 'qwerty',
        image: './img/users/Bogdan.png',
    },

    {
        user: 'Stepan',
        password: '7777',
        image: './img/users/Stepan.png',
    },
]

let sessionData = {
    username: localStorage.getItem('usernam') || null,
    password: localStorage.getItem('password') || null,
    cart: {},
    ordered: {},
}

function trySign(iUser,iPassword) {
    for (let user of userRegister) {
        if (iUser == user.user && iPassword == user.password) {
            return user
        }
    }

    return false
}

function changeAccount() {
    let gUsername = localStorage.getItem('username')
    let gPassword = localStorage.getItem('password')

    if (gUsername && gPassword) {
        for (let user of userRegister) {
            if (gUsername == user.user) {
                buttons.sig_up_enter_btn.style.display = 'none'
                objects.accountContainer.style.display = 'flex'
                
                if (user.image != "") {
                    objects.account_image.src = user.image
                } else {
                    objects.account_image.src = './img/users/Default.png'
                }
                
                
                return true
            }
        }
    } else {
        buttons.sig_up_enter_btn.style.display = 'flex'
        objects.accountContainer.style.display = 'none'

        return false
    }
}

const frames = {
   signup_popup: document.getElementById('sig-popup'),
   wrap: document.getElementById('wrap'),
}

const buttons = {
    sig_sig_out: document.getElementById('sig-popup-close'),
    sig_up_enter_btn: document.getElementById('sig-up-enter-btn'),
    sign_in_btn: document.getElementById('sign-in-btn'),
    sign_out: document.getElementById('sig-out-btn'),
}

const objects = {
    user_input: document.getElementById('user-sign'),
    user_password: document.getElementById('password-sign'),
    accountContainer: document.getElementById('account-container'),
    account_image: document.getElementById('account-hotbar-img'),
}

buttons.sign_out.onclick = function() {
    sessionData.username , sessionData.password = null

    localStorage.removeItem('username')
    localStorage.removeItem('password')

    changeAccount()
}

buttons.sign_in_btn.onclick = function() {
    const iUsername = objects.user_input.value
    const iPassword = objects.user_password.value

    if (iUsername && iPassword) {
        let account = trySign(iUsername,iPassword)

        if (account) {
            sessionData.username = account.user
            sessionData.password = account.password

            localStorage.setItem('username',account.user)
            localStorage.setItem('password',account.password)

            frames.signup_popup.style.display = 'none'

            changeAccount()
        } else {
            alert('wrong user or password!')
        }
    } else {
        alert('you must input one more inputs!')
    }
    
}

buttons.sig_up_enter_btn.onclick = function() {
    frames.signup_popup.style.display = 'block'

    objects.user_input.value = ''
    objects.user_password.value = ''
}

buttons.sig_sig_out.onclick = function() {
    frames.signup_popup.style.display = 'none'
}


changeAccount()