<script setup>
import { ref } from 'vue'

const source1 = ref('')
const source2 = ref('')
const target = ref('')

const source1Options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' }
]

const source2Options = [
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' }
]

const targetOptions = [
  { value: '11', label: 'Option 11' },
  { value: '12', label: 'Option 12' },
  { value: '13', label: 'Option 13' },
  { value: '14', label: 'Option 14' },
  { value: '15', label: 'Option 15' }
]

function clearSelections() {
    source1.value = ''
    source2.value = ''
    target.value = ''
}
</script>

<template>
    <div class="GeneFlow-container">
        <div class="GeneFlow-title">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Population Structure</h3>
            <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p>
        </div>
        <div class="section-selector">
            <div>
                <span>Source1:</span>
                <el-select v-model="source1" placeholder="Select" style="width: 200px">
                    <el-option
                    v-for="item in source1Options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div>
                <span>Source2:</span>
                <el-select v-model="source2" placeholder="Select" style="width: 200px">
                    <el-option
                    v-for="item in source2Options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div>
                <span>Target:</span>
                <el-select v-model="target" placeholder="Select" style="width: 200px">
                    <el-option
                    v-for="item in targetOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div>
                <el-button type="primary">Search</el-button>
                <el-button @click="clearSelections">Clear</el-button>
            </div>
        </div>
    </div>
</template>

<style>
.GeneFlow-container {
  display: block;
  margin: 35px 20px 0 20px;
}
.GeneFlow-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.section-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>