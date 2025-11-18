<template>
  <div class="home-page">
    <!-- 网站亮点数字 -->
    <div class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div data-aos="fade-up" class="stat-card">
            <div class="stat-number" style="color:#8a71bb">12</div>
            <div class="stat-label">Highlander Populations</div>
          </div>
          <div data-aos="fade-up" class="stat-card">
            <div class="stat-number" style="color:#c0402e">
              <countTo ref="myNum" :startVal="startVal2" :endVal="endVal2" :duration="3000"></countTo>+
            </div>
            <div class="stat-label">Highlander Genomes</div>
          </div>
          <div data-aos="fade-up" class="stat-card">
            <div class="stat-number" style="color:#7ca83b">1 MB</div>
            <div class="stat-label">Novel Sequences</div>
          </div>
          <div data-aos="fade-up" class="stat-card">
            <div class="stat-number" style="color:#e8701a">1</div>
            <div class="stat-label">Potential HAA Genes</div>
          </div>
          <div data-aos="fade-up" class="stat-card">
            <div class="stat-number" style="color:#2a96ef">1</div>
            <div class="stat-label">Plateau-specific SVs</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Start Section -->
    <div class="quick-start-section">
      <div class="container">
        <h2 class="section-title">Quick Start</h2>
        <div class="searching-container">
          <el-button type="primary" class="submit-button" @click="handleSubmit">
            <strong class="button-text">Search Variants</strong>
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>

        <div class="data-context">
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
    </div>

    <!-- Banner Section -->
    <div class="banner-section">
      <div class="container">
        <div class="section-title">
          Database for Large Cohort Allele Frequency & Genotype Frequency
        </div>
        <div class="banner-container">
          <h2 v-if="showBannerTitle" class="banner-title">
            Welcome to PGG.AF1M!
          </h2>
          <el-carousel height="500px" @change="handleCarouselChange">
            <el-carousel-item v-for="(item, index) in imageUrl" :key="item.url">
              <img :src="item.url" alt="Banner Image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="container">
        <div class="section-title">
          Data, Methods and Resources We provide in PGG.AF1M
        </div>
        <div class="features-grid">
          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><InfoFilled /></el-icon>
            </div>
            <h3 class="feature-title">Multiple Sequences</h3>
            <p class="feature-description">
              We provide Microarray data samples and NGS data samples, allowing users to query different types of genetic spectrum data by selecting different tags.
            </p>
          </div>

          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><Histogram /></el-icon>
            </div>
            <h3 class="feature-title">Large Cohort</h3>
            <p class="feature-description">
              We provide a large-scale population data foundation with continuous growth, offering a robust basis for genetic spectrum analysis and visualization.
            </p>
          </div>

          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><Search /></el-icon>
            </div>
            <h3 class="feature-title">Searching Diversity</h3>
            <p class="feature-description">
              We provide diverse query options for exploring variant allele frequency spectra, with flexible filtering conditions. It supports aggregate population queries as well as cross-group comparative analyses.
            </p>
          </div>

          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><PieChart /></el-icon>
            </div>
            <h3 class="feature-title">AF Spectrum</h3>
            <p class="feature-description">
              We provide diverse spectrum data, including ref/alt alleles, sample size, and genotype frequencies, with external links to cross-reference major databases.
            </p>
          </div>

          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><MapLocation /></el-icon>
            </div>
            <h3 class="feature-title">Functional Map</h3>
            <p class="feature-description">
              We provide Advanced Geographic Visualization Modules, including heatmaps and geomaps to display the geographical distribution of allele frequencies for specific variants.
            </p>
          </div>

          <div data-aos="fade-up" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><Tools /></el-icon>
            </div>
            <h3 class="feature-title">Related Tools</h3>
            <p class="feature-description">
              We offer a diverse suite of tools that enable users to upload files for batch queries of genetic spectrum data, with support for imputation, IBD analysis, and the DeepSeek-V3-powered Q&A model.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const handleSubmit = () => {
  router.push("/allelefreq");
};
</script>

<style scoped>
/* 全局样式 */
.home-page {
  background: linear-gradient(to bottom, #f8fafc, #eef2f7);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* 统计数字部分 */
.stats-section {
  padding: 30px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
}

/* Quick Start 部分 */
.quick-start-section {
  padding: 30px 0;
  background: white;
  margin: 40px 0;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.searching-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.submit-button {
  background: linear-gradient(135deg, #065f46, #064e3b);
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.25);
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
}

.button-text {
  margin-right: 8px;
}

.data-context {
  max-width: 900px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.7;
  color: #4a5568;
}

.data-context p {
  margin-bottom: 10px;
}

.data-context a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}

.data-context a:hover {
  text-decoration: underline;
}

/* Banner 部分 */
.banner-section {
  padding: 20px 0;
}

.banner-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.banner-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.banner-section img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

/* 功能特性部分 */
.features-section {
  padding: 40px 0;
  background: white;
  margin: 40px 0;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
  background: white;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #065f46, #064e3b);
  border-radius: 12px;
  margin-bottom: 20px;
  color: white;
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 15px;
}

.feature-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .banner-section img {
    height: 350px;
  }
  
  .banner-title {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .feature-card, .stat-card {
    padding: 20px 15px;
  }
}
</style>
