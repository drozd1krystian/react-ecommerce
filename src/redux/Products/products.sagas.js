import productsTypes from "./products.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { getProducts } from "../../firebase/utils";
import { fetchProductsSuccess, sortProducts } from "./products.actions";

export function* fetchProducts({ payload: filters }) {
  try {
    const data = yield getProducts(filters);
    yield put(fetchProductsSuccess(data));
    yield put(sortProducts({ field: "", direction: filters.sort.direction }));
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
