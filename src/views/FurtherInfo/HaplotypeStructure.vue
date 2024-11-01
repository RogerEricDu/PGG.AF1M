<template>
<div>
    <div class="method-selection">
    <strong style="font-size: 15px; margin-right: 20px;">MAF:</strong>
    <el-select v-model="maf" placeholder="Select a method" style="width: 180px;">
        <el-option label="0%" value="0" />
        <el-option label="1%" value="1" />
        <el-option label="5%" value="5" />
    </el-select>
    </div>

    <div class="selection-row">
        <strong style="font-size: 15px; margin-right: 20px;">Region:</strong>
    <el-input v-model="region" readonly style="width: 180px;margin-right: 20px;"  disabled/>
    
    <strong style="font-size: 15px; margin-right: 20px;">Window:</strong>
    <el-select v-model="window" placeholder="Select size" style="width: 180px;">
        <el-option label="20k" value="20k" />
        <el-option label="50k" value="50k" />
        <el-option label="100k" value="100k" />
    </el-select>
    </div>
</div>
</template>
    
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
setup() {
    const route = useRoute();
    const region = ref('');
    const window = ref('20k');
    const maf = ref('1%');

    // Extract URL parameters on component mount
    onMounted(() => {
    const chr = route.query.chr;
    const position = route.query.position;
    region.value = `${chr}:${position}`;
    });

    return {
    region,
    window,
    maf
    };
},
};
</script>
    
<style scoped>
.method-selection {
margin-left: 20px;
margin-bottom: 10px;
}

.method-options label {
margin-right: 15px; /* Space between radio buttons */
}

.selection-row {
display: flex;
align-items: center;
margin-left: 20px;
margin-bottom: 10px;
}

.selection-row label {
margin-right: 10px;
}
</style>