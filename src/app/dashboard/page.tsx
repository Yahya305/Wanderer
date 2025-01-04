import Link from "next/link";
import React from "react";

async function DashboardPage() {
    return (
        <div>
            <Link href="/plan-a-trip">Plan A trip</Link>
        </div>
    );
}

export default DashboardPage;
