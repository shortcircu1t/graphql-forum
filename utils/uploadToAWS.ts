export default (url: string, type: string, body: any) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": type,
      // "Access-Control-Allow-Origin": "http://localhost:4000",
      // "Access-Control-Allow-Csredentials": "true",
    },
    body,
  });
