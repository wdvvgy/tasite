const checkEmail = (data) => {
    const { email } = data;
    if(!email) return false;
    return true;
};

const checkPw = (data) => {
    const { pw } = data;
    if(!pw) return false;
    return true;
};

export { checkEmail, checkPw };