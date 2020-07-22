export default () => {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...rest) {
      (window as any).dataLayer.push(rest);
    }
    gtag("js", new Date());

    gtag("config", "UA-173273228-2");
  }
};
