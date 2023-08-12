<template>
    <div class="flex flex-col h-screen"> <!-- h-screen 추가 -->
        <div class="flex flex-col flex-grow"> <!-- flex-grow 추가 -->
            <HeaderNoProfile />
            <div class="flex-grow h-screen"> <!-- flex-grow 추가 -->
                <div class="flex h-full w-full">
                    <!-- 사이드바 -->
                    <SideBar />
                    <!-- 컨텐트 -->
                    <Content />
                </div>
                <Footer />
            </div>

        </div>

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