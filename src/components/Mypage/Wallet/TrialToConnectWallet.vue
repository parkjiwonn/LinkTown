<template>
    <Header />


    <div
        class="flex flex-col items-center justify-center max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">

        <img class="w-15 h-8" src="../../../assets/icon/longnameLogo.png" alt="Workflow" />
        <p class="mt-5">https://theblockbuster.org</p>



        <ConnectLoading v-if="IsLoading" />
        <div v-else>
            <h1 class="mt-5 text-4xl font-medium">Buster Wallet에 연결</h1>
            <div class="mt-10 w-full p-3">
                <div class="flex flex-row mt-5">
                    <img class="w-10 h-10 mr-10" src="../../../assets/icon/eye.png" alt="Workflow" />
                    <div class="flex flex-col">
                        <h3 class="text-xl font-bold">허용</h3>
                        <h3>지갑 잔고 및 활동 보기</h3>
                    </div>
                </div>

                <div class="flex flex-row mt-5">
                    <img class="w-8 h-8 mr-10" src="../../../assets/icon/tx.png" alt="Workflow" />
                    <div class="flex flex-col">
                        <h3 class="text-xl font-bold">요청</h3>
                        <h3>트랜잭션에 대한 요청 보내기</h3>
                    </div>
                </div>

                <div class="flex flex-row mt-5">
                    <img class="w-8 h-8 mr-10" src="../../../assets/icon/x.png" alt="Workflow" />
                    <div class="flex flex-col">

                        <h3>귀하의 허락 없이 <br />자금 이동을 허용하지 않습니다.</h3>
                    </div>
                </div>

            </div>
            <div class="flex flex-row w-full mt-40 gap-5">
                <button @click="goToBack" type="button"
                    class="py-2 px-4  bg-indigo-300 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    거절
                </button>
                <button @click="goToAccessWallet" type="button"
                    class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    승인
                </button>
            </div>
        </div>




    </div>
</template>

<script>
import ConnectLoading from '../../../components/Mypage/Wallet/ConnectLoading.vue'

export default {
    components: {
        ConnectLoading
    },
    data() {
        return {
            IsLoading: false
        }
    },
    methods: {
        goToBack() {
            this.$router.go(-1);
        },
        goToAccessWallet() {
            // 지갑 연결 고고
            this.IsLoading = true;
        }
    }
}
</script>

<style></style>