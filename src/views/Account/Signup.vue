<template>
    <Header />
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Sign up</h1>
        <p class="text-slate-500">Hi, Welcome to LinkTown 👋</p>

        <div class="my-5">
            <button @click="SignUpwithGoogle"
                class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""><span>Sign up with
                    Google</span>
            </button>

        </div>


        <!-- 폼 내용 -->
        <div class="flex flex-col space-y-5">
            <div>
                <div class="flex flex-row">
                    <label for="email" class="w-3/4 mr-4">
                        <p class="font-medium text-slate-700 pb-2">Email address</p>
                        <input id="email" name="email" type="email" v-model="email" @blur="checkEmail"
                            @input="clearErrorMessage"
                            class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter email address">
                    </label>
                    <button v-bind:disabled="isButtonDisabled" @click="CertificateEmail" :style="{
                        'background-color':
                            !isButtonDisabled
                                ? 'rgb(78, 72, 224)'
                                : 'rgb(182, 198, 244)',
                    }" class="w-1/4 mt-6 py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg
                            border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">

                        <span>인증하기</span>
                    </button>
                </div>

                <p v-if="emailError" class="text-red-500">{{ emailErrorMessage }}</p>

                <input v-if="!isButtonDisabled" id="code" name="code" type="text" v-model="Inputcode" @blur="CheckCode"
                    @input="clearCodeErrorMessage"
                    class="w-full mt-3 py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="인증번호 6자리를 입력해주세요">

                <p v-if="codeError" class="text-red-500">{{ codeErrorMessage }}</p>

            </div>

            <div>
                <label for="password">
                    <p class="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" v-model="password" type="password"
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Enter your password">
                </label>
                <p v-if="passwordTooShort" class="text-red-500">비밀번호가 8자 이상이어야 합니다.</p>

                <label for="confirm-password">
                    <p class="font-medium text-slate-700 pb-2 mt-5">Confirm Password</p>
                    <input id="confirm-password" v-model="confirmPassword" type="password"
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Confirm your password">
                </label>
                <p v-if="passwordMismatch" class="text-red-500">비밀번호가 일치하지 않습니다.</p>
            </div>


            <button @click="SignUp"
                class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign up</span>
            </button>

        </div>

    </div>
</template>

<script>
import Header from "../../components/HomeComponents/Header/HeaderNone.vue"
import { googleTokenLogin } from "vue3-google-login"
import { IsDuplicateEmail, emailAuthentication, registerUser, getGoogleAccountInfo } from '../../API/Account.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.
import { setCookie } from '../../Util/Cookies.js'


export default {
    components: {
        Header
    },
    data() {
        return {
            email: '', // 유저가 입력하는 이메일
            emailError: false, // 오류 메세지 조건 렌더링하기 위해
            emailErrorMessage: '', // 오류 메세지
            isButtonDisabled: true, // 버튼 활성화 상태를 제어하기 위한 속성
            Inputcode: '',
            codeError: false,
            codeErrorMessage: '',
            alreadyCheck: false,
            password: '',
            confirmPassword: '',
            code: '',


        };
    },
    computed: {
        // 비밀번호 일치검사
        passwordMismatch() {
            return this.password && this.confirmPassword && this.password !== this.confirmPassword;
        },
        // 비밀번호 설정 기준 검사 
        passwordTooShort() {
            return this.password && this.password.length < 8;
        }
    },


    methods: {

        // blur 이벤트 : 유저가 input 태그에서 입력을 하다가 포커스를 다른 부분에 두었을때 호출됨.
        validateEmailFormat() {
            // 이메일 유효성 검사 하기 위한 메서드
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // 유효성 검사후 유효하다면 true
            // 유효하지 않다면 false
            return pattern.test(this.email);
        },
        checkEmail() {
            // input 폼에서 포커스가 바뀐다면 호출되는 메서드

            // 이메일이 유효하지 않다면 && 이메일이 공백이 아니라면
            if (this.email === "") {
                // 공백이라면 아무일도 없어야함.
                return;
            } else {
                // 공백이 아니라면 일단 유효성 검사
                if (!this.validateEmailFormat()) {
                    // validateEmailFormat 의 return 값을 매개변수로 받음.
                    this.emailError = true;
                    this.emailErrorMessage = '유효하지 않은 이메일입니다';
                    this.isButtonDisabled = true;
                    // 버튼 비활성화, 이메일 에러메시지 띄움, 에러 메시지 부분 조건부 렌더링 
                    return;
                }
            }


            console.log('checkEmail() 유효한 이메일임.');
            // 유효한 이메일이면 중복검사해야함.
            // 중복 검사 모두 완료되면 이메일 인증번호 보내야 함.
            if (!this.alreadyCheck) {
                console.log('checkEmail() 아직 중복검사 안했음');
                this.IsDuplicate();
            } else {
                console.log('checkEmail() 중복검사 완료, 중복되지 않은 이메일임');
            }

        },
        // 이메일 중복 검사 메서드
        async IsDuplicate() {
            // 중복 검사 위한 서버 요청 해야함.
            const data = await IsDuplicateEmail(this.email);
            console.log('IsDuplicate() data =', data);
            // if msg = 1 성공 0 실패
            console.log('IsDuplicate() res_code=', data.res_code);
            if (data.res_code === "1") {
                this.isButtonDisabled = false;
                // 인증하기 버튼 활성화
            } else {
                this.isButtonDisabled = true;
                this.emailError = true;
                this.emailErrorMessage = '중복되는 이메일입니다.';
                // 인증하기 버튼 비활성화
                // 인증번호 관련 에러부분 조건부 렌더링 & 에러 메시지 띄움
                return;
            }

            console.log('IsDuplicate() 중복 하지 않은 이메일임');
            this.alreadyCheck = true;


        },
        clearErrorMessage() {
            // 다시 유저가 이메일 입력을 시작하려고 할 때 에러메시지 숨기기 위함.
            // input 이벤트 발생시 해당 메서드 호출
            this.emailError = false;
            this.emailErrorMessage = '';
            // 다시 유저가 이메일 입력을 하려는 거니까 중복검사할 수 있도록 변경해주기
            this.alreadyCheck = false;
        },
        clearCodeErrorMessage() {
            this.codeError = false;
            this.codeErrorMessage = '';
        },

        async CertificateEmail() {
            // 이메일 인증번호 요청 
            const data = await emailAuthentication(this.email);
            console.log('CertificateEmail() 인증번호 :', data);
            this.code = data;
            alert('인증번호가 전송되었습니다.');

        },
        CheckCode() {
            // 인증번호 실시간 확인
            console.log('CheckCode() code 일치 검사 전 :', this.Inputcode);
            console.log('CheckCode() 전송된 code: ', this.code);

            if (String(this.Inputcode) === String(this.code)) {
                console.log('CheckCode() code 일치함');
            } else {
                console.log('CheckCode() code 불일치');
                this.codeError = true;
                this.codeErrorMessage = '인증번호가 일치하지 않습니다.';
            }

        },
        async SignUp() {

            /*
            회원가입시 확인해야하는 것
            1. 이메일 인증번호가 올바른 것인지
            2. 비밀번호가 일치하고 설정 기준에 맞는지

             */
            console.log('SignUp() passwordMismatch :', this.passwordMismatch);
            console.log('SignUp() passwordTooShort :', this.passwordTooShort);

            if (!this.passwordMismatch && !this.passwordTooShort && !this.codeError) {
                console.log('SignUp() 회원가입 기준 모두 충족');
                const data = await registerUser(this.email, this.password, 'default', '0');
                console.log('SignUp() 회원가입한 후 data :', data);

                // res_code 가 응답으로 넘어옴.
                if (data === "1") {
                    // 회원 가입 성공
                    // 성공했으니 Home으로 가야함.
                    this.setCookies('notGmail', this.email);
                    console.log('SignUp() 회원가입 성공');
                    // Home으로 이동히야 함.
                    this.$router.push('/Home');

                } else {
                    // 회원 가입 실패
                    console.log('SignUp() 회원가입 실패');
                    alert('회원가입에 실패했습니다.');
                }

            }
        },
        // 구글 회원가입 메서드 
        SignUpwithGoogle() {
            googleTokenLogin().then((response) => {
                getGoogleAccountInfo(response).then((result) => { // getGoogleAccountInfo가 Promise를 반환하므로 then 사용
                    console.log('SignUpwithGoogle() data:', result);
                    console.log('SignUpwithGoogle() token:', result.token);


                    // 이메일 중복 검사해야함.
                    this.IsDuplicateGmail(result.userInfo.email, result.token, result.userInfo);
                    // 회원 DB에 gmail계정 정보도 저장해야함.

                    // 이메일을 쿠키에 저장하거나 다른 작업 수행

                });
            })

        },
        async IsDuplicateGmail(email, token, userInfo) {
            console.log('IsDuplicateGmail() in Signup email : ', email);
            console.log('IsDuplicateGmail() in Signup token : ', token);
            console.log('IsDuplicateGmail() in Signup userInfo : ', userInfo);
            console.log('IsDuplicateGmail() in Signup picture : ', userInfo.picture);
            const data = await IsDuplicateEmail(email);
            // console.log('IsDuplicateGmail() in Signup 중복결과 : ', data);
            // console.log('IsDuplicateGmail() in Signup 중복결과 : ', data.res_code);

            if (data.res_code === '0') {
                // 중복되는 이메일
                alert('이미 회원가입된 계정입니다.')
            } else {
                // 중복 X 이메일
                console.log('중복되지않은 Gmail임  ');
                // gmail에서 보내는 result는 parse해서 받아야함.
                // 따라서 db에 저장해야하는 것. 
                // export async function registerUser(email, password, image, login_type)
                const data = await registerUser(email, token, userInfo.picture, '1');
                // 일반 login - login_type = 0
                // gmail - login_type = 1
                if (data === '1') {
                    // 회원 가입 성공
                    this.setLocalStorage('Gmail', email);
                    this.$router.push('/Home');
                } else {
                    // 회원 가입 실패
                    alert('회원가입에 실패했습니다.');

                }


            }




        },
        setLocalStorage(type, email) {

            const object = { login: type, email: email };
            localStorage.setItem('autoLogin', JSON.stringify(object));


        },
        // 회원가입시 쿠키에 저장하기 위해 json 타입을 string 타입으로 바꾸는 것.
        setCookies(type, email) {

            if (type === 'Gmail') {
                const value = {
                    login: type,
                    email: email
                }
                const result = setCookie('login', value);
                console.log('setCookies() result :', result);

            } else {
                const value = {
                    login: type,
                    email: email
                }
                const result = setCookie('login', value);
                console.log('setCookies() result :', result);
            }

        }
    }
}
</script>

<style></style>