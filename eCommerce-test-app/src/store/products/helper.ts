export const onInsertAD = (products: any) => {
  const totalProducts = products.length;
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  const ADS = {
    date: new Date(),
    face:
      'Here youre sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices. But first, a word from our sponsors',
    id: 'ads',
    price: 0,
    size: 10,
  };

  const isEvenRandomNumber = randomNumber % 2 === 0;

  const filterAdsProducts = products.filter((item: any) => {
    return item.id !== ADS.id;
  });

  if (totalProducts > 20 && isEvenRandomNumber) {
    return [...filterAdsProducts, ADS];
  } else {
    return filterAdsProducts;
  }
};
