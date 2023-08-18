<template>
    <div class="fixed z-10 inset-60 ">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- Modal content -->
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                    <!-- Modal content goes here -->
                    <h3 class=" text-2xl text-center leading-6 font-NotoSan_regular font-bold text-gray-900"
                        id="modal-headline">
                        프로필 사진 등록
                    </h3>
                    <div class="flex flex-col items-center justify-between w-full gap-4 mt-8">
                        <form>
                            <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
                        </form>
                        <button type="button" @click="UploadPic"
                            class="py-4 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            사진 등록하기
                        </button>

                        <button v-if="!IsDefaultImage" type="button" @click="ChangetoDefaultPic"
                            class="py-4 px-4 mt-5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            기본 이미지로 변경
                        </button>
                    </div>

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
  