<template>
  <div class="home-page">
    <!-- Banner Section -->
    <div class="banner-section">
      <h2>Welcome to PGG.AF1M!</h2>
      <el-carousel height="600px">
        <el-carousel-item v-for="item in imageUrl" :key="item">
          <img :src="item.url" alt="Banner Image" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-divider />

    <!-- Quick Start Section -->
    <div class="quick-start-section">
      <h2>Quick Start</h2>
      <div class="searching-container">
        <el-button type="primary" class="submit-button" @click="handleSubmit" style="margin-left: 10px;">
          <strong style="font-size: 18px;">Search Variants </strong><el-icon><Promotion /></el-icon>
        </el-button>
      </div>

      <div class="data-context">
        <p style="font-size: 14px; color: yellowgreen;">e.g. &nbsp;&nbsp;Variants:1:11847591;rsID:rs5063;</p>
        <p>
          The BiG Database for Han Population (BiG.Data) is a resource developed by Human Population Omics Group, with the goal of using computational approaches and developing new methods to dissect genetic architecture of human populations, quantitatively characterize genetic & phenotypic diversity, and reveal their demographic history and adaptive divergence.
        </p>
        <p>
          The data set provided on this website spans 257,519,942 SNPs and 20,000+ whole-genome sequences from 11 different modern Han population datasets, sequenced as part of various disease-specific and population genetic studies. The BiG.Data Principal Investigators and team can be found <a href="/about">here</a>, and the groups that have contributed data to the current release are listed <a href="/about">here</a>.
        </p>
        <p>
          All data here are released for the benefit of the wider biomedical community, without restriction on use - see the terms of use. Sign up for our mailing list for future release announcements.
        </p>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="statistics-section">
      <h2>Update Timeline</h2>
      <el-timeline>
        <el-timeline-item v-for="(update, index) in updates" :key="index" :timestamp="update.date" placement="top">
          <el-card>
            <h4>{{ update.title }}</h4>
            <p>{{ update.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <el-divider />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import image1 from '@/assets/images/Homepage_banner1.png';
import image2 from '@/assets/images/sample2.jpg';
import { useRouter } from "vue-router";

const router = useRouter();

const imageUrl = [
  { url: image1 },
  { url: image2 },
];

const currentTitleIndex = ref(-1);

const updates = [
  { date: '2024/5/17', title: 'Update the Allele Freq section', description: 'The Table and Further INFO of the Allele Frequency Dataset is ready to work' },
  { date: '2024/5/7', title: 'Update the Log In section', description: 'The Allele Freq Page has updated 3 tables ( All.ind / By.Province / By.region )' },
  { date: '2024/4/1', title: 'Update the Data\Home section', description: 'The Quick Start section in the Home Page is ready to work' },
  { date: '2024/3/4', title: 'Update the Summary\About\Guide section', description: 'The further information of this project is provided' },
  { date: '2024/2/22', title: 'Update the basic Frame of the BiG.Data project', description: '' },
  { date: '2024/2/2', title: 'Start the project Framework.', description: '' },
];

const handleSubmit = () => {
  router.push("/allelefreq");
  console.log({ searchType: searchType.value, selectedChr: selectedChr.value, input: input.value, region: region.value, province: province.value });
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  width: 1500px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f9fbfd, #e3e8ee);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
}

.banner-section {
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.banner-section h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.banner-section img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  filter: brightness(0.85);
}

.quick-start-section {
  margin: 40px 0;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.quick-start-section h2 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  color: #34495e;
}

.searching-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.el-button {
  background: linear-gradient(135deg, #5795ef, #3a6dd5);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.el-button:hover {
  filter: brightness(1.2);
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.data-context {
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.6;
  text-align: justify;
  color: #34495e;
}

.data-context a {
  color: #3498db;
  text-decoration: none;
}

.data-context a:hover {
  color: #1abc9c;
}

.statistics-section {
  margin: 40px 0;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.statistics-section h2 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  color: #34495e;
}

.el-timeline-item {
  font-size: 18px;
  line-height: 1.5;
}

.el-card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.el-timeline-item__dot {
  background: linear-gradient(135deg, #1abc9c, #16a085);
  border: none;
}

.content-box {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.background-container {
  position: relative;
  width: 100%;
  height: 900px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  transition: background-image 0.5s ease;
}

.title-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

.title-item {
  position: relative;
  width: 23%; /* To fit 4 items in a row */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.title-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.title-item h2 {
  z-index: 1;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  margin: 0;
}
</style>
