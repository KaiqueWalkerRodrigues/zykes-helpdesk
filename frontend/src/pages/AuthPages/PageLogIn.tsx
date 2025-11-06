import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import LogInForm from "../../components/auth/LogInForm";

export default function LogIn() {
  return (
    <>
      <PageMeta title="Zykes | Login" description="" />
      <AuthLayout>
        <LogInForm />
      </AuthLayout>
    </>
  );
}
