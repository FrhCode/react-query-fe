export default function wait(second: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("OK");
    }, second * 1000);
  });
}
