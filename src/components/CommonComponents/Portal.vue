<template>
  <div>
    <!-- <pre>{{ JSON.stringify(setModalWidth) }}</pre> -->
    <a-modal
      v-model:visible="visible"
      title="Form Modal"
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
        <a-button key="submit" type="primary" @click="handleOk"
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
  props: ["visibleModal", "modalWidth"],
  setup(props, context) {
    const visible = ref(props.visibleModal);
    let modalWidthCal = props.modalWidth ? props.modalWidth + "%" : "70%";
    console.log(modalWidthCal);
    const setModalWidth = ref(modalWidthCal);

    const handleOk = () => {
      visible.value = false;
      context.emit("close");
    };

    const showModal = () => {
      visible.value = true;
    };

    // const handleOk = () => {
    //   loading.value = true;
    //   setTimeout(() => {
    //     loading.value = false;
    //     visible.value = false;
    //   }, 2000);
    // };

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
      console.log(args);
    });
  },
};
</script>

<style scoped></style>
