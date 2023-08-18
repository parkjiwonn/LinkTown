<template>
    <button type="button" @click="connectWallet"
        class="py-2 px-4 w-80 mt-5 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>

        Connect Buster Wallet
    </button>
</template>

<script>

export default {

    data() {
        return {

        }
    },
    methods: {
        connectWallet() {
            // 해당 메서드를 통과했을 때 지갑 연결을 해야하는데 
            // 지갑이 다운로드 되어있는지 아닌지 확인해야 한다. 
            // 그걸 어떻게? 
            var editorExtensionId = "hodghjlmapccamgdngdgnaamiiabflmo";
            var url = "http://localhost:5173/Mypage";
            var vm = this;  // 여기에서 'this'는 Vue 인스턴스를 참조합니다.

            try {
                // Make a simple request:
                chrome.runtime.sendMessage(editorExtensionId, { openUrlInEditor: url },
                    function (response) {
                        if (chrome.runtime.lastError) {
                            // 에러 처리 로직
                            console.log('확장프로그램 없음');
                            vm.$emit('PopUpWarn', true);
                            console.error(chrome.runtime.lastError.message);
                            return;
                        }

                        if (!response || !response.success) {
                            console.log('확장프로그램 없음', response.success);
                        } else {
                            console.log('확장프로그램 있음.', response.success);
                            vm.$router.push('/AccessWallet');
                        }


                    });
            } catch (e) {
                console.error("sendMessage 호출 중 에러 발생: ", e);
                console.log('확장프로그램 없음');
                vm.$emit('PopUpWarn', true);
            }


        },

    },
    created() {

    }
}
</script>

<style></style>