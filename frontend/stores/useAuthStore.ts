import {defineStore} from "pinia";
import {useApiFetch} from "~/composables/useApiFetch";
import {computed} from "#imports";
import {navigateTo} from "#app";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
type Credentials = {
    email: string;
    password: string;
}
type ForgotPasswordData = {
    email: string;
}
type RegistrationData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
type ResetPasswordData = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => !!user.value);

    async function fetchUser() {
        if (!isLoggedIn) return;
        const { data, error } = await useApiFetch("/api/user");
        if (!error.value) {
            user.value = data.value as User;
        }

    }

    async function register(registrationData: RegistrationData) {
        await useApiFetch("/sanctum/csrf-cookie");
        const {status, data, error} = await useApiFetch("/register", {
            method: "POST",
            body: registrationData,
        });
        if (status.value !== 'error') {
            await fetchUser();
            return data;
        }
        return error;
    }

    async function login(credentials: Credentials) {
        await useApiFetch("/sanctum/csrf-cookie");
        const {status, data, error} = await useApiFetch("/login", {
            method: "POST",
            body: credentials,
        });
        if (status.value !== 'error') {
            await fetchUser();
            return data;
        }
        return error;
    }

    async function forgotPassword(forgotPasswordData: ForgotPasswordData) {
        await useApiFetch("/sanctum/csrf-cookie");
        const {status, data, error} = await useApiFetch("/forgot-password", {
            method: "POST",
            body: forgotPasswordData,
        });
        if (status.value !== 'error') {
            await fetchUser();
            return data;
        }
        return error;
    }

    async function logout() {
        await useApiFetch("/logout", {method: "POST"});
        user.value = null;
        navigateTo("/");
    }

    async function sendVerificationEmail() {
        await useApiFetch("/sanctum/csrf-cookie");
        const {status, data, error} = await useApiFetch("/email/verification-notification", {method: "POST"});
        if (status.value !== 'error') {
            return data;
        }
        return error;
    }

    async function passwordReset(resetPasswordData: ResetPasswordData) {
        await useApiFetch("/sanctum/csrf-cookie");
        const {status, data, error} = await useApiFetch("/reset-password", {
            method: "POST",
            body: resetPasswordData,
        });
        if (status.value !== 'error') {
            await fetchUser();
            return data;
        }
        return error;
    }

    return {
        user,
        login,
        register,
        sendVerificationEmail,
        forgotPassword,
        passwordReset,
        isLoggedIn,
        fetchUser,
        logout
    }
})