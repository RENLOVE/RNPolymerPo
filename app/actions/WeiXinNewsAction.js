/*
 * MIT License
 *
 * Copyright (c) 2016 yanbo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

import * as types from './ActionTypes';
import { 
    APP_KEY_WEIXIN_NEWS,
    URL_WEIXIN_NEWS,
} from  '../common/Constants';
import NetUtils from './../utils/NetUtils';

export function fetchNewsListByPage(start, pageLimit) {
    return dispatch => {
        dispatch({
            type: types.ACTION_WX_NEWS_PRE_FETCH,
            isLoadingMore: true
        });
        NetUtils.get(URL_WEIXIN_NEWS+'?dtype=json&key='+APP_KEY_WEIXIN_NEWS+'&ps='+pageLimit+'&pno='+start)
        .then(function (result) {
            if (result.error_code == 0) {
                dispatch({
                    type: types.ACTION_WX_NEWS_FETCH_OK,
                    newsList: result.result.list,
                    start: start,
                    pageLimit: pageLimit,
                    isLoadingMore: false
                });
            } else {
                dispatch({
                type: types.ACTION_WX_NEWS_FETCH_ERROR,
                isLoadingMore: false
            });
            }
        }, function () {
            dispatch({
                type: types.ACTION_WX_NEWS_FETCH_ERROR,
                isLoadingMore: false
            });
        })
    };
}