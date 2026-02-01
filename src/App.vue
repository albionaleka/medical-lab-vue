<template>
  <div id="app">
    <component :is="$route.meta.layout ? $route.meta.layout : 'main-layout'">
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </component>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AuthLayout from "./layout/auth.vue";
import MainLayout from "./layout/main.vue";

export default defineComponent({
  name: "App",
  components: {
    auth: AuthLayout,
    "main-layout": MainLayout,
  },
});
</script>
<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
