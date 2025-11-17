import {type JSX} from "react";

const WebError = ({children}: {children: JSX.Element | string}) => {
    return (
        <div className="h-full p-5">
            <h1 className="text-red-900 font-bold text-3xl text-center">
                {children}
            </h1>
        </div>
    );
};

export default WebError;