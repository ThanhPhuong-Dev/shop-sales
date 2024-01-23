function formatNumberWithK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
}

export default formatNumberWithK;
