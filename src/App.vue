<template>
  <HomeLayout />
</template>

<script>
import HomeLayout from "./components/Layout.vue";

export default {
  name: "App",
  components: {
    HomeLayout,
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
.grid {
  display: grid;
  /* grid-column-gap: 20px; */
  align-items: center;
  border: 1px solid;
}
.grid-1 {
  grid-template-columns: 1fr;
}
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}
.grid > div.outerGrid:not(:last-child) {
  border-bottom: 1px solid;
}
.inside {
  border: 1px solid;
}
.merged-grid {
  display: flex;
  justify-content: space-between;
}
.merged-grid > div:first-child {
  width: 100%;
}
.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
</style>
