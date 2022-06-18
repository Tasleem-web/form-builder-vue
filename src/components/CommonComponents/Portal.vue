<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Form Modal"
      @ok="handleOk"
      width="70%"
      @formValue="getFormData"
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
  props: ["visibleModal"],
  setup(props, context) {
    const visible = ref(props.visibleModal);

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
    };

    return {
      visible,
      handleOk,
      showModal,
      handleCancel,
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
