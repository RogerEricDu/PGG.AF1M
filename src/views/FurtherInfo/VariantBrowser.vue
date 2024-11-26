<template>
    <div>
      <div ref="igvContainer" style="width: 100%; height: 600px;"></div>
    </div>
  </template>
  
  <script>
  import igv from "igv";
  
  export default {
    name: "VariantBrowser",
    data() {
      return {
        igvBrowser: null
      };
    },
    mounted() {
      // 初始化 IGV 浏览器
      const options = {
        genome: "hg38",  // 或 "hg38" 根据需要选择基因组版本
        locus: "chr2:46,250,000-47,250,000",  // 初始显示的基因组区域
        tracks: [
          {
            name: "Example Track",
            type: "variant",
            url: "/FST_filtered_variants.vcf",  // 使用 public 文件夹中的 VCF 文件
            format: "vcf",
            displayMode: "EXPANDED"
          }
        ]
      };

      igv.createBrowser(this.$refs.igvContainer, options).then(browser => {
        this.igvBrowser = browser;
      });
    },
    beforeDestroy() {
      // 销毁 IGV 浏览器实例
      if (this.igvBrowser) {
        this.igvBrowser.removeAllTracks();
        this.igvBrowser = null;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 确保 igvContainer 的宽高适合展示 */
  #igvContainer {
    border: 1px solid #ddd;
  }
  </style>