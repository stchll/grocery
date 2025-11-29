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
    accept_call: document.getElementById('accept-call'),
    decline_call: document.getElementById('decline-call'),
}

const objects = {
    user_input: document.getElementById('user-sign'),
    user_password: document.getElementById('password-sign'),
    accountContainer: document.getElementById('account-container'),
    account_image: document.getElementById('account-hotbar-img'),
    msg_frame: document.getElementById('msg-frame'),
    msg_content: document.getElementById('msg-content'),
    phone_container: document.getElementById('phone'),
    accept: document.querySelectorAll('#accept-call'),
    disco: document.getElementById('discoFrame'),
}

const sounds = {
    message: new Audio('./sounds/message.mp3'),
    click: new Audio('./sounds/click.mp3'),
    nokia: new Audio('./sounds/nokia.mp3'),
    buy_add: new Audio('./sounds/buy-add.mp3'),
    end_call: new Audio('./sounds/end-call.mp3'),
}

sounds.nokia.volume = 1

buttons.sign_out.onclick = function() {
    sessionData.username , sessionData.password = null

    localStorage.removeItem('username')
    localStorage.removeItem('password')

    changeAccount()
}

function setMessage(content,themeColor) {
    objects.msg_frame.style.display = 'flex'
    objects.msg_content.textContent = content

    if (themeColor) {
        objects.msg_frame.style.borderColor = themeColor
    } else {
        objects.msg_frame.style.borderColor = "rgba(200,200,200,1);"
    }

    sounds.message.currentTime = 0
    sounds.message.play()

    objects.msg_frame.classList.remove('msg-fade-out-calss');
    objects.msg_frame.classList.add('msg-fade-calss');

}

objects.msg_frame.onclick = function() {
    objects.msg_frame.classList.remove('msg-fade-calss');
    objects.msg_frame.classList.add('msg-fade-out-calss');

    sounds.click.currentTime = 0
    sounds.click.play()

    setTimeout(() => {
        objects.msg_frame.style.display = 'none'
    }, 500);
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

            setMessage('Sucsessful , logined!','limegreen')

            changeAccount()
        } else {
            setMessage('Wrong user or password!','red')
        }
    } else {
        setMessage('Input one more!','red')
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

let phoneRequest = setInterval(function() {
    let cahnse = Math.floor(Math.random()*5)

    if (cahnse == 4) {
        setMessage('Admin Abuseeeeeee🎉😋😁😍😍🤗🙂😋😂','violet')
        clearTimeout(phoneRequest)

        setTimeout(()=>{
            let auto_decline_timeout = setTimeout(()=> {
                sounds.end_call.currentTime = 0
                sounds.end_call.play()
                sounds.nokia.pause()

                objects.phone_container.style.display = 'none'
                objects.disco.style.display = 'none'

                setMessage('You miss Vitalik call , noooo😓😓😓','red')
            },30 * 1000)

            objects.phone_container.style.display = 'flex'
            objects.disco.style.display = 'flex'


            sounds.nokia.currentTime = 5
            sounds.nokia.play()

            clearTimeout(phoneRequest)

            objects.accept.forEach((button)=> {
                button.onclick = function() {
                    clearTimeout(auto_decline_timeout)

                    sounds.nokia.pause()

                    objects.phone_container.querySelector('.buttons-container').style.display = 'none'

                    setTimeout(()=> {
                        sounds.buy_add.currentTime = 0
                        sounds.buy_add.play()

                        setTimeout(()=> {
                            sounds.end_call.currentTime = 0
                            sounds.end_call.play()

                            objects.phone_container.style.display = 'none'
                            objects.disco.style.display = 'none'
                        },3000)
                    },2000)
                }
            })
        },3000)
    }
},3000)