<template>
  <div class="box-container">
    <div class="box">
      <!-- Box 1 内容 -->
      <h4>Box 1</h4>
      <p>这里是第一个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 2 内容 -->
      <h4>Box 2</h4>
      <p>这里是第二个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 3 内容 -->
      <h4>Box 3</h4>
      <p>这里是第三个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 4 内容 -->
      <h4>Box 4</h4>
      <p>这里是第四个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 5 内容 -->
      <h4>Box 5</h4>
      <p>这里是第五个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 6 内容 -->
      <h4>Box 6</h4>
      <p>这里是第六个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 7 内容 -->
      <h4>Box 7</h4>
      <p>这里是第七个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 8 内容 -->
      <h4>Box 8</h4>
      <p>这里是第八个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 9 内容 -->
      <h4>Box 9</h4>
      <p>这里是第九个框的内容。</p>
    </div>
    <div class="box">
      <!-- Box 10 内容 -->
      <h4>Box 10</h4>
      <p>这里是第十个框的内容。</p>
    </div>

    
  </div>
</template>

<script setup>
// 在这里可以添加任何逻辑或导入组件
</script>

<style scoped>
.box-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行以容纳所有框 */
  justify-content: center; /* 水平居中对齐 */
}

.box {
  width: 1200px; /* 每个框的宽度 */
  margin: 10px; /* 每个框的外边距 */
  border-radius: 5px; /* 圆角半径 */
  background-color: white; /* 浅灰色背景 */
  padding: 20px; /* 内边距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  display: flex;
  flex-direction: column; /* 垂直排列内容 */
  align-items: center; 
  justify-content: center; /* 垂直居中内容 */
}
</style>
