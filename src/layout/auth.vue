<template>
  <div
    class="min-h-screen w-full bg-gray-100 flex items-center justify-center p-8"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthLayout",
});
</script>
