<template>
    <Header />
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium font-NotoSan_bold mb-5">비밀번호 재설정하기</h1>
        <p class="text-slate-500">Hi, Welcome back 👋</p>

        <!-- 폼 내용 -->
        <div class="flex flex-col space-y-5">
            <div>
                <div class="flex flex-row mt-5">
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


            <button @click="RessetPassword"
                class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Password Reset</span>
            </button>

        </div>

    </div>
</template>


<script>
import Header from "../../components/HomeComponents/Header/HeaderNone.vue"
import { IsDuplicateEmail, emailAuthentication, ResetPassword } from '../../API/Account.js'; // 상대 경로에 따라 경로를 수정해야 할 수 있습니다.


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
                // 회원가입한적 있는 이메일인지 확인해야 함.
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
            // if msg = 1 실패 0 성공
            console.log('IsDuplicate() res_code=', data.res_code);
            if (data.res_code === "0") {
                this.isButtonDisabled = false;
                // 인증하기 버튼 활성화
                // 존재하는 이메일 
            } else {
                this.isButtonDisabled = true;
                this.emailError = true;
                this.emailErrorMessage = '존재하지 않는 이메일입니다.';
                // 인증하기 버튼 비활성화
                // 인증번호 관련 에러부분 조건부 렌더링 & 에러 메시지 띄움
                return;
            }

            console.log('IsDuplicate() 존재하는 이메일임');
            this.alreadyCheck = true;


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
        async RessetPassword() {
            /**
             * 비밀번호 재설정 완료를 하기 위해 필요한 것.
             * (1) 이메일 인증번호 잘 쳤는지
             * (2) 비밀번호 올바르게 작성했는지 
             */
            if (!this.passwordMismatch && !this.passwordTooShort && !this.codeError) {
                const data = await ResetPassword(this.email, this.password);
                console.log('RessetPassword() data :', data);
                // 비밀번호 재설정하고 나서 다시 로그인 페이지로 이동시키기 
                this.$router.push('/Login');
            }



        }
    }
}
</script>

<style></style>