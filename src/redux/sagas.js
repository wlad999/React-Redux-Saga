import {takeEvery, put, call} from "@redux-saga/core/effects";
import {FETCH_POST, REQUEST_POSTS} from "./types";
import {hideLoader, showAlert, showLoader} from "./actions";

export function* sagaWatcher() {
    yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
    try {
        yield put(showLoader())
        const payload = yield call(fetchPosts)
        yield put({type: FETCH_POST, payload})
        yield put(hideLoader())
    } catch (e) {
        yield put(showAlert("Something wrong"))
        yield put(hideLoader())
    }

}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return await response.json()
}