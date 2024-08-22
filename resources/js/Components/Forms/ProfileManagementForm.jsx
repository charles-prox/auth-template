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
import Alert from "../Alert";
import { employmentStatus } from "@/utils/constants";
import ModalAlert from "../ModalAlert";

export const ProfileManagementForm = ({
    enableEdit,
    setEnableEdit,
    onSubmit,
}) => {
    const formRef = React.useRef(null);
    const fileInputRef = React.useRef(null);
    const { auth, offices } = usePage().props;
    const [isAlertOpen, setIsAlertOpen] = React.useState(false);
    const [currentPhoto, setCurrentPhoto] = React.useState(null);
    const { data, setData, post, errors, processing, reset } = useForm({
        _method: "PUT", //add this line
        user_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        position: "",
        contact_no: "",
        employment_status: "",
        office_id: "",
        account_status: "",
        photo: null,
    });

    const submit = (event) => {
        event.preventDefault();
        console.log("data: " + JSON.stringify(data));

        post(route("account.profile.update"), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsAlertOpen(true);
            },
            onFinish: () => {
                setEnableEdit(false);
            },
        });
    };

    const selectNewPhoto = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];

            // Check file type
            if (!file.type.startsWith("image/")) {
                console.log("Selected file is not an image.");
                return;
            }

            // Optionally check file size (e.g., limit to 5MB)
            const maxSize = 10 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                console.log("File is too large.");
                return;
            }

            console.log("Selected file:", file);
            setData("photo", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentPhoto(reader.result); // Update state with the image URL
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file selected.");
        }
    };

    React.useEffect(() => {
        if (auth.user) {
            setData({
                user_id: auth.user.user_id || "",
                first_name: auth.user.first_name || "",
                middle_name: auth.user.middle_name || "",
                last_name: auth.user.last_name || "",
                email: auth.user.email || "",
                position: auth.user.position || "",
                contact_no: auth.user.contact_no || "",
                employment_status: auth.user.employment_status || "",
                office_id: auth.user.office_id || "",
                photo: auth.user.profile_photo_path || "",
            });
        }
    }, [auth]);

    React.useEffect(() => {
        if (onSubmit) {
            if (formRef.current) {
                formRef.current.requestSubmit(); // Trigger form submission
            }
        }
    }, [onSubmit]);

    return (
        <React.Fragment>
            <ModalAlert
                isOpen={isAlertOpen}
                setIsAlertOpen={(state) => setIsAlertOpen(state)}
                type={"success"}
                autoClose={true}
            />

            <form ref={formRef} onSubmit={submit}>
                {Object.keys(errors).length !== 0 && (
                    <div>
                        <Spacer y={2} />
                        <Alert
                            type={"error"}
                            title={"Error updating profile information"}
                            message={
                                "We encountered some issues while saving your changes. Please check the highlighted fields for details."
                            }
                            variant={"flat"}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 md:col-span-4">
                            <h2 className="text-md font-bold">
                                User Information
                            </h2>
                            <p className="text-sm mx-w-">
                                Add additional security to your account using
                                two factor authentication.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <Card>
                                <CardBody className="p-0">
                                    <div className="flex flex-col gap-5 p-8">
                                        <div className="flex gap-3">
                                            <Avatar
                                                src={
                                                    currentPhoto ||
                                                    auth.user.profile_photo_url
                                                }
                                                showFallback
                                                name="CC"
                                                className="min-w-36 min-h-36 text-large bg-transparent"
                                            />
                                            {enableEdit && (
                                                <React.Fragment>
                                                    <input
                                                        ref={fileInputRef}
                                                        id="photo"
                                                        name="photo"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                    />
                                                    <Button
                                                        onPress={() =>
                                                            selectNewPhoto()
                                                        }
                                                    >
                                                        Select new photo
                                                    </Button>
                                                </React.Fragment>
                                            )}
                                        </div>
                                        <Input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            label="First Name"
                                            labelPlacement="outside"
                                            value={data.first_name}
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.first_name
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.first_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
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
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.middle_name
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.middle_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "middle_name",
                                                    e.target.value
                                                )
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
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
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.last_name
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.last_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
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
                                Add additional security to your account using
                                two factor authentication.
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
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.email
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.email
                                            }
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
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
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.contact_no
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.contact_no
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "contact_no",
                                                    e.target.value
                                                )
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
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
                                Add additional security to your account using
                                two factor authentication.
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
                                                isInvalid={
                                                    !!errors
                                                        .updateProfileInformation
                                                        ?.office_id
                                                }
                                                errorMessage={
                                                    errors
                                                        .updateProfileInformation
                                                        ?.office_id
                                                }
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
                                            isInvalid={
                                                !!errors
                                                    .updateProfileInformation
                                                    ?.position
                                            }
                                            errorMessage={
                                                errors.updateProfileInformation
                                                    ?.position
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "position",
                                                    e.target.value
                                                )
                                            }
                                            classNames={{
                                                label: "text-black dark:text-white/90 font-bold",
                                                inputWrapper:
                                                    "border-slate-400",
                                                base: "max-w-lg",
                                            }}
                                            variant={enableEdit && "bordered"}
                                            isRequired={enableEdit}
                                            isReadOnly={!enableEdit}
                                        />

                                        {enableEdit ? (
                                            <Autocomplete
                                                name="employment_status"
                                                id="employment_status"
                                                defaultItems={employmentStatus}
                                                selectedKey={data.employment_status?.toString()}
                                                label="Employment Status"
                                                labelPlacement="outside"
                                                placeholder="Current employment status"
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
                                                    setData(
                                                        "employment_status",
                                                        key
                                                    );
                                                }}
                                                onKeyDown={(e) =>
                                                    e.continuePropagation()
                                                } //to stop console error: console.js:213 stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.
                                                isRequired
                                                isInvalid={
                                                    !!errors
                                                        .updateProfileInformation
                                                        ?.employment_status
                                                }
                                                errorMessage={
                                                    errors
                                                        .updateProfileInformation
                                                        ?.employment_status
                                                }
                                            >
                                                {(empstat) => (
                                                    <AutocompleteItem
                                                        key={empstat.value}
                                                    >
                                                        {empstat.label}
                                                    </AutocompleteItem>
                                                )}
                                            </Autocomplete>
                                        ) : (
                                            <Input
                                                type="text"
                                                label="Employment Status"
                                                labelPlacement="outside"
                                                value={toTitleCase(
                                                    data.employment_status
                                                )}
                                                classNames={{
                                                    label: "text-black dark:text-white/90 font-bold",
                                                    inputWrapper:
                                                        "border-slate-400",
                                                    base: "max-w-lg",
                                                }}
                                                isReadOnly
                                            />
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};
