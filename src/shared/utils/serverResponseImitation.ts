const serverResponseImitation = async (responseTimer: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, responseTimer);
  });
};

export default serverResponseImitation;
