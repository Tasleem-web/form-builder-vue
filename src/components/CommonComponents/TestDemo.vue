<template>
  <div id="mySidenav" class="sidenav" :style="{ width: widthStyle + 'px' }">
    <a class="closebtn" @click="removeWidth">&times;</a>
    <template v-for="(menuObj, index) in menuItems" :key="menuObj.id">
      <a @click="addControlName($event, menuObj, index)">
        <span>{{ menuObj.label }}</span>
      </a>
    </template>
  </div>
  <div id="main" v-bind:style="{ marginLeft: widthStyle + 'px' }">
    <span style="font-size: 30px; cursor: pointer" @click="addWidth">
      &#9776; open
    </span>
    <form>
      <h1>Click HTML Controls from left panel</h1>
      <div class="work-experiences">
        <template v-if="ControlNames.length > 0">
          <div
            class="form-row"
            v-for="(control, index) in ControlNames"
            :key="index"
          >
            <template v-if="control.type == 'text'">
              <label :for="control?.type">{{ control?.label }}</label>
              <div class="flexCenter">
                <a-input
                  :id="control?.type"
                  v-model:value="control.value"
                  :name="`ControlNames[${index}][value]`"
                  type="text"
                  class="form-control"
                />
                <span
                  style="font-size: 20px; cursor: pointer"
                  @click="openModal"
                >
                  <EditOutlined />
                </span>
              </div>
            </template>
          </div>
        </template>
      </div>
      <hr />

      <div class="form-group">
        <button @click="submit" type="button" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  </div>
  <teleport to="#portal-modal">
    <template v-if="showModal">
      <PortalModal
        :visibleModal="showModal"
        @close="showModal = false"
        :modalWidth="50"
        :selectedControl="selectedControl"
        @getAllData="getAllData"
      >
        <template v-if="selectedControl?.type == 'text'">
          <InputText :selectedControl="selectedControl" />
        </template>
        <!-- <CollapsedColumn /> -->
      </PortalModal>
    </template>
  </teleport>
</template>

<script>
// import { ref } from "@vue/reactivity";
import menus from "../../assets/menu.json";
import { EditOutlined } from "@ant-design/icons-vue";
import DeepCopy from "../Common.js";
import InputText from "./InputText.vue";
import PortalModal from "./Portal.vue";

export default {
  name: "TestDemo",
  // props: ["selectedControl"],
  components: {
    EditOutlined,
    InputText,
    PortalModal,
  },

  data() {
    return {
      ControlNames: [],
      widthStyle: "250",
      menuItems: menus,
      selectedControl: null,
      showModal: false,
    };
  },
  methods: {
    addControlName(event, obj) {
      obj.id = "id-" + new Date().getTime();
      let deepCopy = DeepCopy.deepCopy(obj);
      this.ControlNames.push(deepCopy);
      this.selectedControl = deepCopy;
    },
    addWidth() {
      this.widthStyle = "250";
    },
    removeWidth() {
      this.widthStyle = "0";
    },

    submit() {
      const data = {
        ControlNames: this.ControlNames,
      };
      alert(JSON.stringify(data, null, 2));
    },
    openModal() {
      this.showModal = true;
    },
    getAllData(values) {
      console.log({ values });
    },
  },
};
</script>

<style>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
