import { TwoFactorAuthForm } from "@/Components/Forms/TwoFactorAuthForm";
import { UpdatePasswordForm } from "@/Components/Forms/UpdatePasswordForm";
import { Head } from "@inertiajs/react";
import { Spacer } from "@nextui-org/react";
import React from "react";

const Security = () => {
    return (
        <>
            <Head title="Security" />
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="text-2xl font-bold">Account Security</h1>
                    <p>
                        Keep your account safe by managing your security
                        preferences here.
                    </p>
                </div>
                <Spacer y={1} />
                <UpdatePasswordForm />
                <TwoFactorAuthForm />
            </div>
        </>
    );
};

export default Security;
