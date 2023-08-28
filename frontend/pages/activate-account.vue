<script setup lang="ts">
import {navigateTo} from "#app";
import {definePageMeta} from "#imports";
import {useAuthStore} from "~/stores/useAuthStore";

const auth = useAuthStore();

definePageMeta({
  middleware: ["auth"]
})
if (auth.user.email_verified_at != null) {
  navigateTo('/');
}

const MessageStatus = ref(false);
async function handleSendVerificationEmail() {
  const response = await auth.sendVerificationEmail();
  MessageStatus.value = response.value?.status == 'verification-link-sent';
}
</script>

<template>
  <div>
    <h3>Activate your account</h3>

    <p>Please check your email to activate your account.</p>

    <p>If you didn't receive activation email, <button @click="handleSendVerificationEmail" class="font-semibold underline">click here</button> to resend the activation email.</p>

    <p class="pt-6" v-if="MessageStatus">
      Email sent successfully to your email.
    </p>
  </div>
</template>

<style scoped>

</style>