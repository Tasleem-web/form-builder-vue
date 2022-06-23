<template>
  <a-form
    layout="horizontal"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <template v-for="(controls, index) in controls" :key="index"></template>
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username"> </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// import InputText
// import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
export default {
  name: "MyDashboard",
  props: ["selectedControl"],
  components: {
    // UserOutlined,
    // LockOutlined,
  },
  data() {
    return {
      controls: [
        {
          controlName: "",
        },
      ],
    };
  },
  methods: {
    addMore() {
      this.courses.push({
        controlName: "",
      });
    },
    remove(index) {
      this.courses.splice(index, 1);
    },
  },
  setup() {
    const formState = reactive({
      user: "",
      password: "",
    });

    const handleFinish = (values) => {
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
};
</script>

<style scoped></style>
