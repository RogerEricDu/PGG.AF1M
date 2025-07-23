<template>
  <div class="home-page">
    <div style="
      text-align: center;
      padding-top: 10px;
      text-transform: uppercase;
      letter-spacing: .2em;
      font-weight: 700;
      margin-bottom: 15px;
      color: #000;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;">
        <!--          Pangenome.Highland-->
        Database for Large Cohort Allele Frequency & Genotype Frequency
    </div>
    <!-- Banner Section -->
    <div class="banner-section">
      <h2 v-if="showBannerTitle" style="text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);">
        Welcome to PGG.AF1M!
      </h2>
      <el-carousel height="780px" @change="handleCarouselChange">
        <el-carousel-item v-for="(item, index) in imageUrl" :key="item.url">
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
        <!-- <p style="font-size: 14px; color: yellowgreen;">e.g. &nbsp;&nbsp;Variants:1:11847591;rsID:rs5063;</p> -->
        <p>
          The Database for Large Cohort Allele Frequency (PGG.AF1M) is a resource developed by Human Population Omics Group, with the goal of using computational approaches and developing new methods to dissect genetic architecture of human populations, quantitatively characterize genetic & phenotypic diversity, and reveal their demographic history and adaptive divergence.
        </p>
        <p>
          The data set provided on this website spans <strong>257,519,942</strong> SNPs (follow-up tp 2 billion) and <strong>50,000+</strong> whole-genome sequences (follow-up to 100K+) from 11 different modern Han population datasets, sequenced as part of various disease-specific and population genetic studies. The PGG.AF1M Principal Investigators and team can be found <a href="/about"><strong>HERE</strong></a>, and the groups that have contributed data to the current release are listed <a href="/about"><strong>HERE</strong></a>.
        </p>
        <p>
          All data here are released for the benefit of the wider biomedical community, without restriction on use - see the terms of use. Sign up for our mailing list for future release announcements.
        </p>
      </div>
    </div>

    <div class="cover-color2">
      <div class="container">
      <div style="max-width: 1300px; margin: 0 auto">
        <div style="
          text-align: center;
          padding-top: 10px;
          text-transform: uppercase;
          letter-spacing: .2em;
          font-weight: 700;
          margin-top: 10px;
          color: #006bf8;
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;">
            Data, Methods and Resources We provide in PGG.AF1M
        </div>
        <div style="display:flex;justify-content:space-between;flex-wrap: wrap;width: 100%;padding-top: 30px">
          <!-- 搜索 Novel Sequences-->
          <div class="card-grid">
            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><InfoFilled /></el-icon>
                Multiple Sequences
              </div>
              <div style="font-size:16px;font-weight:440;text-align:left ;color:#61718d;">
                We provide Microarray data samples and NGS data samples, allowing users to query different types of genetic spectrum data by selecting different tags.
              </div>
            </div>

          <!-- 搜索  Potential HAA Genes-->
            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><Histogram /></el-icon>
                Large Cohort
              </div>
              <div style="font-size:16px;font-weight:400;text-align:left ;color:#61718d;">
                We provide a large-scale population data foundation with continuous growth, offering a robust basis for genetic spectrum analysis and visualization.
              </div>
            </div>

          <!-- 搜索  Plateau-specific SVs-->
            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><Search /></el-icon>
                Searching Diversity
              </div>
              <div style="font-size:16px;font-weight:400;text-align:left ;color:#61718d;">
                We provide diverse query options for exploring variant allele frequency spectra, with flexible filtering conditions. It supports aggregate population queries as well as cross-group comparative analyses (e.g., by ethnicity or other cohorts).
              </div>
            </div>

            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><PieChart /></el-icon>
                AF Spectrum
              </div>
              <div style="font-size:16px;font-weight:400;text-align:left ;color:#61718d;">
                We provide diverse spectrum data, including ref/alt alleles, sample size, and genotype frequencies, with external links to cross-reference major databases (e.g., gnomAD).
              </div>
            </div>

            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><MapLocation /></el-icon>
                Functional Map
              </div>
              <div style="font-size:16px;font-weight:400;text-align:left ;color:#61718d;">
                We provide Advanced Geographic Visualization Modules, including heatmaps and geomaps to display the geographical distribution of allele frequencies for specific variants.
              </div>
            </div>

            <div data-aos="fade-up" class="digit-card2">
              <div style="font-size:28px;font-weight:650;text-align:left;color:#44484d">
                <el-icon :size="28"><Tools /></el-icon>
                Related Tools
              </div>
              <div style="font-size:16px;font-weight:400;text-align:left ;color:#61718d;">
                We offer a diverse suite of tools that enable users to upload files for batch queries of genetic spectrum data, with support for imputation, IBD analysis, and the DeepSeek-V3-powered Q&A model for advanced genomic insights.
              </div>
            </div>
          </div>

        </div>
      </div>
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
import { ref, computed  } from "vue";
import image1 from '@/assets/images/HomePage-Logo.png';
import image2 from '@/assets/images/Database-Logo1.png';
import image3 from '@/assets/images/Database-Logo2.png';
import image4 from '@/assets/images/Database-Logo3.png';
import image5 from '@/assets/images/Database-Logo4.png';
import { useRouter } from "vue-router";

const router = useRouter();

const imageUrl = [
  { url: image1 },
  { url: image2 },
  { url: image3 },
  { url: image4 },
  { url: image5 },
];

const currentCarouselIndex = ref(0);

const handleCarouselChange = (index) => {
  currentCarouselIndex.value = index;
};

const showBannerTitle = computed(() => currentCarouselIndex.value !== 0);

const updates = [
  { date: '2025/5/4', title: 'Variants Table Section', description: 'We provide Database-wide SNP search & Single SNP comparison' },
  { date: '2025/2/2', title: 'GeoMap Section', description: 'The GeoMap and HeatMap download & comparison tools is already to be used.' },
  { date: '2024/5/17', title: 'Update the Allele Freq section', description: 'The Table and Further INFO of the Allele Frequency Dataset is ready to work' },
  { date: '2024/5/7', title: 'Update the Log In section', description: 'The Allele Freq Page has updated 3 tables ( All.ind / By.Province / By.region )' },
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
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f9fbfd, #e3e8ee);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
}

.banner-section {
  text-align: center;
  position: relative;
  margin-bottom: 20px;
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
  height: 780px;
  object-fit: cover;
  filter: brightness(0.85);
}

.quick-start-section {
  margin: 20px 0;
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
  transition: all 0.2s ease;
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
  margin-top: 20px;
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
.cover-color2 {
  background-color: #f7fafd;
  padding-bottom: 30px;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  padding-top: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #006bf8;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding-top: 0px;
}

.digit-card2 {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.digit-card2:hover {
  transform: translateY(-5px);
}

.digit-card2 i {
  color: #1a73e8;
  font-size: 35px;
  font-weight: 800;
  margin-bottom: 10px;
}

.digit-card2-title {
  font-size: 28px;
  font-weight: 650;
  color: #44484d;
  margin-bottom: 10px;
}

.digit-card2-desc {
  font-size: 16px;
  font-weight: 400;
  color: #61718d;
  line-height: 1.5;
}

/* Responsive layout for smaller screens */
@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

</style>
