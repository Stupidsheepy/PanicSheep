async function sleep(delay: number = 2000) {
  // Use the globalDelay for waiting
  await new Promise(resolve => setTimeout(resolve, delay));

  // Perform the sheep action after waiting
  console.log('Sheep action complete!');
}
export { sleep };
