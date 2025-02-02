import * as Yup from "yup";
import { Button, Input, Spin } from "antd";
import Title from "../../components/shared/title";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import Label from "../../components/shared/label";
import { useFormik } from "formik";
import FormInput from "../../components/form/form-input";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

export default function Profile() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const { data, isLoading } = useGetProfileQuery({});
  const user = data?.data;

  const [changePassword, { isLoading: isChangingPasswordLoading }] =
    useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword(values).unwrap();
        formik.resetForm();
        toast.success("Password changed successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to change password");
      }
    },
  });

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-5xl space-y-3 sm:rounded-md sm:bg-white sm:p-6 sm:shadow lg:p-8">
        <Title title={"Profile"} />

        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className={"py-1"}>
            Name
          </Label>
          <Input placeholder="Name" value={user?.name} readOnly />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className={"py-1"}>
              Email
            </Label>
            <Input placeholder="Email" value={user?.email} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="role" className={"py-1"}>
              Role
            </Label>
            <Input placeholder="Role" value={user?.role} readOnly />
          </div>
        </div>

        <div className="py-5">
          <hr className="h-[1px] border-0 bg-gray-300" />
        </div>

        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <Label className="py-1">Change Password</Label>
          <p className="pb-3 text-xs text-gray-500">
            Update your password to keep your account secure.
          </p>

          <div className="grid grid-cols-1 gap-2 pb-3 sm:grid-cols-2 sm:gap-4">
            <FormInput
              label="Current Password"
              name="oldPassword"
              formik={formik}
              placeholder="Enter your current password"
              type="password"
              required
            />
            <FormInput
              label="New Password"
              name="newPassword"
              formik={formik}
              placeholder="Enter your new password"
              type="password"
              required
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isChangingPasswordLoading}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Spin>
  );
}
