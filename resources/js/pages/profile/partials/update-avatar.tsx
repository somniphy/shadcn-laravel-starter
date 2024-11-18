import InputError from "@/components/input-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageProps, User } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface UpdateAvatarProps extends PageProps {
    auth: {
        user: User;
    };
    message?: string;
}

export default function UpdateAvatar({ auth, message }: UpdateAvatarProps) {
    const user = usePage().props.auth.user;

    const getAvatarUrl = (avatarPath: string | null) => {
        if (!avatarPath) return null;
        return `/avatars/${avatarPath.replace(/^\//, "")}`;
    };

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{
            avatar: File | string;
        }>({
            avatar: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log("Submitting file:", data.avatar);

        post(route("profile.store"), {
            preserveScroll: true,
            onSuccess: () => console.log("Upload successful"),
            onError: (errors) => console.error("Upload failed:", errors),
        });
    };

    return (
        <section className="w-full">
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-foreground">
                        Avatar
                    </h2>
                </CardHeader>
                <CardContent className="block space-y-4">
                    <Avatar className="w-32 h-32">
                        {auth.user.avatar ? (
                            <AvatarImage
                                src={
                                    getAvatarUrl(auth.user.avatar) || undefined
                                }
                                alt="Avatar"
                            />
                        ) : (
                            <AvatarFallback>No Avatar</AvatarFallback>
                        )}
                 </Avatar>
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                            name="avatar"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData("avatar", file);
                                }
                            }}
                        />
                            <Button type="submit" disabled={processing}>
                                Submit
                            </Button>
                        </div>
                        <InputError className="mt-2" message={errors.avatar} />
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="pt-4 text-sm text-green-500">Saved.</p>
                        </Transition>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
