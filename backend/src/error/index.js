const authErrors = new Map();

[
    { key: 'EXCEPTION', message: '서버에서 오류가 발생하였습니다.', status: 500 }, // Internal Server Error
    { key: 'BAD REQUEST', message: '입력정보가 유효하지 않습니다.', status: 400 }, // Bad Request
    { key: 'ALREADY JOINED', message: '입력하신 EMAIL은 가입된 상태입니다.', status:  401 }, // Unauthorized
    { key: 'PROCEEDING', message: '입력하신 EMAIL은 가입신청중입니다. EMAIL 인증을 해주세요.', status: 401 }, 
    { key: 'NO EXIST INFO', message: '일치하는 계정이 없습니다.', status: 401 },
    { key: 'UNAUTHORIZED', message: '유효하지않은 토큰입니다.', status: 401 }
].forEach((value, index) => {
    authErrors.set(value.key, { key: value.key, message: value.message, status: value.status });
});

export { authErrors };