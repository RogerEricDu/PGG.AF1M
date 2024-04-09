<template>
  <div class="Collaborator-container">
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Collaborator</h3>
    <p style="font-size: 16px; color: dimgrey;">
      The majority of the genomic data of Han Chinese were contributed by the Han100K Project led by Prof. Dr. Shuhua Xu. Most participants of the Han100K Project are from China and some are from countries & regions where many Han Chinese are residing, such as Singapore and USA. See below for the full list of participants of the Han100K Project (* indicates PI).  
    </p>
    <hr style="margin: 10px 0;">
    
    <!-- 循环生成每个板块 -->
    <div v-for="(collaborator, index) in collaborators" :key="'collaborator_' + index" class="collaborator-item">
      <!-- 机构名 -->
      <p class="organization-name">{{ collaborator.organization }}</p>
      <!-- 人名列表 -->
      <p class="person-list">{{ collaborator.people.join(', ') }}</p>
      <!-- 分割线 -->
      <hr style="margin: 10px 0;">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collaborators: [
        {
          organization: "School of Life Sciences & Human Phenome Institute , Fudan University",
          people: ["Shuhua Xu*", "Lian Deng", "Yan Lu","Yan Zheng","XingDong Chen","Xiaohan Zhao","Jiaojiao Liu","Xiaoyue Du"] // 添加需要显示的人名
        },
        {
          organization: "HuaBiao Project",
          people: ["Li Jin*", "Jincun Yang", "Yi Wang"] 
        },
        {
          organization: "Zhongshan Hospital, Fudan University",
          people: ["Qiang Gao*", "Liangqing Dong"] 
        },
        {
          organization: "Obstetrics and Gynecology Hospital, Fudan University",
          people: ["Feng Zhang*"] 
        },
        {
          organization: "Tiantan Hospital",
          people: ["Yong Jiang", "Yongjun Wang*"] 
        },
        // 添加更多机构和人名
      ]
    };
  }
};
</script>

<style scoped>
/* .Collaborator-container {
} */

.collaborator-item {
  margin-bottom: 20px;
}

.organization-name {
  font-weight: bold; 
  font-size: 16px;
}

.person-list {
  font-weight: normal; 
  font-size: 14px;
}

/* 分割线样式 */
hr {
  border: none;
  border-top: 1px solid #ccc;
}
</style>

