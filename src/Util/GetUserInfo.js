// 유저 정보 쿠키 & 로컬 스토리지에서 가져와서 뿌려주는 모듈
import { getCookie, removeCookie } from '../Util/Cookies.js'
import { getUser } from '../API/Account.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.
// 쿠키에서 데이터 가져오는 메서드
export function getCookies(name) {
    const data = getCookie(name);
    //console.log('getCookies() in GetUserInfo.js : ', data);
    return data;
}

export function removeCookies(name) {
    console.log('removeCookie() 들어옴', name);
    const result = removeCookie(name);
    //console.log('removeCookie() in GetUserInfo.js  ');
    return result;
}

// 로컬스토리지에서 데이터 가져오는 메서드
export function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    //console.log('getLocalStorage() in GetUserInfo.js : ', data);
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
        //console.log('checkAuthentication() in GetUserInfo.js 자동로그인함 ');
        return { authenticated: true, method: 'autoLogin', data: getLocalStorage('autoLogin') };

    } else if (getCookies('login')) {
        //console.log('checkAuthentication() in GetUserInfo.js 쿠키 존재함.');
        return { authenticated: true, method: 'cookies', data: getCookies('login') };

    } else {
        //console.log('checkAuthentication() in GetUserInfo.js 쿠키 존재하지 않음.');
        return { authenticated: false };
    }
}


// auth.js
// Header info 가 뭔지 확인하고 받아온 데이터의 형식에 따라서 데이터 파싱해주는 메서드 
export async function GetUserLoginInfo(headerInfo) {
    let result = {
        loginType: '',
        email: '',
        nick:'',
        intro:'',
        IsDefaultImage : false,
        selectedServiceIndex : []
    };

    if (typeof headerInfo === 'object') {
        // 쿠키 저장했을 때
        console.log('GetUserLoginInfo() in GetUserInfo.js object 임');
        result.loginType = headerInfo.login;
        result.email = headerInfo.email;
    } else {
        console.log('GetUserLoginInfo() in GetUserInfo.js object 아님');
        // 로컬 스토리지에 저장했을때
        const parsedObject = JSON.parse(headerInfo);
        result.loginType = parsedObject.login;
        result.email = parsedObject.email;
  
    }

    const { profileImage, nick, intro, IsDefaultImage, selectedServiceIndex }  = await getUserInfoFromDB(result.email);
            result.profileImage = profileImage;
            result.nick = nick; // 닉네임 설정
            result.intro = intro; // 자기소개
            result.IsDefaultImage = IsDefaultImage;
            result.selectedServiceIndex = selectedServiceIndex;

    return result;

  
}

// Header info에있는 이미지 로드 하기 위한 메서드
async function getUserInfoFromDB(email) {

    let profileImage;
    let nick;
    let IsDefaultImage;
    let intro;
    let selectedServiceIndex;

    const UserData = await getUser(email);

    if(UserData.data.user_image === 'default'){
        IsDefaultImage = true;
        profileImage = 'https://d27049n8tc16nq.cloudfront.net/user_profiles/default.png';
    }else{
        IsDefaultImage = false;
        profileImage = UserData.data.user_image;
    }
    
    selectedServiceIndex = UserData.data.user_keyword;
    nick = UserData.data.user_nick; 
    intro = UserData.data.user_intro;
    //console.log(' profileImage, nick :' , {profileImage, nick});

    return { profileImage, nick, IsDefaultImage, intro, selectedServiceIndex }; // 이미지와 닉네임을 함께 반환

}
