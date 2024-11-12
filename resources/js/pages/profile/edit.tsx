import { PageProps } from "@/types";
// import DeleteUserForm from "./partials/delete-user-form";
import UpdatePasswordForm from "@/pages/profile/partials/update-password";
import UpdateProfileInformationForm from "@/pages/profile/partials/update-profile";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import DeleteUserForm from "./partials/delete-user";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout header={{ title: "Profile" }}>
            <Head title="Profile" />
            <div className="py-6">
                <div className="max-w-7xl space-y-6 sm:px-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <UpdatePasswordForm />
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
