<script setup>
import {Dialog, DialogPanel, PopoverGroup} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
import {useAuthStore} from "~/stores/useAuthStore";

const mobileMenuOpen = ref(false)
const auth = useAuthStore()

async function handleLogout() {
  await auth.logout();
}
</script>

<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <NuxtLink to="/" class="text-sm font-semibold leading-6 text-gray-900">Home</NuxtLink>
        <NuxtLink to="/features" class="text-sm font-semibold leading-6 text-gray-900">Features</NuxtLink>
        <NuxtLink to="/marketplace" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</NuxtLink>
        <NuxtLink to="/contact" class="text-sm font-semibold leading-6 text-gray-900">Contact</NuxtLink>
      </PopoverGroup>
      <div v-if="auth.isLoggedIn" class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink to="/account" class="text-sm font-semibold leading-6 text-gray-900 px-4">Account </NuxtLink>
        <button @click="handleLogout" class="text-sm font-semibold leading-6 text-gray-900 px-4">Logout </button>
      </div>
      <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink to="/register" class="text-sm font-semibold leading-6 text-gray-900 px-4">Register </NuxtLink>
        <NuxtLink to="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></NuxtLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink to="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</NuxtLink>
              <NuxtLink to="/features" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</NuxtLink>
              <NuxtLink to="/marketplace" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</NuxtLink>
              <NuxtLink to="/contact" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact</NuxtLink>
            </div>
            <div v-if="auth.isLoggedIn" class="py-6">
              <NuxtLink to="/account" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Account</NuxtLink>
              <button @click="handleLogout" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Logout</button>
            </div>
            <div v-else class="py-6">
              <NuxtLink to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</NuxtLink>
              <NuxtLink to="/register" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Register</NuxtLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
