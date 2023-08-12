<template>
    <div>
        <Header v-if="HeaderDefault" />
        <HeaderAfterLogin v-else :header-info="UserLoginInfo" />
        <Cta />
        <Cards />
        <div class="mt-10">
            <Footer />
        </div>

    </div>
</template>

<script>
import Header from '../components/HomeComponents/Header/HeaderDefault.vue';
import HeaderAfterLogin from '../components/HomeComponents/Header/HeaderAfterLogin.vue';
import Cards from '../components/HomeComponents/Cards.vue';
import Cta from '../components/HomeComponents/CTA.vue';
import Footer from '../components/HomeComponents/Footer.vue'
import { getUserInfo } from '../Util/GetUserInfo.js'



export default {
    components: {
        Header,
        Cards, // 재능거래, 재능판매, 메타버스 설명 & 이동할 수 있는 카드 
        Cta, // 서비스 간단 설명해주는 부분 (Cta : call to action 사용자가 특정 행동을 할 수 있도록 유도하는 것.) ex. 서비스 배너
        Footer,
        HeaderAfterLogin
    },
    data() {
        return {
            HeaderDefault: true,
            UserLoginInfo: ""
        }
    },
    mounted() {
        // (1) 로컬 스토리지에서 자동로그인을 했는지 우선 확인한다.
        // (2) 자동로그인이 없다면 쿠키를 확인해본다.
        // (3) 모두 없으면 headerdefault
        const authResult = getUserInfo();

        if (authResult.authenticated) {
            // 로그인 한적이 있는지 쿠키 & 로컬 스토리지 확인하기
            this.setUserLoginInfo(authResult.data);
            // 로그인했다면 HeaderAfterLogin 로드하기
            this.HeaderDefault = false;
        } else {
            // 로그인 하지 않았다면 HeaderDefault 로드하기
            this.HeaderDefault = true;
        }


    },
    methods: {
        // 유저의 로그인 정보 header로 보내는 머서드
        setUserLoginInfo(data) {
            console.log('setUserLoginInfo() data :', data);
            this.UserLoginInfo = data;
        }


    }
}
</script>

<style></style>