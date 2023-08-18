<template>
    <PopUpView v-if="this.openModal == true" :IsDefaultImage="IsDefaultImage" @sendClose="closeModalView"
        @file-selected="handleFileSelected" @DefaultPic="ChangetoDefaultPic" />

    <div class="flex flex-col items-center justify-center mt-4  ">
        <div class="bg-white p-20 flex flex-col h-350 w-350 items-center rounded-xl justify-center shadow shadow-slate-400">
            <div
                class="flex h-[170px] w-[170px] justify-center items-center rounded-full border-[4px] border-white bg-white dark:!border-navy-700 relative">
                <!-- relative를 추가 -->
                <img class="h-full w-full rounded-full border-4 " :src="profileImage" alt="" />

                <button @click="changeImage"
                    class="absolute left-28 bottom-0 flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                    <!-- absolute와 left-0, bottom-0을 추가 -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>

                </button>
            </div>
            <div class="flex flex-col mt-10 w-full max-w-2lg items-center justify-center">
                <div class="relative w-60">
                    <label for="name-with-label" class="font-NotoSan_bold flex justify-center text-gray-700">
                        닉네임
                    </label>
                    <input type="text" id="name-with-label" v-model="user_nick" @change="IsDuplicateNick" :class="{
                        'border-red-500': IsDuplicatedNick, // 중복이면 테두리 색을 빨간색으로
                        'border-gray-900': !IsDuplicatedNick // 중복이 아니면 기본 색으로
                    }"
                        class="mt-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-900 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                        name="nick" placeholder="닉네임을 입력해주세요" />
                </div>
                <div v-if="IsDuplicatedNick" class="text-red-500">{{ DuplicateMessage }}</div>
                <div v-else class="text-blue-500">{{ DuplicateMessage }}</div>

                <!--

                <label class="text-gray-700 mt-5 font-NotoSan_bold" for="name">자기소개</label>
                <textarea
                    class="mt-3 w-80 h-20 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-900 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    v-model="user_intro" id="comment" placeholder="자기소개를 입력해주세요" name="comment" rows="5" cols="40">
            </textarea>

                <label class="text-gray-700 mt-5 font-NotoSan_bold" for="name">관심 재능 분야</label>

                <div class="flex flex-row mt-3 flex-wrap">

                    <button v-for="(service, index) in services" :key="index" @click="toggleService(service, index)"
                        :class="selectedServicesIndex.includes(index) ? 'bg-blue-500 text-white' : 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white'"
                        class="px-6 py-2 mt-4 mr-2 ml-2 transition ease-in duration-200 uppercase rounded-full focus:outline-none">
                        {{ service }}
                    </button>
                </div>
                <div class="  mt-5 flex-wrap w-50">
                    <span v-for="index in selectedServicesIndex" :key="index"
                        class="px-4 py-2 mr-2 text-base rounded-full text-white bg-blue-400">
                        {{ services[index] }}
                        <button @click="removeService(index)" class="bg-transparent hover">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="ml-4"
                                viewBox="0 0 1792 1792">
                                <path
                                    d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z">
                                </path>
                            </svg>
                        </button>
                    </span>

                </div> -->

                <button type="button" @click="UpdateUserInfo"
                    class="py-2 px-4 mt-10 mb-3 w-80 bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    내 정보 수정하기
                </button>



            </div>
        </div>
    </div>
</template>

<script>
import { getUserInfo, GetUserLoginInfo } from "../../Util/GetUserInfo.js";
import PopUpView from '../../components/Mypage/PopUpView.vue';
import { toggleService, removeService, CheckDuplicateNick } from '../../Method/Mypage.js';
import { UpdateUserInfo } from '../../API/Account.js'


export default {
    name: 'IndexView',
    components: {
        PopUpView, // 여기에 추가해주기
    },
    async mounted() {
        const authResult = getUserInfo();

        //console.log('mounted() authResult:', authResult.data);
        // 구조분해할당 : 객체 & 배열의 속성을 변수에 할당할 수 있게 해주는것.
        const processedHeaderInfo = await GetUserLoginInfo(authResult.data);
        console.log('processedHeaderInfo : ', processedHeaderInfo);
        this.profileImage = processedHeaderInfo.profileImage;
        // 현재 이미지가 기본이미지인지 아닌지 확인해야 함.
        this.IsDefaultImage = processedHeaderInfo.IsDefaultImage;
        this.user_nick = processedHeaderInfo.nick;
        this.original_nick = processedHeaderInfo.nick;
        this.user_intro = processedHeaderInfo.intro;
        this.user_email = processedHeaderInfo.email;



    },
    data() {
        return {
            profileImage: "",
            user_email: "",
            user_nick: "",
            original_nick: "",
            user_intro: "",
            services: [
                '청소 • 집안일',
                '동행 • 돌봄',
                '반려동물',
                '역할대행',
                '벌레 • 쥐잡기',
                '과외'
            ],
            selectedServicesIndex: [], // 선택된 서비스의 인덱스 배열
            // 만약 저장된 유저의 배열을 불러왔을때 해당 data에 파싱하면 됨.
            selectedServices: [], // 선택된 서비스의 배열
            openModal: false,
            IsDefaultImage: false,
            IsDuplicatedNick: false,
            DuplicateMessage: "",
            image: "",
            selectedImage: null



        };
    },
    methods: {
        async IsDuplicateNick() {
            console.log("IsDuplicateNick() 들어옴 :", this.user_nick);
            // 입력하다가 포커스가 input에서 벗어나면 닉네임 중복검사 하게끔 하기
            // 중복이 아닌지 중복인지 확인해야 한다. 하지만 원래 닉네임은 그대로 냅둬야 함.
            // 같은 닉네임이면 아무것도 안하기
            const { IsDuplicatedNick, DuplicateMessage } = await CheckDuplicateNick(this.original_nick, this.user_nick);
            this.IsDuplicatedNick = IsDuplicatedNick;
            this.DuplicateMessage = DuplicateMessage;

        },
        toggleService(service, index) {
            // 관심 재능 카테고리 선택했을 때 배열에 쌓이는 메서드
            const result = toggleService(this.selectedServicesIndex, this.selectedServices, service, index);
            this.selectedServicesIndex = result.selectedServicesIndex;
            this.selectedServices = result.selectedServices;

        },
        removeService(index) {
            // 인덱스배열에서 선택된 버튼의 인데스 제거하기
            const result = removeService(this.selectedServicesIndex, this.selectedServices, this.services, index);
            this.selectedServicesIndex = result.selectedServicesIndex;
            this.selectedServices = result.selectedServices;
            // 배열로 저장됨. db에 배열 저장해야함. -> JSON문자열로 변환한다음 DB에 저장.
            // console.log('removeService :', this.selectedServices);
            // console.log('removeService index 배열:', this.selectedServicesIndex);
        },
        changeImage() {
            // 모달 창 나와야 함.
            this.openModal = true;
        },
        closeModalView(data) {
            // 모달창 닫는 메서드
            // console.log('closeModalView data :', data);
            this.openModal = data
        },
        async UpdateUserInfo() {
            // 모든 정보들을 수정하지 않았다면 굳이 DB에 덮어쓰지 하지 않아도 된다.
            // email, intro, keyword, nick, file
            // console.log('UpdateUserInfo() email : ', this.user_email);
            // console.log('UpdateUserInfo() user_intro : ', this.user_intro);
            // console.log('UpdateUserInfo() selectedServices : ', this.selectedServicesIndex);
            // console.log('UpdateUserInfo() nick : ', this.user_nick);
            // console.log('UpdateUserInfo() file : ', this.profileImage);

            if (this.profileImage === 'https://d27049n8tc16nq.cloudfront.net/user_profiles/default.png') {
                // console.log('기보보오오오오오오오온');
                this.profileImage = 'default';
            }

            // console.log('UpdateUserInfo() file : ', this.user_intro);
            // console.log('UpdateUserInfo() file : ', this.selectedImage);
            const uploadResult = await UpdateUserInfo(this.user_email, this.user_intro, JSON.stringify(this.selectedServicesIndex), this.user_nick, this.selectedImage, this.profileImage);
            console.log('UpdateUserInfo() uploadResult : ', uploadResult);
            // 업데이트 됐으니까 마이페이지로 돌아가기
            this.$router.push('/MyPage');


        },
        handleFileSelected(file) {
            // 선택한 파일 처리
            console.log('Selected file:', file);
            this.selectedImage = file;
            // FileReader 객체 생성
            const reader = new FileReader();
            // FileReader 객체를 사용하여 파일을 데이터 URL 형태로 읽어와서 이미지 태그의 src 속성에 바인딩하는 것
            // 파일 읽기가 완료되면 실행될 콜백 함수 설정
            reader.onload = (e) => {
                // 읽은 데이터 URL을 profileImage에 저장
                this.profileImage = e.target.result;
                this.IsDefaultImage = false;

            };

            // 파일 읽기 시작 (데이터 URL 형태로)
            reader.readAsDataURL(file);


        },
        ChangetoDefaultPic(data) {
            // 팝업창에서 기본 이미지 설정 선택
            console.log('ChangetoDefaultPic() data : ', data);

            if (data) {
                this.profileImage = 'https://d27049n8tc16nq.cloudfront.net/user_profiles/default.png';
                this.IsDefaultImage = true;
            }
        }
    },



};
</script>

<style></style>
../../Method/Mypage.js