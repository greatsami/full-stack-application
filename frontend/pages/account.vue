<script lang="ts" setup>
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ["auth"]
})
</script>

<template>
  <div>
    <p>Account</p>
  </div>
</template>

<style scoped></style>
