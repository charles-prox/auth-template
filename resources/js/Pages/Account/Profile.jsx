import { ProfileManagementForm } from "@/Components/Forms/ProfileManagementForm";
import { Head } from "@inertiajs/react";
import React from "react";

const Profile = () => {
    return (
        <React.Fragment>
            <Head title="Profile" />
            <div className="flex flex-col">
                <div>
                    <h1 className="text-2xl font-bold">Profile Management</h1>
                    <p>Manage Your Personal Information and Account Settings</p>
                </div>

                <ProfileManagementForm />
            </div>
        </React.Fragment>
    );
};

export default Profile;
