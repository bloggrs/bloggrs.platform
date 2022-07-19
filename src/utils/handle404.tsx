/* eslint-disable */ 
import React from "react";
import { useHistory } from "react-router-dom";

const Handle404 = () => {
    const history: any = useHistory();
    const { search } = history;
    const queryParams =  React.useMemo(() => new URLSearchParams(search), [search]);
    queryParams.set("e", "404")
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${queryParams.toString()}`
    window.history.pushState({ path: newUrl }, '', newUrl);
    return <></>
}

export const set404 = () => {
    const { search } = window.location;
    if (search.indexOf("e=404") === -1) window.location.search = "?e=404"
}
export default Handle404;