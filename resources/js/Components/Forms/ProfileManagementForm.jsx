import React from "react";
import {
    Card,
    CardBody,
    Input,
    Avatar,
    Button,
    Divider,
    Autocomplete,
    AutocompleteItem,
    Spacer,
} from "@nextui-org/react";
import { useForm, usePage } from "@inertiajs/react";
import { toTitleCase } from "@/utils/helpers";

export const ProfileManagementForm = () => {
    const { auth, offices } = usePage().props;
    const [enableEdit, setEnableEdit] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        hris: "",
        user_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        position: "",
        contact_no: "",
        pro_code: "",
        employment_status: "",
        office_id: "",
        account_status: "",
        profile_photo_path: "",
    });

    React.useEffect(() => {
        if (auth.user) {
            setData({
                hris: auth.user.hris || "",
                user_id: auth.user.user_id || "",
                first_name: auth.user.first_name || "",
                middle_name: auth.user.middle_name || "",
                last_name: auth.user.last_name || "",
                email: auth.user.email || "",
                position: auth.user.position || "",
                contact_no: auth.user.contact_no || "",
                pro_code: auth.user.pro_code || "",
                employment_status: auth.user.employment_status || "",
                office_id: auth.user.office_id || "",
                profile_photo_path: auth.user.profile_photo_path || "",
            });
        }
    }, [auth]);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { replace: true });
    };

    return (
        <form onSubmit={submit}>
            <div className="text-right">
                {enableEdit ? (
                    <Button
                        color="primary"
                        onPress={() => setEnableEdit(false)}
                    >
                        Save Changes
                    </Button>
                ) : (
                    <Button color="primary" onPress={() => setEnableEdit(true)}>
                        Edit Profile
                    </Button>
                )}
            </div>

            <Spacer y={10} />

            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-md font-bold">User Information</h2>
                        <p className="text-sm mx-w-">
                            Add additional security to your account using two
                            factor authentication.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <Card>
                            <CardBody className="p-0">
                                <div className="flex flex-col gap-5 p-8">
                                    <div className="flex flex-col gap-2">
                                        <Avatar
                                            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                                            className="w-36 h-36 text-large"
                                        />
                                        <Button
                                            className={`max-w-36 ${
                                                !enableEdit && "hidden"
                                            }`}
                                            variant="bordered"
                                            color="default"
                                            size="sm"
                                        >
                                            Update Photo
                                        </Button>
                                    </div>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        label="First Name"
                                        labelPlacement="outside"
                                        value={data.first_name}
                                        isInvalid={!!errors?.first_name}
                                        errorMessage={errors?.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />

                                    <Input
                                        type="text"
                                        name="middle_name"
                                        id="middle_name"
                                        label="Middle Name"
                                        labelPlacement="outside"
                                        value={data.middle_name}
                                        isInvalid={!!errors?.middle_name}
                                        errorMessage={errors?.middle_name}
                                        onChange={(e) =>
                                            setData(
                                                "middle_name",
                                                e.target.value
                                            )
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />

                                    <Input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        label="Last Name"
                                        labelPlacement="outside"
                                        value={data.last_name}
                                        isInvalid={!!errors?.last_name}
                                        errorMessage={errors?.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <Divider />
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-md font-bold">
                            Contact Information
                        </h2>
                        <p className="text-sm mx-w-">
                            Add additional security to your account using two
                            factor authentication.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <Card>
                            <CardBody className="p-0">
                                <div className="flex flex-col gap-5 p-8">
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        label="Email"
                                        labelPlacement="outside"
                                        value={data.email}
                                        isInvalid={!!errors?.email}
                                        errorMessage={errors?.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />

                                    <Input
                                        type="text"
                                        name="contact_no"
                                        id="contact_no"
                                        label="Mobile Number"
                                        labelPlacement="outside"
                                        value={data.contact_no}
                                        isInvalid={!!errors?.contact_no}
                                        errorMessage={errors?.contact_no}
                                        onChange={(e) =>
                                            setData(
                                                "contact_no",
                                                e.target.value
                                            )
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <Divider />
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-md font-bold">
                            Employment Details
                        </h2>
                        <p className="text-sm mx-w-">
                            Add additional security to your account using two
                            factor authentication.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <Card>
                            <CardBody className="p-0">
                                <div className="flex flex-col gap-5 p-8">
                                    {!enableEdit ? (
                                        <Input
                                            type="text"
                                            name="office_id"
                                            id="office_id"
                                            label="Office"
                                            labelPlacement="outside"
                                            value={
                                                offices.find(
                                                    (office) =>
                                                        office.id ===
                                                        data.office_id
                                                )?.name
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
                                                base: "max-w-lg",
                                            }}
                                            isReadOnly={!enableEdit}
                                        />
                                    ) : (
                                        <Autocomplete
                                            name="office_id"
                                            id="office_id"
                                            defaultItems={offices}
                                            selectedKey={data.office_id.toString()}
                                            label="Office"
                                            placeholder="Enter your office department/section/office"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            inputProps={{
                                                classNames: {
                                                    label: "text-black dark:text-white/90 font-bold",
                                                    inputWrapper:
                                                        "border-slate-400",
                                                    base: "max-w-lg",
                                                },
                                            }}
                                            isClearable={false}
                                            className="min-w-64"
                                            menuTrigger="input"
                                            onSelectionChange={(key) => {
                                                setData("office_id", key);
                                            }}
                                            onKeyDown={(e) =>
                                                e.continuePropagation()
                                            } //to stop console error: console.js:213 stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.
                                            isRequired={enableEdit}
                                            isInvalid={!!errors.office_id}
                                            errorMessage={errors.office_id}
                                            isReadOnly={!enableEdit}
                                        >
                                            {(office) => (
                                                <AutocompleteItem
                                                    key={office.id}
                                                >
                                                    {office.name}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    )}

                                    <Input
                                        type="text"
                                        name="position"
                                        id="position"
                                        label="Position"
                                        labelPlacement="outside"
                                        value={data.position}
                                        isInvalid={!!errors?.position}
                                        errorMessage={errors?.position}
                                        onChange={(e) =>
                                            setData("position", e.target.value)
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />

                                    <Input
                                        type="text"
                                        name="employment_status"
                                        id="employment_status"
                                        label="Employment Status"
                                        labelPlacement="outside"
                                        value={toTitleCase(
                                            data.employment_status
                                        )}
                                        isInvalid={!!errors?.employment_status}
                                        errorMessage={errors?.employment_status}
                                        onChange={(e) =>
                                            setData(
                                                "employment_status",
                                                e.target.value
                                            )
                                        }
                                        classNames={{
                                            label: "text-black dark:text-white/90 font-bold",
                                            inputWrapper: "border-slate-400",
                                            base: "max-w-lg",
                                        }}
                                        variant={enableEdit && "bordered"}
                                        isRequired={enableEdit}
                                        isReadOnly={!enableEdit}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </form>
    );
};
