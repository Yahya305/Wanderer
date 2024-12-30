"use client";
import React, { useEffect } from "react";
import { fetchUsers } from "../lib/actions/userActions";
import Inputer from "./Inputer";
import Displayer from "./Displayer";
import { counter, heelo } from "@lib/config/axios";

function page() {
    const fetchData = async () => {
        const users = await fetchUsers();
        console.log("fetching from page 1");
        console.log(users);
        return users;
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            this is page 1
            <button onClick={() => counter.increment()}>increment</button>
            {counter.getCount()}
            <br />
            {/* {heelo.getDate().getMilliseconds()} */}
            <br />
            {heelo.getMilliseconds()}
            <Inputer />
            <Displayer />
        </div>
    );
}

export default page;
