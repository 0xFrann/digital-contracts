import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useLoadingPage = (): [boolean] => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string): void => url !== router.asPath && setLoading(true);
    const handleComplete = (): void => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return [loading];
};

export default useLoadingPage;
