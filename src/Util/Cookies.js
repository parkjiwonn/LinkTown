import CryptoJS from "crypto-js";
import VueCookies from "vue-cookies";

// 비밀번호 해시화하는 메서드
export function hashPassword(password) {
  const hashedPassword = CryptoJS.SHA256(password).toString();
  // 해시화된 비밀번호를 다음 단계로 전달하거나 사용할 수 있습니다
  console.log("해시화된 비밀번호:", hashedPassword);
  return hashedPassword;
}

// 회원가입 후 쿠키 설정하는 메서드
export function setCookie(name, value) {
  VueCookies.set(name, JSON.stringify(value));
  return getCookie(name);
}

// 쿠키 읽는 메서드
export function getCookie(name) {
  const cookie = VueCookies.get(name);
  console.log("getCookie() in AccountUtil cookie : ", cookie);
  return cookie;
}

export function removeCookie(name) {
  if (VueCookies.remove(name)) {
    console.log("removeCookie() in AccountUtil 성공");
    return "success";
  } else {
    return "fail";
  }
}

/**
 * //특정 쿠키가 있는지 확인
this.$cookies.isKey("test");

//모든 쿠키 키 가져오기
this.$cookies.keys().join("\n");

//모든 쿠키 다 지우기
this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));

 */

// 유저 정보를 가져와서 뿌려주는 메서드
