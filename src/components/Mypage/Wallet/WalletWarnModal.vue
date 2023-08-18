<template>
    <div class="fixed z-10 inset-60 ">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- Modal content -->
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="flex items-center justify-center flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                    <!-- Modal content goes here -->
                    <img class="h-20 w-20 rounded-full" src="../../../assets/icon/walletwarn.png" alt="" />
                    <p class="mt-5 text-3xl font-bold">잠깐!</p>
                    <p class="mt-5 text-2xl text-center"> 현재 Buster Wallet이 다운로드 되어있지 않네요. <br /> 다운로드 진행 후
                        다시 지갑 연결해주세요.</p>

                </div>
                <div class="flex items-center justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button @click="closeModal" type="button" class="font-semibold text-blue-600 hover:text-blue-800">
                        취소
                    </button>
                    <!-- Other buttons go here -->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'PopUpView',
    methods: {
        closeModal() {
            this.$emit('sendClose', false);
        },
        ChangetoDefaultPic() {
            // 기본 이미지로 변경
            this.$emit('DefaultPic', true);
            // 사진 등록하면 모달창도 닫히게 하기 
            this.$emit('sendClose', false)
        },
        UploadPic() {
            // 파일 입력 요소를 트리거
            this.$refs.fileInput.click();
            // 템플릿에서 ref=fileInput속성을 가진 요소를 참조하고 클릭이벤트를 트리거한다.
            // 버튼 클릭했을 때 파일 선택 대화상자가 열린다. 
        },
        handleFileUpload() {
            const fileInput = this.$refs.fileInput; // 파일 입력 요소 참조 
            const file = fileInput.files[0]; // 선택한 파일 가져오기

            if (file) {
                // 부모 컴포넌트에 파일 정보 전달
                this.$emit('file-selected', file);
                // 사진 등록하면 모달창도 닫히게 하기 
                this.$emit('sendClose', false)
            }
        },

    },
    props: {
        IsDefaultImage: Boolean
    },
    data() {
        return {

        }
    },
    created() {
        console.log('created');
        // 인스턴스가 생성된 직후에 호출된다. 템플릿, 가상 dom은 아직 마운트 되지 않음.
        // 현재 유저의 프로필 상태 확인 해야 함.
        // 상태 확인 후 버튼 2개로 갈지 1개로 갈지 정해야 함.
        console.log('created in PopupView IsDefaultImage :', this.IsDefaultImage);
    },
}
</script>
  
<style></style>
  