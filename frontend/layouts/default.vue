<script lang="ts" setup>
import {useAuthStore} from "~/stores/useAuthStore";

const auth = useAuthStore()
</script>

<template>
  <div>
    <Header/>

    <section class="py-10 bg-gray-100">
      <div class="mx-auto max-w-6xl p-6">
        <slot/>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
