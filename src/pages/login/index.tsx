import * as Yup from "yup";
import { Button, Card } from "antd";
import Container from "../../components/shared/container";
import FormInput from "../../components/form/form-input";
import { useFormik } from "formik";
import { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const nextUrl = searchParams.get("next");

  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await login(values).unwrap();
        const token = res.data.token;
        dispatch(setUser({ token }));
        toast.success("Login successful");

        if (nextUrl) {
          navigate(`${nextUrl}`);
        } else {
          navigate("/");
        }
      } catch (error: unknown) {
        console.log("error", error);
        // @ts-expect-error: error object might not have data.message
        toast.error(error.data.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container className="py-0 lg:py-0">
      <div className="flex h-svh items-center justify-evenly gap-5 text-base">
        <div className="xs:w-8/12 w-full lg:w-5/12">
          <Card className="w-full shadow-md">
            <p className="pb-3 text-2xl font-semibold">LOGIN</p>
            <form className="space-y-1" onSubmit={formik.handleSubmit}>
              <div className="space-y-2">
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  formik={formik}
                  required
                />

                <FormInput
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  formik={formik}
                  required
                />
              </div>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="mt-2"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}
