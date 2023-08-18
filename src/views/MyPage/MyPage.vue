<template>
    <div class="flex flex-col h-screen">
        <HeaderNoProfile />
        <div class="flex flex-col flex-grow"> <!-- flex-grow와 flex를 조합 -->
            <div class="flex h-full">
                <!-- 사이드바와 컨텐트 영역의 컨테이너 -->
                <div class="flex h-full w-full">
                    <!-- 사이드바 -->
                    <div class="h-full">
                        <SideBar class="h-full" /> <!-- 높이를 전체로 설정 -->
                    </div>

                    <!-- 컨텐트 -->
                    <Content class="h-full flex-grow" /> <!-- 높이를 전체로 설정하고 flex-grow를 추가 -->
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>



<script>
import HeaderNoProfile from '../../components/HomeComponents/Header/HeaderNoProfile.vue'
import SideBar from '../../components/Mypage/SideBar.vue'
import Content from '../../components/Mypage/Content.vue'
import Footer from '../../components/HomeComponents/Footer.vue'



export default {
    components: {
        HeaderNoProfile,
        SideBar,
        Content,
        Footer,

    },
    data() {
        return {


        }
    },
    mounted() {


    },
    methods: {



    }

}
</script>

<style></style>