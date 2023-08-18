<template>
    <WalletWarnModal v-if="this.openModal == true" @sendClose="closeModalView" />
    <div class="w-full flex flex-col items-center h-full">
        <div
            class="relative border-t-2 border-b-2 flex flex-col items-center w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
                    class="absolute h-32 w-full justify-center rounded-xl bg-cover">
                <div
                    class="absolute -bottom-12 flex h-[150px] w-[150px] items-center justify-center rounded-full border-[4px] border-white bg-white dark:!border-navy-700">
                    <img class="h-full w-full rounded-full" :src="profileImage" alt="" />
                    <div class="absolute bottom-4 right-5 transform translate-x-1/2 translate-y-1/2 border-2 border-white w-6 h-6 rounded-full"
                        :class="IsConnected ? 'bg-green-500' : 'bg-red-500'">
                    </div>

                </div>

                <!-- component -->
                <div class='absolute right-0 top-1/2 transform -translate-y-1/2 mr-10'>
                    <button @click="goToUpdateUserData"
                        class="flex p-2.5 bg-blue-400 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="mt-16 flex flex-col items-center ">
                <h4 class="text-2xl font-bold text-navy-700 dark:text-white">
                    {{ user_nick }}
                </h4>


                <!--재능 카테고리-->
                <div class="mt-5 flex flex-wrap">
                    <span v-for="service in selectedServices" :key="service"
                        class="px-4 mt-1 sm:px-2 py-2 sm:py-1 ml-5 text-base sm:text-sm rounded-full text-indigo-500 border border-indigo-500">
                        {{ service }}
                    </span>
                </div>


            </div>

        </div>

        <div class="w-full flex flex-row mt-10 px-4 gap-4">
            <div
                class="relative flex flex-col items-center w-3/5 mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                <p class="font-NotoSan_bold text-xl">Buster Wallet</p>

                <BusterWallet v-if="!IsConnected" @PopUpWarn="handlePopUpWarn" />
                <AfterConnected v-else />
            </div>


            <div class="w-2/5 flex flex-col gap-4 ">
                <div
                    class="relative flex flex-col items-center w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                    <p>총 재능 거래 횟수 3 회</p>
                </div>

                <div
                    class="relative flex flex-col items-center w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                    <p>총 재능 판매 횟수 6 회</p>
                </div>

            </div>

        </div>


        <div class=" w-full  mt-5 px-4 h-screen">
            <div class="flex flex-row mb-2">
                <p class="text-xl  flex items-center font-NotoSan_regular mb-3 mr-5">활동 지역</p>

                <button
                    class="flex p-2.5 bg-blue-400 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </div>

            <iframe width="100%" height="80%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"></iframe>
        </div>




    </div>
</template>

<script>
import { getUserInfo, GetUserLoginInfo } from '../../Util/GetUserInfo.js'
import BusterWallet from './Wallet/ConnectWalletButton.vue'
import WalletWarnModal from '../Mypage/Wallet/WalletWarnModal.vue'
import AfterConnected from '../Mypage/Wallet/AfterConnected.vue'

export default {
    components: {
        BusterWallet,
        WalletWarnModal,
        AfterConnected
    },
    async mounted() {
        const authResult = getUserInfo();

        //console.log('mounted() authResult:', authResult.data);
        // 구조분해할당 : 객체 & 배열의 속성을 변수에 할당할 수 있게 해주는것.
        const processedHeaderInfo = await GetUserLoginInfo(authResult.data);
        //console.log('processedHeaderInfo : ', processedHeaderInfo);
        this.profileImage = processedHeaderInfo.profileImage;
        this.user_nick = processedHeaderInfo.nick;
        // this.user_intro = processedHeaderInfo.intro;
        // this.selectedServiceIndex = processedHeaderInfo.selectedServiceIndex;

        // selectedServiceIndex 배열인지 아닌지 확인하는 로직
        // console.log("Type:", typeof this.selectedServiceIndex);
        // console.log("Value:", this.selectedServiceIndex);
        // console.log("isArray:", Array.isArray(this.selectedServiceIndex));

        // if (!Array.isArray(this.selectedServiceIndex)) {
        //     console.log('배열 아님');
        // }
        // 배열이 아니고 String이라면 다시 parse하기
        // if (typeof this.selectedServiceIndex === "string") {
        //     this.selectedServiceIndex = JSON.parse(this.selectedServiceIndex);
        // }
        // // 배열에 있는 index에 따라서 카테고리 선택하기
        // this.selectedServices = this.selectedServiceIndex.map(index => this.services[index]);

        // console.log(this.selectedServices);
        // console.log('this.user_intro :', this.user_intro);

        if (localStorage.getItem('IsConnected') === 'true') {
            console.log('this.IsConnected = true;');
            this.IsConnected = true;
        } else {
            console.log('this.IsConnected = false;');

            this.IsConnected = false;
        }

    },
    data() {
        return {
            services: [
                '청소 • 집안일',
                '동행 • 돌봄', '반려동물', '역할대행', '벌레 • 쥐잡기', '과외'
            ],
            profileImage: '',
            user_nick: '',
            user_intro: '',
            selectedServiceIndex: [],
            selectedServices: [],
            openModal: false,
            IsConnected: false
        }
    },
    methods: {
        goToUpdateUserData() {
            this.$router.push('/UpdateProfile');
        },
        handlePopUpWarn(value) {
            if (value) {
                // 원하는 로직 수행
                console.log("PopUpWarn 이벤트 수신");
                this.openModal = value
            }
        },
        closeModalView(data) {
            // 모달창 닫는 메서드
            // console.log('closeModalView data :', data);
            this.openModal = data
        },

    }



}
</script>

<style></style>