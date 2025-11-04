<script setup>
import { computed, ref } from 'vue'
const props = defineProps([
    'title',
    'isDisabled',
    'originalImgFile',
    'api',
    'modelSize',
    'row',
])
const emit = defineEmits(['disableEdge', 'enableEdge'])
const responseImg = ref('') // Variable to store the thumbnail Data URL
const totalTime = ref(0)
const loading = ref(false)
const rawData = ref(null)
const defaultInfo = {
    peopleCount: '-',
    processingTime: '-',
    responseTime: '-',
    delay: '-',
}
const info = ref(defaultInfo)
const responseImgSrc = computed(() => {
    return `data:image/jpeg;base64,${responseImg.value}`
})
const submitImage = async (event) => {
    loading.value = true
    emit('disableEdge', props.row)
    const response = await props
        .api(props.originalImgFile, props.modelSize)
        .then(({ data, responseTime }) => {
            rawData.value = data
            console.log(data)
            info.value = {
                peopleCount: data.detections || '-',
                processingTime: `${(data.processing_time * 1000).toFixed(
                    3
                )} ms`,
                responseTime: `${responseTime.toFixed(3)} ms`,
                delay: `${(responseTime - data.processing_time * 1000).toFixed(
                    3
                )} ms`,
            }
            responseImg.value = data.predicted_image
            totalTime.value = responseTime
        })
        .catch((err) => {
            info.value = defaultInfo
            responseImg.value = ''
            console.log(err.message)
        })
    loading.value = false
    emit('enableEdge', props.row)
}
</script>
<template>
    <div class="submit-card">
        <div class="title-section">
            <h1 class="title">{{ title }}</h1>
            <button :disabled="isDisabled" @click="submitImage">Submit</button>
        </div>
        <div class="card">
            <table class="card-table">
                <tbody>
                    <tr>
                        <td>Detect</td>
                        <td class="table-value">{{ info.peopleCount }}</td>
                    </tr>
                    <tr>
                        <td>Response Time (ms)</td>
                        <td class="table-value">{{ info.responseTime }}</td>
                    </tr>
                    <tr>
                        <td>Processing Time (ms)</td>
                        <td class="table-value">{{ info.processingTime }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="thumbnail-preview">
                <img
                    v-if="!loading"
                    :src="responseImgSrc"
                    alt="Response Image"
                    class="thumbnail"
                />
                <div v-else>Loading...</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.submit-card {
    width: 260px;
    /* height: 300px; */
    margin: 20px;
    padding: 20px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.title {
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
}
.table-value {
    padding-left: 5px;
}
.card {
    padding: 0;
}

.card-table {
    text-align: left;
}

.thumbnail-preview {
    margin-top: 20px;
}

.thumbnail {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
