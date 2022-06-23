<template>
  <!-- selectedControl - {{ selectedControl }} -->
  <a-form
    ref="formRef"
    name="basic"
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    @change="handleSubmit"
  >
    <a-form-item name="isRequired" label="Required" :wrapper-col="{ span: 16 }">
      <a-checkbox v-model:checked="formState.isRequired"></a-checkbox>
    </a-form-item>

    <a-form-item
      label="Label"
      name="labelName"
      :rules="[{ required: true, message: 'Please Enter Label Name' }]"
    >
      <a-input v-model:value="formState.labelName" />
    </a-form-item>

    <a-form-item
      label="Help Text"
      name="helpText"
      :rules="[
        { required: formState.isRequired, message: 'Please Enter Help Text' },
      ]"
    >
      <a-input v-model:value="formState.helpText" />
    </a-form-item>

    <a-form-item
      label="Class"
      name="class"
      :rules="[{ required: false, message: 'Please Enter Custom Class Name' }]"
    >
      <a-input v-model:value="formState.class" />
    </a-form-item>

    <a-form-item
      label="Max Length"
      name="maxLength"
      :rules="[{ required: false, message: 'Please Enter Max Length' }]"
    >
      <a-input v-model:value="formState.maxLength" />
    </a-form-item>

    <a-form-item
      label="Type"
      name="type"
      :rules="[{ required: true, message: 'Please Select Type' }]"
    >
      <a-select
        v-model:value="formState.type"
        placeholder="Select Type"
        :options="options"
      ></a-select>
    </a-form-item>

    <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item> -->
  </a-form>
</template>
<script>
import { reactive, ref } from "vue";

export default {
  name: "InputText",
  props: {
    selectedControl: Object,
  },
  setup() {
    const formRef = ref();

    const options = ref([
      { value: "text", label: "Text" },
      { value: "email", label: "Email" },
      { value: "number", label: "Number" },
      { value: "password", label: "Password" },
    ]);

    const formState = reactive({
      isRequired: false,
      labelName: "",
      helpText: "",
      class: "",
      type: "",
      maxLength: "",
    });

    const onFinish = () => {
      console.log("Success:", formState);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formRef,
      formState,
      options,
      onFinish,
      onFinishFailed,
    };
  },
  methods: {
    handleSubmit() {
      let formStatus = true;
      let finalData = {};

      this.formRef
        .validate()
        .then(() => {
          formStatus = false;
          finalData.data = this.formState;
          finalData.formStatus = formStatus;

          this.eventBus.emit("InputText", {
            ...finalData,
            ...this.selectedControl,
          });
        })
        .catch(() => {
          formStatus = true;
          finalData.formStatus = formStatus;
          this.eventBus.emit("InputText", {
            ...finalData,
            ...this.selectedControl,
          });
        });
    },
  },
};
</script>

<style scoped></style>
