import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {loginActions} from "@/features/auth/loginSlice.ts";
import {todoListActions} from "@/features/todoTable/todoListSlice.ts";

const actions = {
    ...loginActions,
    ...todoListActions,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}