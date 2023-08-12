<template>
    <div class="py-30 mt-5 ">
        <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
            <div class="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
                <div v-for="item in items" :key="item.title"
                    class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
                    <div class="mb-12 space-y-4">
                        <h3 class="font-NotoSan_bold text-2xl font-semibold text-black">{{ item.title }}</h3>
                        <p class="mb-6">{{ item.description }}</p>
                        <a :href="item.link" class="text-lg block font-medium text-purple-600">{{ item.linkText }} →</a>
                    </div>
                    <img :src="item.imageSrc" class="w-2/3 ml-auto" alt="illustration" loading="lazy" :width="item.width"
                        :height="item.height">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 카드에 들어가는 이미지 import
import cardTalentTrade from '../../assets/Pic/cardtalenttrade.png';
import cardTalentRegister from '../../assets/Pic/cardtalentregister.png';
import cardMetabus from '../../assets/Pic/cardmetabus.png';

export default {
    data() {
        return {
            // card에 들어가야하는 데이터
            items: [
                {
                    title: '재능거래',
                    description: '재능을 찾고 있는데 맞는 사람을 찾지 못하셨나요? 여러분이 찾는 재능을 손쉽게 검색하고, 거래 과정도 간편하게 진행할 수 있습니다. 지금 바로 찾아보세요!',
                    link: '#',
                    linkText: '재능거래 하러가기',
                    imageSrc: cardTalentTrade,
                    width: '100',
                    height: '400'
                },
                {
                    title: '재능등록',
                    description: '자신의 능력을 공유하고 싶으신가요? 자신의 재능을 소개하고 판매할 수 있는 공간에서 다른사람들과 연결되어 보세요. 여러분의 재능을 통해 새로운 기회를 만들어 보세요!'
                    ,
                    link: '#',
                    linkText: '재능등록 하러가기',
                    imageSrc: cardTalentRegister,
                    width: '100',
                    height: '400'
                },
                {
                    title: '메타버스',
                    description: '현실 세계의 경계를 넘어, 가상 세계에서 여러분의 이웃들을 만나보세요! 다양한 활동과 만남이 여러분을 기다리고 있으니 지금 바로 메타버스를 탐험해보세요!',
                    link: '#',
                    linkText: '메타버스 하러가기',
                    imageSrc: cardMetabus,
                    width: '100',
                    height: '400'
                },


            ]
        }
    }
}
</script>


<style></style>