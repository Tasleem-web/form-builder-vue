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
            <!-- <MinusCircleOutlined @click="removeRow(gridRow)" /> -->
            <a-button type="primary" @click="openModal">Merge Column</a-button>
          </template>
        </div>
      </section>
    </div>
  </div>
  <button @click="addRow">Add Row</button>

  <teleport to="#portal-modal">
    <template v-if="showModal">
      <PortalModal
        :visibleModal="showModal"
        @close="showModal = false"
        :modalWidth="50"
      >
        <CollapsedColumn />
      </PortalModal>
    </template>
  </teleport>
</template>

<script>
// import { MinusCircleOutlined } from "@ant-design/icons-vue";
// import { reactive, ref, watch } from "vue";
import { ref } from "vue";
import PortalModal from "./Portal.vue";
import CollapsedColumn from "./CollapsedColumn.vue";

export default {
  name: "CreateRowCol",
  props: [""],
  components: {
    // MinusCircleOutlined,
    // PlusOutlined,
    PortalModal,
    CollapsedColumn,
  },
  data() {
    return {
      count: 1,
      gridRowSize: [1],
      countCol: 1,
      gridColSize: 1,
      showModal: false,
    };
  },
  methods: {
    addRow() {
      this.count++;
      this.gridRowSize.push(this.count);
    },
    removeRow(rowNum) {
      console.log(rowNum);
    },
    handleChange(gridCol) {
      this.gridColSize = gridCol;
    },
    openModal() {
      this.showModal = true;
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
      gridSize: ref(undefined),
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
