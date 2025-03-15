async function imageUrlToBase64(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${blob.type};base64,${base64}`;
}

export { imageUrlToBase64 };
