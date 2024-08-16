import { Head } from "@inertiajs/react";
import React from "react";

const Profile = () => {
    return (
        <React.Fragment>
            <Head title="Profile" />
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="text-2xl font-bold">Profile Management</h1>
                    <p>Manage Your Personal Information and Account Settings</p>
                </div>
                <div></div>
            </div>
        </React.Fragment>
    );
};

export default Profile;
