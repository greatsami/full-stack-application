<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";
import {navigateTo} from "#app";
import {definePageMeta} from "#imports";
import {useAuthStore} from "~/stores/useAuthStore";

const auth = useAuthStore();

definePageMeta({
  middleware: ["auth"]
})
if (auth.user?.email_verified_at != null) {
  navigateTo('/');
}

const route = useRoute()
const text = `${route.query.verifyLink}`;
const result = text.replace("http://localhost:8000", '')

const {status, pending} = await useApiFetch(`${result}`);

if (status.value == 'success') {
  navigateTo("/account");
}

</script>

<template>
  <div v-if="pending">
    Loading...
  </div>
  <div v-if="status.value == 'success'">
    Your account is activated successfully
  </div>
</template>
