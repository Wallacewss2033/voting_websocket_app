<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="src/utils/images/logo.png" />
        </q-avatar>
        <q-toolbar-title> Voting </q-toolbar-title>
        <q-toggle dark v-model="isDark" @change="dark" color="dark" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      isDark: true,
      q: useQuasar(),
    };
  },
  computed: {
    dark() {
      this.q.dark.toggle();
      return this.isDark;
    },
  },
});
</script>
<style scoped>
.toggle {
  color: rgb(76, 76, 240);
}
</style>
