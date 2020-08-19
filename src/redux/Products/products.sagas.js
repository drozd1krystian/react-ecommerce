import productsTypes from "./products.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { getProducts } from "../../firebase/utils";
import { fetchProductsSuccess } from "./products.actions";

export function* fetchProducts() {
  try {
    const products = yield getProducts();
    console.log(products);
    yield put(fetchProductsSuccess(products));
  } catch (e) {
    console.log(e);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export default function* productsSagas() {
  yield all([call(onFetchProductsStart)]);
}
