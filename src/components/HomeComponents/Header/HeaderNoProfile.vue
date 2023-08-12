<!--Header에 프로필 사진 & 지갑 연결 여부 표시안되어있는 버전-->
<template>
    <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="px-7 ">
            <div class="flex items-center justify-between h-16">
                <div class="w-full justify-between flex items-center">
                    <a class="flex-shrink-0" href="/">
                        <img class="w-15 h-8" src="../../../assets/icon/longnameLogo.png" alt="Workflow" />
                    </a>
                    <div class="hidden md:block">
                        <div class="flex items-baseline ml-10 space-x-4">
                            <!--Header에 있는 메뉴 반복문으로 구현-->
                            <button v-for="menu in menus" :key="menu.text" @click="menu.action"
                                class=" px-6 py-2 transition ease-in duration-200 uppercase rounded-md hover:bg-indigo-400 hover:text-white focus:outline-none">
                                {{ menu.text }}
                            </button>


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
                <!--Header에 있는 메뉴 반복문으로 구현-->
                <button v-for="menu in menus" :key="menu.text" @click="menu.action"
                    class=" px-6 py-2 transition ease-in duration-200 uppercase rounded-md hover:bg-indigo-400 hover:text-white focus:outline-none">
                    {{ menu.text }}
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
            // Header에 들어가는 메뉴
            menus: [
                { text: '재능거래', action: this.goToTalentTrade },
                { text: '재능등록', action: this.goToRegisterTalent },
                { text: '메타버스', action: this.goToMetabus }
            ]
        };
    },
    methods: {
        goToTalentTrade() {
            // 재능거래 페이지로 이동하는 코드
        },
        goToRegisterTalent() {
            // 재능등록 페이지로 이동하는 코드
        },
        goToMetabus() {
            // 메타버스 페이지로 이동하는 코드
        },
        // 화면 비율 줄어들었을 때 생기는 토글 버튼 
        // 클릭 이벤트 발생시 Header의 메뉴 보임.
        toggleMenu() {
            this.showMenu = !this.showMenu;
        }
    }
};
</script>

<style></style>