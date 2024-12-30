"use client";
import React, { useEffect } from "react";
import { fetchUsers } from "../lib/actions/userActions";
import Comp1 from "./comp1";
import { counter, heelo } from "@lib/config/axios";

function page() {
    const fetchData = async () => {
        const users = await fetchUsers();
        console.log("fetching from page 2");
        console.log(users);
        return users;
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            This is page 2
            <button onClick={() => counter.increment()}>increment</button>
            {counter.getCount()}
            <br />
            {/* {heelo.getDate().getMilliseconds()} */}
            <br />
            {heelo.getMilliseconds()}
            <Comp1 />
        </div>
    );
}

export default page;
