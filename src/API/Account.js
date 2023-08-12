
import {hashPassword} from '../Util/Cookies.js';
import axios from "axios";

// 비밀번호 재설정하는 API
export async function ResetPassword(email, password){
    try{
        console.log('ResetPassword() 들어옴 in Account.js');
        
        // 먼저 비번 해시화 먼저 하기
        const hashedPassword = hashPassword(password);
        console.log('Login() 하기전 hashedPassword :', hashedPassword);

        const response = await fetch(`https://linktown.kro.kr/user/ResetPassword?email=${email}&password=${hashedPassword}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('ResetPassword() 후 :', msg);
        return msg;


    }catch(error){
        console.error('Error', error);
        throw error;
    }
}


// 로그인하는 메서드
export async function Login(email, password){
    try{
        console.log('Login() 들어옴 in Account.js');
        
        // 먼저 비번 해시화 먼저 하기
        const hashedPassword = hashPassword(password);
        console.log('Login() 하기전 hashedPassword :', hashedPassword);

        const response = await fetch(`https://linktown.kro.kr/user/login?email=${email}&password=${hashedPassword}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('Login() 후 :', msg);
        return msg;


    }catch(error){
        console.error('Error', error);
        throw error;
    }
}


// 이메일 중복 검사 
// @Param : email
// @Return : {res_code: '1', res_msg: '이메일 중복검사 API : 회원가입 '}
// 성공 1 , 실패 0
export async function IsDuplicateEmail(email) {
    try {
        console.log('IsDuplicate 들어옴 in Account.js');
        const response = await fetch(`https://linktown.kro.kr/user/check_email?email=${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('IsDuplicate() :', msg);
        return msg;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 이메일로 인증번호 전송
// @Param : email
// @Return: 
// {res_body : {authentication_num: 325560}
// res_code : "1"
// res_msg : "이메일 인증번호 API : 회원가입 "}
export async function emailAuthentication(email) {
    try {
        console.log('emailAuthentication 들어옴 in Account.js');
        const response = await fetch(`https://linktown.kro.kr/user/emailAuthentication?email=${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('emailAuthentication() 인증번호 :', msg.res_body.authentication_num);
        return msg.res_body.authentication_num;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 회원가입 메서드 
export async function registerUser(email, password) {
    try {
        console.log('registerUser 들어옴 in Account.js');
        // 비밀번호 암호화 해야함.
        const hashedPassword = hashPassword(password);
        console.log('registerUser() hashedPassword :', hashedPassword);

        const response = await fetch(`https://linktown.kro.kr/user/register?email=${email}&password=${hashedPassword}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('registerUser() :', msg.msg.res_code);
        // 응답 받은 데이터에서 응답 코드만 추출해서 return
        return msg.msg.res_code;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 구글 계정 정보 가져오는 메서드
export function getGoogleAccountInfo(res) {
    try {
        console.log('getGoogleAccountInfo 들어옴 in Account.js');
        console.log("Handle the response", res)
                // Google 계정 선택시 받아오는 access_token
                // access token으로 google 계정 정보 받아 와야함.
                const token = res.access_token;
                console.log('Google token : ', token);

                // google 유저 정보 받아오는 부분
                return axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        console.log('Google user info Object :', response.data);
                        // 이메일과 프로필 정보는 response.data 객체에 포함됩니다.
                        // 유저 정보를 받아오면 다음 페이지로 이동해야 함.
                        // 다음 페이지로 보내야하는 유저 정보
                        // (1) 이메일
                        // (2) 프로필
                        console.log('Google user info Object :' , response.data);
                        return JSON.stringify(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching user info', error);
                    });

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// DB에 저장된 회원 정보 가져오는 API
export async function getUser(email){
    try{
        console.log('getUser 들어옴 in Account.js');
        const response = await fetch(`https://linktown.kro.kr/user/getUser?email=${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const msg = await response.json();
        console.log('getUser() :', msg);
        return msg;


    }catch(error){
        console.error('Error:', error);
        throw error;
    }
}