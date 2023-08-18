<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="mt-10 text-4xl font-medium">Buster Wallet에 연결중 ...</h1>
        <svg width="80" height="80" fill="currentColor" class="mr-2 animate-spin mt-10" viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
            </path>
        </svg>


    </div>
</template>

<script>
export default {
    mounted() {
        // 크롬 확장 프로그램에 메시지 보내야 함.
        this.connectWallet();
    },
    methods: {
        connectWallet() {
            var editorExtensionId = "hodghjlmapccamgdngdgnaamiiabflmo";
            var url = "http://localhost:5173/AccessWallet";
            var vm = this;  // 여기에서 'this'는 Vue 인스턴스를 참조합니다.

            try {
                // Make a simple request:
                chrome.runtime.sendMessage(editorExtensionId, { openUrlInEditor: url },
                    function (response) {
                        if (chrome.runtime.lastError) {
                            // 에러 처리 로직
                            console.error('connectWallet()', chrome.runtime.lastError.message);
                            return;
                        }

                        if (!response || !response.success) {
                            console.log('connectWallet() 확장프로그램 없음', response.success);
                            handleError(url);
                        } else {
                            console.log('connectWallet() 확장프로그램 있음.', response.success);
                            // 지갑 UI 를 바꿔야 하고 바꾼후에 응답이 오면 
                            // setTimeout 함수 사용
                            setTimeout(() => {
                                vm.$router.push('/Home');
                                localStorage.setItem('IsConnected', true);
                                vm.getRidofBadge();
                            }, 3000); // 3000ms = 3초






                        }


                    });
            } catch (e) {
                console.error("connectWallet() sendMessage 호출 중 에러 발생: ", e);
                console.log('connectWallet() 확장프로그램 없음');
            }
        },
        getRidofBadge() {

            var editorExtensionId = "hodghjlmapccamgdngdgnaamiiabflmo";
            var url = "http://localhost:5173/AccessWallet22";
            var vm = this;  // 여기에서 'this'는 Vue 인스턴스를 참조합니다.
            try {
                // Make a simple request:
                chrome.runtime.sendMessage(editorExtensionId, { openUrlInEditor: url },
                    function (response) {
                        if (chrome.runtime.lastError) {
                            // 에러 처리 로직
                            console.log('getRidofBadge() 확장프로그램 응답 없음');
                            console.error(chrome.runtime.lastError.message);
                            return;
                        }

                        if (!response || !response.success) {
                            console.log('getRidofBadge() badge 못지움', response.success);

                        } else {
                            console.log('getRidofBadge() badge 지움', response.success);

                        }


                    });
            } catch (e) {
                console.error("sendMessage 호출 중 에러 발생: ", e);
                console.log('확장프로그램 없음');
            }
        }
    }


}
</script>

<style></style>