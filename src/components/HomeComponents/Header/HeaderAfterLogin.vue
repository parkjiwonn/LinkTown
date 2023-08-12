<template>
    <nav class="bg-white dark:bg-gray-800 shadow ">
        <div class="px-7 ">
            <div class="flex items-center justify-between h-16">
                <div class="w-full justify-between flex items-center">
                    <a class="flex-shrink-0" href="/">
                        <img class="w-15 h-8" src="../../../assets/icon/longnameLogo.png" alt="Workflow" />
                    </a>
                    <div class="hidden md:block ">
                        <div class="flex items-baseline ml-10 space-x-4">

                            <div class="flex flex-row">
                                <button v-for="menu in menus" :key="menu.text" @click="menu.action"
                                    class=" px-6 py-2 transition ease-in duration-200 uppercase rounded-md hover:bg-indigo-400 hover:text-white focus:outline-none">
                                    {{ menu.text }}
                                </button>

                                <div class="flex flex-row">
                                    <div class="w-3 h-3 bg-red-500 rounded-full my-auto mr-3 ml-3"></div>
                                    <p class="mt-2"> {{ connectedStatus }} </p>
                                </div>


                                <div class="items-center" @mouseover="showSubMenu = true" @mouseleave="showSubMenu = false">
                                    <img @click="goToMyPage" :src="profileImage" alt="person"
                                        class="w-8 h-8 rounded-full my-auto ml-5" />

                                    <div v-if="showSubMenu" class="absolute bg-white shadow-md mt-2 rounded z-50">
                                        <!-- 여기에 소메뉴 내용 -->
                                        <router-link to="/Mypage"
                                            class="block px-4 py-2 text-gray-800 hover:bg-gray-100">마이페이지</router-link>
                                        <div @click="logout"
                                            class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">로그아웃
                                        </div>

                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="flex items-center ml-4 md:ml-6">
                    </div>
                </div>
                <div class="flex -mr-2 md:hidden">
                    <!--메뉴버튼!-->
                    <button @click="toggleMenu"
                        class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                        <svg width="20" height="20" fill="currentColor" class="w-8 h-8" viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showMenu" class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button v-for="menu in menus" :key="menu.text" @click="menu.action"
                    class=" px-6 py-2 transition ease-in duration-200 uppercase rounded-md hover:bg-indigo-400 hover:text-white focus:outline-none">
                    {{ menu.text }}
                </button>

            </div>
        </div>
    </nav>
</template>

<script>

import { processHeaderInfo } from '../../../Util/GetUserInfo.js'
import { getUserInfo, removeCookies, removeLocalStorage } from '../../../Util/GetUserInfo.js'

export default {
    props: {
        headerInfo: {
            type: Object,
            required: true
        }
    },
    async mounted() {
        const processedHeaderInfo = await processHeaderInfo(this.headerInfo);

        this.loginType = processedHeaderInfo.loginType;
        this.email = processedHeaderInfo.email;
        this.profileImage = processedHeaderInfo.profileImage;
        this.data = processedHeaderInfo.data;
        this.connectedStatus = processedHeaderInfo.connectedStatus;

        const authResult = getUserInfo();

        if (authResult.method === 'autoLogin') {
            // 유저 로그인 정보가 로컬 스토리지에 저장 
            console.log('mounted() in HeaderAfterLogin authResult.method:', authResult.method);
            this.loginMethod = authResult.method;
        } else {
            // 유저 로그인 정보가 쿠키에 저장 
            console.log('mounted() in HeaderAfterLogin authResult.method:', authResult.method);
            this.loginMethod = authResult.method;
        }

    },

    data() {
        return {
            showMenu: false,
            loginType: '',
            email: '',
            // 프로필 이미지 URL을 저장할 변수
            profileImage: '', // 기본 이미지 URL
            loginType: '',
            data: '',
            connectedStatus: '',
            // Header에 들어가는 메뉴
            menus: [
                { text: '재능거래', action: this.goToTalentTrade },
                { text: '재능등록', action: this.goToRegisterTalent },
                { text: '메타버스', action: this.goToMetabus }
            ],
            showSubMenu: false,
            loginMethod: ''


        };
    },
    methods: {
        toggleMenu() {
            console.log("header 줄어듬");
            this.showMenu = !this.showMenu;
        },
        logout() {
            // 1. 구글 API 사용했는지
            // 2. 일반 로그인을 했는지 확인해서 쿠키 지우거나 로컬 스토리지 지워야함.

            if (this.loginMethod === 'autoLogin') {
                console.log('logout() loginMethod is ', this.loginMethod);
                const result = removeLocalStorage(this.loginMethod);
                console.log('logout() result :', result);
                if (result === 'success') {
                    // 쿠키가 잘 지워졌다면 페이지 새로고침
                    location.reload();
                }
            } else {
                console.log('logout() loginMethod is ', this.loginMethod);
                const result = removeCookies('login');
                console.log('logout() result :', result);
                if (result === 'success') {
                    // 쿠키가 잘 지워졌다면 페이지 새로고침
                    location.reload();
                }
            }


        },
        goToTalentTrade() {
            // 재능거래 페이지로 이동하는 코드
        },
        goToRegisterTalent() {
            // 재능등록 페이지로 이동하는 코드
        },
        goToMetabus() {
            // 메타버스 페이지로 이동하는 코드
        },

    }

}
</script>

<style></style> 