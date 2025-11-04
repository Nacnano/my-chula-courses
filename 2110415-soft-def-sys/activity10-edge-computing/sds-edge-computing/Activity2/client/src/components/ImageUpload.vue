<script setup>
import { ref } from 'vue'

defineProps(['title'])
const emit = defineEmits(['fileSelected'])

const selectedFile = ref(null) // Variable to store the selected file
const thumbnail = ref(null) // Variable to store the thumbnail Data URL
const base64Image = ref('')
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
const maxFileSize = 5 * 1024 * 1024 // 5 MB in bytes

const previewImage = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate type
    if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a JPEG, PNG, or GIF image.')
        event.target.value = null // reset input
        return
    }

    // Validate size
    if (file.size > maxFileSize) {
        alert('File size too large. Maximum 5MB allowed.')
        event.target.value = null // reset input
        return
    }

    // Proceed to read and preview file
    const reader = new FileReader()
    reader.onload = (e) => {
        thumbnail.value = e.target.result
        base64Image.value = reader.result.split(',')[1]

        // Emit file and base64 string to parent
        emit('fileSelected', { file: file, base64: base64Image.value })
    }
    reader.readAsDataURL(file)
}

defineExpose({
    base64Image,
})
</script>

<template>
    <div class="upload-card">
        <h1 class="title">{{ title }}</h1>
        <p class="note">File size should not exceed 5 MB</p>
        <div class="card">
            <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="previewImage"
                class="upload-form"
            />
            <div v-if="thumbnail" class="thumbnail-preview">
                <img :src="thumbnail" alt="Uploaded Image" class="thumbnail" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.upload-card {
    width: 260px;
    min-height: 260px;
    margin: 20px;
    padding: 20px;
    text-align: center;
    /* border: 1px solid #ddd; */
    border-radius: 8px;
    /* background-color: #f9f9f9; */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.card {
    padding: 0;
    overflow: hidden;
}

.note {
    font: small-caption;
    color: rgb(163, 93, 196);
    margin-bottom: 5px;
    color: #6e5aa5;
    font-weight: bolder;
}

.thumbnail-preview {
    margin-top: 20px;
}

.thumbnail {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    object-fit: contain;
}
</style>
