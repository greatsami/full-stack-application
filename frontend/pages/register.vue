<script lang="ts" setup>
import {useAuthStore} from "~/stores/useAuthStore";
import {navigateTo} from "#app";
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ["guest"]
})

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const auth = useAuthStore();
const errorsList = ref([]);

async function handleRegister() {
  if (auth.isLoggedIn) {
    navigateTo("/");
  }
  const response = await auth.register(form.value);
  const obj = response.value;

  if (typeof obj !== 'undefined'){
    errorsList.value = obj?.data.errors;
    return;
  }
  navigateTo("/");
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Your name</label>
          <div class="mt-2">
            <input id="name" v-model="form.name" type="text"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <span class="text-sm text-red-900" v-if="errorsList.name">{{ errorsList.name[0] }}</span>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="form.email" type="email"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <span class="text-sm text-red-900" v-if="errorsList.email">{{ errorsList.email[0] }}</span>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" v-model="form.password" type="password"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <span class="text-sm text-red-900" v-if="errorsList.password">{{ errorsList.password[0] }}</span>
          </div>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div class="mt-2">
            <input id="password_confirmation" v-model="form.password_confirmation" type="password"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            <span class="text-sm text-red-900" v-if="errorsList.password_confirmation">{{ errorsList.password_confirmation[0] }}</span>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have an account?
        {{ ' ' }}
        <NuxtLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login to your account</NuxtLink>
      </p>
    </div>
  </div>
</template>

