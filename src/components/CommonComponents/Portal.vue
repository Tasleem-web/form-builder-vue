<template>
  <div>
    <!-- <pre>{{ JSON.stringify(setModalWidth) }}</pre> -->
    <a-modal
      v-model:visible="visible"
      :title="`${selectedControl?.label} - Configurations`"
      @ok="handleOk"
      :width="setModalWidth"
      @formValue="getFormData"
      style="top: 20px"
      :closable="false"
      :maskClosable="false"
    >
      <slot></slot>
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="handleOk"
          :disabled="isValidForm"
          >Submit</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PortalModal",
  props: { visibleModal: Boolean, modalWidth: Number, selectedControl: Object },
  data() {
    return {
      isValidForm: true,
    };
  },
  setup(props, context) {
    const visible = ref(props.visibleModal);
    let modalWidthCal = props.modalWidth ? props.modalWidth + "%" : "70%";
    const setModalWidth = ref(modalWidthCal);

    const handleOk = () => {
      visible.value = false;
      context.emit("close");
    };

    const showModal = () => {
      visible.value = true;
    };

    const handleCancel = () => {
      visible.value = false;
      context.emit("close");
    };

    return {
      visible,
      handleOk,
      showModal,
      handleCancel,
      setModalWidth,
    };
  },
  methods: {
    getFormData(formData) {
      console.log("formData", formData);
    },
  },
  mounted() {
    this.eventBus.on("InputText", (args) => {
      // console.log(args);
      this.isValidForm = args?.formStatus;
      this.$emit("getAllData", args);
    });
  },
};
</script>

<style scoped></style>
