const frames = {
   signup_popup: document.getElementById('sig-popup'),
   wrap: document.getElementById('wrap'),
}

const buttons = {
    sig_sig_out: document.getElementById('sig-popup-close'),
    sig_up_enter_btn: document.getElementById('sig-up-enter-btn')
}

buttons.sig_up_enter_btn.onclick = function() {
    frames.signup_popup.style.display = 'flex'
    frames.wrap.style.filter = 'blur(20px)'
}

buttons.sig_sig_out.onclick = function() {
    frames.signup_popup.style.display = 'none'
    frames.wrap.style.filter = 'blur(0px)'
}