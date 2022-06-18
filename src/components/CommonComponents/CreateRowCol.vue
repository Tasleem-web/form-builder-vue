<template>
  <pre>gridRowSize - {{ JSON.stringify(gridRowSize) }}</pre>
  <div class="grid">
    <div class="outerGrid" v-for="gridRow in gridRowSize" :key="gridRow">
      <section class="merged-grid">
        <div
          class="grid"
          :style="{ gridTemplateColumns: `repeat(${gridColSize}, 1fr)` }"
        >
          <template v-for="gridCol in gridColSize" :key="gridCol">
            <div class="inside">
              {{ gridCol }}
            </div>
          </template>
        </div>

        <div class="flex align-center">
          <a-select
            v-model:value="gridSize"
            placeholder="Select Column for this Row"
            style="width: 80px"
            :options="options"
            @change="handleChange"
            v-model="gridSize"
            id="gridSize"
          ></a-select>
          <template v-if="gridRowSize.length > 1">
            <MinusCircleOutlined @click="removeRow(gridRow)" />
          </template>
        </div>
      </section>
    </div>
  </div>
  <button @click="addRow">Add Row</button>
</template>

<script>
import { MinusCircleOutlined } from "@ant-design/icons-vue";
// import { reactive, ref, watch } from "vue";
import { ref } from "vue";

export default {
  name: "CreateRowCol",
  props: [""],
  components: {
    MinusCircleOutlined,
    // PlusOutlined,
  },
  data() {
    return {
      count: 1,
      gridRowSize: [1],
      countCol: 1,
      gridColSize: 1,
    };
  },
  methods: {
    addRow() {
      this.count++;
      this.gridRowSize.push(this.count);
    },
    removeRow() {},
    handleChange(gridCol) {
      console.log(gridCol);
      // console.log(context.gridColSize);
      this.gridColSize = gridCol;
    },
  },

  setup(props, context) {
    console.log({ props, context });
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

    // const handleChange = (gridCol) => {
    //   console.log(gridCol);
    //   console.log(context.gridColSize);
    //   // context.gridColSize = gridCol;
    // };

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
      gridSize: ref([1, 2, 3, 4, 5]),
      //   filterOption,
      handleBlur,
      handleFocus,
      // handleChange,
      options,
    };
  },

  // setup(props) {
  //   console.log({ props });
  //   const areas = [
  //     {
  //       label: "Beijing",
  //       value: "Beijing",
  //     },
  //     {
  //       label: "Shanghai",
  //       value: "Shanghai",
  //     },
  //   ];
  //   const sights = {
  //     Beijing: ["Tiananmen", "Great Wall"],
  //     Shanghai: ["Oriental Pearl", "The Bund"],
  //   };
  //   const formRef = ref();
  //   const dynamicValidateForm = reactive({
  //     sights: [],
  //     area: undefined,
  //   });
  //   watch(
  //     () => dynamicValidateForm.area,
  //     () => {
  //       dynamicValidateForm.sights = [];
  //     }
  //   );

  //   const removeSight = (item) => {
  //     let index = dynamicValidateForm.sights.indexOf(item);

  //     if (index !== -1) {
  //       dynamicValidateForm.sights.splice(index, 1);
  //     }
  //   };

  //   const addSight = () => {
  //     dynamicValidateForm.sights.push({
  //       value: undefined,
  //       price: undefined,
  //       id: Date.now(),
  //     });
  //   };

  //   const onFinish = (values) => {
  //     console.log("Received values of form:", values);
  //     console.log("dynamicValidateForm:", dynamicValidateForm);
  //   };

  //   return {
  //     formRef,
  //     dynamicValidateForm,
  //     onFinish,
  //     removeSight,
  //     addSight,
  //     areas,
  //     sights,
  //   };
  // },
};
</script>

<style scoped></style>
