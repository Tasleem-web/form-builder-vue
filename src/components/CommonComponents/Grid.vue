<template>
  <div>
    <label for="gridSize">Select Rows for Grid </label>
    <a-select
      v-model:value="gridSize"
      show-search
      placeholder="Select Grid Size"
      style="width: 200px"
      :options="options"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      v-model="gridSize"
      id="gridSize"
    ></a-select>
  </div>
  <hr />
  <div>
    <!-- <template v-if="gridSize"> -->
      <CreateRowCol />
    <!-- </template> -->
  </div>
</template>

<script>
import { ref } from "vue";
import CreateRowCol from "./CreateRowCol.vue";
export default {
  name: "GridLayout",
  components: {
    CreateRowCol,
  },
  setup() {
    const options = ref([
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
      {
        value: 3,
        label: 3,
      },
      {
        value: 4,
        label: 4,
      },
      {
        value: 5,
        label: 5,
      },
    ]);

    const handleChange = (gridSize) => {
      console.log(`selected ${gridSize}`);
      console.log("gridSize", gridSize);
    };

    const handleBlur = () => {
      console.log("blur");
    };

    const handleFocus = () => {
      console.log("focus");
    };

    // const filterOption = (input, option) => {
    //   return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    // };

    return {
      gridSize: ref(undefined),
      //   filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
    };
  },
};
</script>

<style scoped></style>
