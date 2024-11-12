import InputError from "@/components/input-error";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-medium text-foreground">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </CardHeader>

            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" onClick={confirmUserDeletion}>
                            Delete Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={deleteUser}>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete your
                                    account?
                                </DialogTitle>
                                <DialogDescription>
                                    Once your account is deleted, all of its
                                    resources and data will be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </DialogDescription>
                                <div className="mt-2">
                                    <Label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full"
                                        placeholder="Password"
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                            </DialogHeader>
                            <DialogFooter>
                                <div className="mt-6 flex justify-end">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>

                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="ms-3"
                                        disabled={processing}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
