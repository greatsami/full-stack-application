import {useAuthStore} from "~/stores/useAuthStore";
import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();

    // console.log(auth.user.email_verified_at);
    if (!auth.isLoggedIn) {
        return navigateTo("/login", { replace: true});
    }
    if (auth.user?.email_verified_at == null) {
        return navigateTo("/activate-account", { replace: true});
    }
})
