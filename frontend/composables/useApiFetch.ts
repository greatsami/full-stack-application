import {UseFetchOptions, useRequestHeaders} from "#app";
import {useLocale} from "~/composables/locale";

export function useApiFetch<T> (path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();
  const locale = useLocale();

  let headers: any = {
    "accept": "application/json",
    "accept-language": locale.value,
    "referer": config.public.appUrl,
  };
  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"])
    }
  }

  return useFetch(config.public.apiUrl + path, {
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  });

}
