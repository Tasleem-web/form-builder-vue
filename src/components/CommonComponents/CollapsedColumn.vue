<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
    @change="handleSubmit"
  >
    <a-form-item
      label="Select from"
      name="from"
      :rules="[{ required: true, message: 'Please Select from' }]"
    >
      <a-select
        v-model:value="formState.from"
        placeholder="Select from"
        :options="selectedColSizePropsTo"
        @change="handleChange('from')"
      ></a-select>
    </a-form-item>
    <a-form-item
      label="Select To"
      name="to"
      :rules="[{ required: true, message: 'Please Select to' }]"
    >
      <a-select
        v-model:value="formState.to"
        placeholder="To"
        :options="selectedColSizePropsFrom"
        @change="handleChange('to')"
      ></a-select>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, ref } from "vue";
// import { UserOutlined } from "@ant-design/icons-vue";
import DeepCopy from "../Common.js";
export default {
  name: "CollapsedColumn",
  components: {
    // UserOutlined,
  },
  props: ["selectedColSize"],
  emits: ["mergeRangeCol"],
  setup(props, context) {
    let arr = [];

    if (props.selectedColSize.additional.length) {
      for (let i = 1; i <= props.selectedColSize.additional.length; i++) {
        arr.push({ value: i, label: i });
      }
    }

    const options = ref([
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ]);

    const selectedColSizePropsFrom = arr.length ? ref(arr) : options;
    let updateArr = DeepCopy?.deepCopy(arr);
    updateArr.splice(arr.length - 1, 1);
    const selectedColSizePropsTo = updateArr;

    const formState = reactive({
      from: null,
      to: null,
      item: props.selectedColSize.item,
    });

    const handleChange = () => {
      context.emit("mergeRangeCol", formState);
    };

    return {
      // from: ref(undefined),
      formState,
      options,
      selectedColSizePropsFrom,
      selectedColSizePropsTo,
      handleChange,
    };
  },
  methods: {
    handleSubmit() {
      //   this.eventBus.emit("InputText", this.formState);
    },
  },
  // watch: {
  //   formState: {
  //     handler(newValue) {
  //       this.$emit("mergeRangeCol", newValue);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>
<style scoped></style>
