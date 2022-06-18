<template>
  <a-layout style="min-height: 100vh">
    <!-- <a-layout-sider v-model:collapsed="collapsed" collapsible> -->
    <a-layout-sider>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="menu in menuItems" :key="menu.id">
          <a-menu-item @click="clickedMenu($event, menu.elementName)">
            <pie-chart-outlined />
            <span>{{ menu.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <hr />
      <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <GridLayout />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <teleport to="#portal-modal">
    <template v-if="showModal">
      <PortalModal :visibleModal="showModal" @close="showModal = false">
        <template v-if="selectedElement == 'textBox'">
          <InputText />
        </template>
      </PortalModal>
    </template>
  </teleport>
</template>
<script>
import {
  PieChartOutlined,
  // DesktopOutlined,
  // UserOutlined,
  // TeamOutlined,
  // FileOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import menus from "../assets/menu.json";
import PortalModal from "./CommonComponents/Portal.vue";
import InputText from "./CommonComponents/InputText.vue";
import GridLayout from "./CommonComponents/Grid.vue";

export default {
  name: "HomeLayout",
  components: {
    PieChartOutlined,
    // DesktopOutlined,
    // UserOutlined,
    // TeamOutlined,
    // FileOutlined,
    PortalModal,
    InputText,
    GridLayout,
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(["1"]),
      menuItems: menus,
      selectedElement: null,
      showModal: false,
    };
  },
  methods: {
    clickedMenu(event, componentName) {
      this.selectedElement = componentName;
      this.showModal = true;
    },
  },
};
</script>
<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
main {
  margin: 0 !important;
}
</style>
