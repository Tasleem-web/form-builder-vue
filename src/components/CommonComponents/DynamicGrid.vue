// https://youtu.be/-kZLD40d-tI
<template>
  <pre>section - {{ this.sections }}</pre>

  <a-form
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
  >
    <div class="grid">
      <div class="outerGrid" v-for="(section, index) in sections" :key="index">
        <section class="merged-grid">
          <div
            class="grid"
            :style="{
              gridTemplateColumns: `repeat(${section?.additional.length}, 1fr)`,
            }"
          >
            <template
              v-for="(addition, additionIndex) in section?.additional"
              :key="additionIndex"
            >
              <a-form-item>
                <a-select
                  :style="{ width: `100%` }"
                  v-model:value="section.additional[additionIndex].name"
                  placeholder="Select Column"
                  :options="controlOptions"
                ></a-select>
              </a-form-item>
            </template>
          </div>

          <div class="inside">
            <a-form-item
              :label-col="{ span: 24 }"
              label="Select Column"
              :name="`sections[${index}]`"
              :rules="[{ required: true, message: 'Please Select Column' }]"
            >
              <a-select
                v-model:value="section.columnSize"
                placeholder="Select Column"
                :options="options"
                :name="`section[${index}][columnSize]`"
                @change="addNewItem($event, index, section.columnSize)"
              ></a-select>
            </a-form-item>
            <template v-if="section.additional.length > 1">
              <a-form-item :name="`sections[${index}]`">
                <a-button type="primary" @click="openModal(section, index)"
                  >Merge Column</a-button
                >
              </a-form-item>
            </template>
            <teleport to="#portal-modal">
              <template v-if="showModal">
                <PortalModal
                  :visibleModal="showModal"
                  @close="showModal = false"
                  :modalWidth="50"
                >
                  <CollapsedColumn
                    :selectedColSize="mergedCount"
                    @mergeRangeCol="getMergeColValue"
                  />
                </PortalModal>
              </template>
            </teleport>
          </div>
        </section>
      </div>
    </div>
  </a-form>

  <a-button type="primary" @click="addNewSection">New Deal Section</a-button>

  <!-- <div id="app" class="container">
    <form>
      <div class="work-experiences">
        <div
          class="form-row"
          v-for="(experience, index) in outerGrid"
          :key="index"
        >
          <div class="form-group col-md-6">
            <label>Company</label>
            <input
              v-model="experience.company"
              :name="`outerGrid[${index}][company]`"
              type="text"
              class="form-control"
              placeholder="Company"
            />
          </div>
          <div class="form-group col-md-6">
            <label>Title</label>
            <input
              v-model="experience.title"
              :name="`outerGrid[${index}][title]`"
              type="text"
              class="form-control"
              placeholder="Title"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <button @click="addExperience" type="button" class="btn btn-secondary">
          Add experience
        </button>
      </div>

      <hr />

      <div class="form-group">
        <button @click="submit" type="button" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  </div> -->
</template>

<script>
import { ref } from "vue";
import CollapsedColumn from "./CollapsedColumn.vue";
import PortalModal from "./Portal.vue";

export default {
  name: "DynamicGrid",
  components: { CollapsedColumn, PortalModal },
  data() {
    return {
      sections: [
        {
          item: 1,
          additional: [
            {
              name: "",
              controlName: "",
            },
          ],
          from: null,
          to: null,
          columnSize: 1,
        },
      ],
      showModal: false,
      countSection: 1,
      mergedCount: 1,
    };
  },
  methods: {
    addNewSection() {
      this.sections.push({
        item: ++this.countSection,
        additional: [],
      });
    },
    addNewItem(event, id, selectedColSize) {
      this.sections[id].additional = [];
      for (let index = 0; index < event; index++) {
        this.sections[id].additional.push({
          item: index,
        });
        this.sections[id].columnSize = selectedColSize;
      }
    },
    openModal(section, additionIndex) {
      let index = ++additionIndex;
      let currentObj = this.sections.find((item) => +item.item === index);
      this.mergedCount = currentObj;
      this.showModal = true;
    },
    getMergeColValue(value) {
      if (value.from && value.to) {
        let updateSections = this.sections.find(
          (item) => item.item == value.item
        );
        let getIndexFromSections = --updateSections.item;
        this.sections[getIndexFromSections].from = value.from;
        this.sections[getIndexFromSections].to = value.to;
        console.log(this.sections);

        // console.log("this.sections", this.sections[--value.item]);
        this.sections[getIndexFromSections].additional.splice(
          1,
          value.to - value.from
        );
      }
    },
  },
  watch: {
    sections: {
      handler(newValue) {
        console.log({ newValue });
      },
      deep: true,
    },
  },
  setup() {
    const options = ref([
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ]);

    const controlOptions = ref([{ value: "textbox", label: "Text Box" }]);
    return {
      columnSize: ref(1),
      options,
      controlOptions,
    };
  },
};
</script>

<style>
.work-experiences > div {
  margin: 20px 0;
  padding-bottom: 10px;
}
.work-experiences > div:not(:last-child) {
  border-bottom: 1px solid rgb(206, 212, 218);
}
</style>
