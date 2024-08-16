import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { PasswordVisibilityButton } from "../PasswordVisibilityButton";
import { useTheme } from "@/ThemeProvider";

export const ConfirmPassword = ({
    isOpen,
    onClose,
    title,
    content,
    onSuccess,
}) => {
    const defaults = {
        title: title || "Confirm Password",
        content:
            content ||
            "For your security, please confirm your password to continue.",
    };
    const [isVisible, setIsVisible] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [processing, setProcessing] = React.useState(false);
    const { theme } = useTheme();

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios
            .post(route("password.confirm"), {
                password: password,
            })
            .then((response) => {
                setProcessing(false);
                setPassword("");
                onSuccess(true);
                onClose();
            })
            .catch((error) => {
                setProcessing(false);
                setError(error.response?.data.message);
            });
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                placement={"top"}
                className={`${theme} text-foreground`}
            >
                <ModalContent>
                    <form onSubmit={submit}>
                        <ModalHeader className="flex flex-col gap-1">
                            {defaults.title}
                        </ModalHeader>
                        <ModalBody>
                            <p>{defaults.content}</p>
                            <Input
                                type={isVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                isInvalid={!!error}
                                errorMessage={error}
                                onChange={(e) => setPassword(e.target.value)}
                                classNames={{
                                    label: "text-black dark:text-white/90 font-bold",
                                    inputWrapper: "border-slate-400",
                                }}
                                endContent={
                                    <PasswordVisibilityButton
                                        handleState={(state) =>
                                            setIsVisible(state)
                                        }
                                    />
                                }
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                isLoading={processing}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
};
