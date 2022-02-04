import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../Constants/userConstants"

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  })

  const config = {
    headers: {
      "Content-Type": "application.json",
    },
  }
  try {
    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    })
  }
}
