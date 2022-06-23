<template>
  <a-form
    ref="formRef"
    name="dynamic_form_item"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <a-form-item
      v-for="(domain, index) in dynamicValidateForm.controls"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Controls' : ''"
      :name="['controls', index, 'value']"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'change',
      }"
    >
      <pre>key - {{ domain.key }}</pre>

      <template v-if="domain.type == 'text'">
        <a-input
          v-model:value="domain.value"
          placeholder="please input domain"
        />
      </template>
      <template v-if="domain.type == 'button'">
        <a-button type="primary" html-type="submit" @click="submitForm"
          >Submit</a-button
        >
      </template>
      <MinusCircleOutlined
        v-if="dynamicValidateForm.controls.length > 1"
        class="dynamic-delete-button"
        :disabled="dynamicValidateForm.controls.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm"
        >Submit</a-button
      >
      <a-button @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { MinusCircleOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import DeepCopy from "../Common.js";

export default {
  name: "TestDemo",
  props: ["selectedControl"],
  components: {
    MinusCircleOutlined,
    // PlusOutlined,
  },

  setup() {
    const formRef = ref();
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    const dynamicValidateForm = reactive({
      controls: [],
    });

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", dynamicValidateForm.controls);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const removeDomain = (item) => {
      let index = dynamicValidateForm.controls.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.controls.splice(index, 1);
      }
    };

    const addDomain = (obj) => {
      dynamicValidateForm.controls.push(DeepCopy?.deepCopy(obj));
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
    };
  },
  watch: {
    selectedControl(newVal) {
      console.log("newVal", newVal);
      this.addDomain(newVal);
      //   console.log({ newVal, oldVal });
    },
  },
};
</script>

<style scoped></style>
