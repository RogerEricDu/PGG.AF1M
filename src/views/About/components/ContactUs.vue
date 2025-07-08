<template>
    <h3 style="font-size: 24px;margin-bottom: 20px;">| Contact Us</h3>

    <div class="ContactUs-container">
        <div class="block-container">
            <div class="block">
                <el-icon><Avatar /></el-icon>
                <div class="description">
                    <p class="organization">Group:</p>
                    <p class="info">Population Genomics Group</p>
                </div>
            </div>
            <div class="block">
                <el-icon><HomeFilled /></el-icon>
                <div class="description">
                    <p class="organization">Institution:</p>
                    <p class="info">School of Life Science Fudan University, Shanghai Institutes for Biological Sciences (SIBS), Chinese Academy of Sciences (CAS)</p>
                </div>
            </div>
            <div class="block">
                <el-icon><LocationFilled /></el-icon>
                <div class="description">
                    <p class="organization">Address:</p>
                    <p class="info">2005 Song Hu Road, Shanghai, China 200438</p>
                </div>
            </div>
            <div class="block">
                <el-icon><Message /></el-icon>
                <div class="description">
                    <p class="organization">Email:</p>
                    <p class="info">humpog@fudan.edu.cn</p>
                </div>
            </div>
        </div>
    </div>
    <img src="@/assets/images/About_location.png" class="bottom-image">
</template>

<style>
.ContactUs-container {
    font-weight: normal;
    color: black;
    text-align: center;
    user-select: text; /* 允许文本被选择 */
}

.block-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.block {
    display: flex;
    align-items: center;
}

.description {
    margin-left: 10px;
}

.organization {
    font-weight: bold;
    font-size: 16px;
    text-align: left; 
}

.info {
    font-size: 10px;
    text-align: left; 
    color: dimgrey; 
}
.bottom-image {
    display: block;
    margin: 20px auto; /* 居中并添加一些上下边距 */
    border: 2px solid #ccc;
    border-radius: 8px;
    max-width: 100%; /* 确保图片不超过父容器的宽度 */
    height: auto; /* 根据宽度自动调整高度 */
}
</style>