// 유저 정보 쿠키 & 로컬 스토리지에서 가져와서 뿌려주는 모듈
import { getCookie, removeCookie } from '../Util/Cookies.js'
import { getUser } from '../API/Account.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.
// 쿠키에서 데이터 가져오는 메서드
export function getCookies(name) {
    const data = getCookie(name);
    console.log('getCookies() in GetUserInfo.js : ', data);
    return data;
}

export function removeCookies(name) {
    console.log('removeCookie() 들어옴', name);
    const result = removeCookie(name);
    console.log('removeCookie() in GetUserInfo.js  ');
    return result;
}

// 로컬스토리지에서 데이터 가져오는 메서드
export function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    console.log('getLocalStorage() in GetUserInfo.js : ', data);
    return data;
}

export function removeLocalStorage(key) {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      return 'success';
    } else {
      return 'fail';
    }
 
}

// 가져온 데이터에서 확인해 보는 메서드
// 유저가 자동로그인 했는지 그냥 로그인 했는지 확인 
export function getUserInfo() {
    if (getLocalStorage('autoLogin')) {
        console.log('checkAuthentication() in GetUserInfo.js 자동로그인함 ');
        return { authenticated: true, method: 'autoLogin', data: getLocalStorage('autoLogin') };

    } else if (getCookies('login')) {
        console.log('checkAuthentication() in GetUserInfo.js 쿠키 존재함.');
        return { authenticated: true, method: 'cookies', data: getCookies('login') };

    } else {
        console.log('checkAuthentication() in GetUserInfo.js 쿠키 존재하지 않음.');
        return { authenticated: false };
    }
}


// auth.js
// Header info 가 뭔지 확인하고 받아온 데이터의 형식에 따라서 데이터 파싱해주는 메서드 
export async function processHeaderInfo(headerInfo) {
    let result = {
        loginType: '',
        email: '',
        profileImage: '',
        data: '',
        connectedStatus: 'Not Connected'
    };

    if (typeof headerInfo === 'object') {
        console.log('processHeaderInfo() in GetUserInfo.js object 임');
        result.loginType = headerInfo.login;
        result.email = headerInfo.email;
    } else {
        console.log('processHeaderInfo() in GetUserInfo.js object 아님');

        const parsedObject = JSON.parse(headerInfo);
        result.loginType = parsedObject.login;
        result.email = parsedObject.email;
        result.data = parsedObject.data;
    }

    switch (result.loginType) {
        case 'notGmail':
            console.log('일반 로그인');
            result.profileImage = await getUserInfoImage(result.email);
            break;

        case 'Gmail':
            console.log('gmail');
            const userData = JSON.parse(result.data);
            result.profileImage = userData.picture;
            break;
    }

    return result;
}

// Header info에있는 이미지 로드 하기 위한 메서드
async function getUserInfoImage(email) {
    const UserData = await getUser(email);
    let profileImage;
// 이미지가 default 라면 기본 프로필이미지 세팅
    if (UserData.data.user_image === 'default') {
        profileImage = '../../../assets/icon/profile.png';
    } else {
        // 이미지가 default 아니라면 설정된 이미지 로드
        profileImage = `data:image/*;base64,${UserData.data.user_image}`;
    }

    return profileImage;
}
