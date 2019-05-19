# Cretella ascii faces eCommerce

- please check the `instruction.md`

#### To run the API

1. go to root folder
2. run command in terminal `npm start`
3. Products API documentation
   - The basic query looks like this: `/api/products`
   - The response format is JSON.
   - To paginate results use the `_page` parameter, eg: `/api/products?_page=10&_limit=15` (returns 15 results starting from the 10th page).
   - To sort results use the `_sort` parameter, eg: `/api/products?_sort=price`. Valid sort values are `price`, `size` and `id`.

#### To run the Frontend

1. Go to `rootFolder/eCommerce-test-app`.
2. run command in terminal `npm start`
3. Please read the frontend readme.
