<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
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
      :rules="[{ required: true, message: 'Please Enter Help Text' }]"
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

    <a-form-item
      label="Max Length"
      name="maxLength"
      :rules="[{ required: false, message: 'Please Enter Max Length' }]"
    >
      <a-input v-model:value="formState.maxLength" />
    </a-form-item>

    <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item> -->
    <!-- <a-form-item
      label="Style"
      name="style"
      :rules="[{ required: false, message: 'Select Style' }]"
    >
      <a-radio-group v-model:value="formState.style" button-style="solid">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </a-form-item> -->
  </a-form>
</template>
<script>
import { reactive, ref } from "vue";

export default {
  name: "InputText",
  setup() {
    const options = ref([
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
      maxLength: null,
    });

    return {
      formState,
      options,
    };
  },
  methods: {
    handleSubmit() {
      this.eventBus.emit("InputText", this.formState);
    },
  }
};
</script>

<style scoped></style>
