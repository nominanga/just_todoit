import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {loginActions} from "@/features/auth/loginSlice.ts";

const actions = {
    ...loginActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}