<template>
    <div class="w-full flex flex-col items-center h-full">
        <div
            class="relative border-t-2 border-b-2 flex flex-col items-center w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
                    class="absolute flex h-32 w-full justify-center rounded-xl bg-cover">
                <div
                    class="absolute -bottom-12 flex h-[150px] w-[150px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                    <img class="h-full w-full rounded-full"
                        src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png'
                        alt="" />
                </div>
            </div>
            <div class="mt-16 flex flex-col items-center ">
                <h4 class="text-2xl font-bold text-navy-700 dark:text-white">
                    LinkTown 유저1
                </h4>
                <p class="text-xl font-normal text-gray-600">⭐️ 4.5</p>
                <p class="text-xl font-normal text-gray-600">맡겨만 주세요. 뭐든 잘합니다! </p>
                <div class="mt-5 flex flex-row">
                    <span v-for="service in services" :key="service"
                        class="px-4 py-2 ml-5 text-base rounded-full text-indigo-500 border border-indigo-500">
                        {{ service }}
                    </span>
                </div>

            </div>

        </div>



        <div class=" w-full  mt-5 px-4 h-1/2">
            <p class="text-xl font-NotoSan_regular mb-3">활동 지역</p>
            <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"></iframe>
        </div>




    </div>
</template>

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