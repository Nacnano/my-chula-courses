<template>
  <h1 class="TLOAS">Welcome to People Counting Services</h1>
  <p class="you-saved-my-heart-from-the-fate-of-ophelia">
    This service provides counting of people using an image processing technique
    (YOLOv8) on different computing services.
  </p>

  <div class="card-row">
    <div
      v-for="row in 10"
      :key="'row-' + row"
      class="card-pane"
      style="display: flex; align-items: flex-start; margin-bottom: 30px"
    >
      <!-- Upload per row -->
      <div class="upload-pane" style="margin-right: 20px">
        <ImageUpload
          :title="`Upload Image ${row}`"
          @fileSelected="(file) => handleFileSelected(row, file)"
        />
      </div>

      <!-- Submit cards per row -->
      <div
        class="submit-pane"
        style="display: flex; gap: 15px; flex-wrap: wrap"
      >
        <ImageSubmit
          :title="`Edge ${row}`"
          :row="row"
          :isDisabled="!uploadedImages[row] || isEdgeDisabled[row]"
          :originalImgFile="uploadedImages[row]"
          :api="queryService.edgePeopleCounting"
          @disableEdge="disableEdge"
          @enableEdge="enableEdge"
        />
        <ImageSubmit
          :title="`Cloud ${row}`"
          :row="row"
          :isDisabled="!uploadedImages[row] || isEdgeDisabled[row]"
          :originalImgFile="uploadedImages[row]"
          :api="queryService.cloudPeopleCounting"
          @disableEdge="disableEdge"
          @enableEdge="enableEdge"
        />
        <ImageSubmit
          :title="`Edge-Cloud ${row}`"
          :row="row"
          :isDisabled="!uploadedImages[row] || isEdgeDisabled[row]"
          :originalImgFile="uploadedImages[row]"
          :api="queryService.hybridPeopleCounting"
          @disableEdge="disableEdge"
          @enableEdge="enableEdge"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageSubmit from "./components/ImageSubmit.vue";
import ImageUpload from "./components/ImageUpload.vue";
import { reactive } from "vue";
import queryService from "./service/api";

const uploadedImages = reactive({});
const isEdgeDisabled = reactive({});
const disableEdge = (id) => {
  isEdgeDisabled[id] = true;
};
const enableEdge = (id) => {
  isEdgeDisabled[id] = false;
};
const handleFileSelected = (row, { file, base64 }) => {
  uploadedImages[row] = base64;
};
</script>

<style scoped>
.card-row {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.card-pane {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.upload-pane {
  justify-content: flex-end;
}
.edge-card {
  display: flex;
  flex-direction: row;
  max-width: 100%;
  flex-wrap: wrap;
}
</style>
