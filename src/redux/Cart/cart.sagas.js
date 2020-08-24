import { takeLatest, call, all } from "redux-saga/effects";
import cartTypes from "./cart.types";
import { checkOutUser, getCurrentUser } from "./../../firebase/utils";

export function* checkOut({ payload: order }) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield checkOutUser(order, userAuth.uid);
  } catch (e) {
    console.log(e);
  }
}

export function* onCheckOutStart() {
  yield takeLatest(cartTypes.CHECK_OUT, checkOut);
}

export default function* productsSagas() {
  yield all([call(onCheckOutStart)]);
}
