# redux-api-action-creators [![Build Status](https://travis-ci.org/AlanFoster/redux-api-action-creators.svg?branch=master)](https://travis-ci.org/AlanFoster/redux-api-action-creators)
API Action Creators for Redux


### Example

Creating a GET Api Action Creator -

```js
import { createJSONAPIActionCreators } from 'redux-api-action-creators';

const apiActionCreator = createJSONAPIActionCreators({
  getAllBlogs: {
    route: '/blogs',
    method: 'GET',
    success: Actions.GET_BLOGS_SUCCESS,
    pending: Actions.GET_BLOGS_PENDING,
    error: Actions.GET_BLOGS_ERROR
  }
}
```
