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
        :options="options"
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
        :options="options"
      ></a-select>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, ref } from "vue";
// import { UserOutlined } from "@ant-design/icons-vue";
export default {
  name: "CollapsedColumn",
  components: {
    // UserOutlined,
  },
  setup(props, ctx) {
    console.log({ props, ctx });
    const options = ref([
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ]);

    const formState = reactive({
      from: null,
      to: null,
    });

    return {
      from: ref(undefined),
      formState,
      options,
    };
  },
  methods: {
    handleSubmit() {
      //   this.eventBus.emit("InputText", this.formState);
    },
  },
};
</script>
<style scoped></style>
