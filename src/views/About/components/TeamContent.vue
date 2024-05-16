<script setup>
import image1 from '@/assets/images/xushua.jpg';
import image2 from '@/assets/images/xushua.jpg';
import image3 from '@/assets/images/xushua.jpg';
import image4 from '@/assets/images/xushua.jpg';
import image5 from '@/assets/images/xushua.jpg';

const images = [
  { src: image1, description: "XuShua",extra_description:"Principal investigator1" },
  { src: image2, description: "XuShua",extra_description:"Principal investigator2"},
  { src: image3, description: "XuShua",extra_description:"Principal investigator3" },
  { src: image4, description: "XuShua",extra_description:"Principal investigator4" },
  { src: image5, description: "XuShua",extra_description:"Principal investigator5" },
  // 添加更多图片和描述...
];

const teamMembers = [
  { name: "John Doe", role: "Research Assistant" },
  { name: "Jane Smith", role: "Data Analyst" },
  { name: "Michael Johnson", role: "Software Engineer" },
  { name: "Michael Johnson", role: "Software Engineer" },
  { name: "Michael Johnson", role: "Software Engineer" },
]

</script>

<template>
    <div class="mainContent-container">
      <h3 style="font-size: 24px; margin-bottom: 20px;">| Team</h3>
    </br>
      <p style="font-size: 17px; margin-bottom: 20px;">The database was designed, created and maintained by Population Genomics group (PGG) led by Dr. Shuhua Xu.</p>    

      <!-- 图片网格布局 -->
      <div class="image-grid">
        
        <!-- 使用循环来动态生成图片和描述 -->
        <div v-for="(image, index) in images" :key="index" class="image-item">
          <img :src="image.src" :alt="'Image ' + (index + 1)">
          <!-- 将描述放入模板中 -->
          <div class="image-description">
            <p style="margin-bottom: 10px; text-align: center;">
              <strong style="color: darkslategray;font-size: 20px;">{{ image.description }}</strong>
            </p>
            <p style="font-size: 16px;">
              {{ image.extra_description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 其他内容布局 -->
      <div>
        <p style="font-size: 17px; margin-bottom: 20px;">With great contribution of the IT team from Big Data Center let by Dr. Guoqing Zhang.</p>    
      </div>

      <div class="other-content-grid">
      <!-- 使用循环来动态生成其他内容块 -->
      <div v-for="(teamMember, index) in teamMembers" :key="'team_member_' + index" class="team-member">
        <div class="team-member-name">{{ teamMember.name }}</div>
        <div class="team-member-role">{{ teamMember.role }}</div>
      </div>
    </div>
    
    </div>

  </template>
  
  
    
  <style scoped>
  .mainContent-container{
    font-weight: normal;
    color: black;
    user-select: text; /* 允许文本被选择 */
  }
  .mainContent-container p {
    color: dimgrey;
    margin-bottom:20px;
    line-height: 1.6;
    font-size: 14px;
  }

  .image-grid {
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 四列 */
    gap: 20px; /* 图像之间的间隔 */
  }

  .image-item {
    position: relative;
  }
  .image-item img{
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  }

  .image-description {
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    text-align: center; /* 将描述居中 */
    background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
    padding: 10px;
    transition: bottom 0.3s ease; /* 添加动画效果 */
  }

  .image-item:hover .image-description {
    bottom: -30px; /* 鼠标悬停时向上移动以显示描述 */
  }

  .other-content-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .team-member {
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .team-member-name,
  .team-member-role {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .team-member-name {
    font-size: 20px;
    font-weight: bold;
  }

  .team-member-role {
    font-size: 16px;
    color: darkslategray;
  }

</style>
