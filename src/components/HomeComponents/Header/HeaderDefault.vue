<template>
    <nav class="bg-white dark:bg-gray-800 shadow ">
        <div class="px-7 ">
            <div class="flex items-center justify-between h-16">
                <div class="w-full justify-between flex items-center">
                    <a class="flex-shrink-0" href="/">
                        <img class="w-15 h-8" src="../../../assets/icon/longnameLogo.png" alt="Workflow" />
                    </a>
                    <div class="hidden md:block">
                        <div class="flex items-baseline ml-10 space-x-4">

                            <button @click="goToSignUp" class=" px-6 py-2  transition ease-in duration-200 uppercase 
                                    rounded-md hover:bg-indigo-400 hover:text-white 
                                     focus:outline-none">
                                Sign up
                            </button>

                            <button @click="goToLogIn" class=" px-6 py-2  transition ease-in duration-200 uppercase 
                                    rounded-md hover:bg-indigo-400 hover:text-white 
                                     focus:outline-none">
                                Log In
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
                <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    href="/#">
                    Sign Up
                </a>
                <a class="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    Login
                </a>

            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false
        };
    },
    methods: {
        toggleMenu() {
            console.log("header 줄어듬");
            this.showMenu = !this.showMenu;
        },
        goToSignUp() {
            console.log("header default에서 signup 선택");
            this.$router.push('/Signup');


        },
        goToLogIn() {
            console.log("header default에서 login 선택");
            this.$router.push('/Login');

        }

    }

}
</script>

<style></style> 