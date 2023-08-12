<template>
    <div class="flex flex-col bg-white border-2 ">
        <div class=" w-72 ">
            <div class="flex flex-col items-center justify-start mx-6 mt-10">

                <span class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                    마이페이지
                </span>
            </div>
            <nav class="mt-10 px-6 ">
                <a class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#">
                    <svg width="20" height="20" fill="currentColor" class="m-auto" viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                        </path>
                    </svg>
                    <span class="mx-4 text-lg font-normal">
                        내 프로필
                    </span>
                    <span class="flex-grow text-right">
                    </span>
                </a>
                <a class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg "
                    href="#">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>

                    <span class="mx-4 text-lg font-normal">
                        재능거래
                    </span>
                    <span class="flex-grow text-right">
                    </span>
                </a>
                <a class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#">
                    <img width="20" height="20" src="../../assets/icon/talenttrade.png">


                    <span class="mx-4 text-lg font-normal">
                        재능판매
                    </span>
                    <span class="flex-grow text-right">

                    </span>
                </a>
                <a class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#">
                    <img width="23" height="23" src="../../assets/icon/review.png">

                    <span class="mx-4 text-lg font-normal">
                        리뷰
                    </span>
                    <span class="flex-grow text-right">
                    </span>
                </a>
            </nav>
            <div class="absolute bottom-0 my-10">
                <a class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
                    href="#">
                    <svg width="20" fill="currentColor" height="20" class="h-5 w-5" viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                        </path>
                    </svg>
                    <span class="mx-4 font-medium">
                        문의하기
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<!-- 이미지 태그 <img class="h-20 w-20 mb-5 rounded-full" :src="profileImage" />-->

<script>
export default {
    data() {
        return {
            services: [
                '배달 퀵', '청소 • 집안일', '이사 • 운반 • 수리',
                '동행 • 돌봄', '반려동물', '역할대행', '단기알바', '벌레 • 쥐잡기'
            ]
        }
    }

}
</script>

<style></style>