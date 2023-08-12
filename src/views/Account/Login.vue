<template>
    <Header />


    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Login</h1>
        <p class="text-slate-500">Hi, Welcome back 👋</p>

        <div class="my-5">
            <button @click="LoginwithGoogle"
                class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""><span>Login with
                    Google</span>
            </button>
        </div>


        <!-- 폼 내용 -->
        <div class="flex flex-col space-y-5">
            <label for="email">
                <p class="font-medium text-slate-700 pb-2">Email address</p>
                <input id="email" name="email" type="email" v-model="email"
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address">
            </label>
            <label for="password">
                <p class="font-medium text-slate-700 pb-2">Password</p>
                <input id="password" name="password" type="password" v-model="password"
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password">
            </label>
            <div class="flex flex-row justify-between">
                <div>
                    <label for="remember" class="">
                        <input v-model="isCheckboxChecked" type="checkbox" id="remember"
                            class="w-4 h-4 border-slate-200 focus:bg-indigo-600">
                        Remember me
                    </label>
                </div>
                <div>
                    <button @click="goToResetPassword" class="font-medium text-indigo-600">Forgot Password?</button>
                </div>
            </div>
            <button @click="Login"
                class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
            </button>
            <p class="text-center">Not registered yet? <a @click="goToSignUp"
                    class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><button>Register now
                    </button><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span></a></p>
        </div>

    </div>
</template>

<script>
import Header from "../../components/HomeComponents/Header/HeaderNone.vue"
import { googleTokenLogin } from "vue3-google-login"
import { getGoogleAccountInfo, Login } from '../../API/Account.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.
import { setCookie } from '../../Util/Cookies.js'


export default {
    components: {
        Header
    },
    data() {
        return {
            email: '',
            password: '',
            isCheckboxChecked: false,
        }
    },
    methods: {
        async Login() {
            // 로그인할 때 확인해야하는것.
            // 1. 이메일, 비밀번호가 맞는지 확인
            // 2. 자동로그인 체크 했는지 확인
            console.log('Login() 전 값 확인 email :', this.email);
            console.log('Login() 전 값 확인 password :', this.password);
            console.log('Login() 전 값 확인 isCheckboxChecked :', this.isCheckboxChecked);


            const data = await Login(this.email, this.password);
            console.log('Login() data :', data);

            if (data.res_code === '1') {
                // (1) 로그인 성공
                // (2) 자동로그인 체크했는지 확인
                if (this.isCheckboxChecked) {
                    // 체크 함.
                    // 자동 로그인 했을 시 로컬 스토리지에 저장된다.
                    // (1) 자동 로그인했다는 것
                    // (2) 이메일
                    // (3) 이메일 타입
                    this.setLocalStorage('notGmail', this.email);
                    this.$router.push('/Home');

                } else {
                    // 체크 하지 않음.
                    this.setCookies('notGmail', this.email);
                    this.$router.push('/Home');

                }
            } else {
                // 로그인 실패
                alert('존재하지 않는 회원정보입니다.')
            }

        },
        LoginwithGoogle() {
            googleTokenLogin().then((response) => {
                getGoogleAccountInfo(response).then((data) => { // getGoogleAccountInfo가 Promise를 반환하므로 then 사용
                    console.log('LoginwithGoogle() data:', data);

                    // 구글 로그인 한 유저는 자동으로 자동로그인 함.
                    this.setLocalStorage('Gmail', data);
                    this.$router.push('/Home');
                });
            })
        },
        setLocalStorage(type, data) {

            if (type === 'Gmail') {
                const object = { login: type, data: data };
                localStorage.setItem('autoLogin', JSON.stringify(object));
            } else {
                const object = { login: type, email: data };
                localStorage.setItem('autoLogin', JSON.stringify(object));
            }

        },
        // 회원가입시 쿠키에 저장하기 위해 json 타입을 string 타입으로 바꾸는 것.
        setCookies(type, email) {
            const value = {
                login: type,
                email: email
            }
            const result = setCookie('login', value);
            console.log('setCookies() result :', result);
        },
        goToResetPassword() {
            // 비밀번호 재설정하러 가는 메서드
            this.$router.push('/ResetPass');
        },
        goToSignUp() {
            // 회원가입 하러가는 메서드
            this.$router.push('/Signup');
        }
    }
}
</script>

<style></style>