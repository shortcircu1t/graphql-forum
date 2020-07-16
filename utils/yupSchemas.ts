import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short")
    .max(128, "Too Long.")
    .required("Required."),
  body: Yup.string()
    .min(50, "Too Short.")
    .max(12800, "Too Long.")
    .required("Required."),
  headerImgUrl: Yup.string().url().max(1000),
  categoryId: Yup.string().required("Required."),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required."),
  password: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required."),
  password: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required."),
  username: Yup.string().min(5).max(20).required("Required."),
});

export const CommentSchema = Yup.object().shape({
  comment: Yup.string().min(5).max(120).required("Required."),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required."),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required."),
});

export const FileSchema = Yup.object().shape({
  filename: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
  filetype: Yup.string().max(10, "Too Long.").required("Required."),
});

export const UsernameSchema = Yup.object().shape({
  username: Yup.string().min(5).max(20).required("Required."),
});

export const NewPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
  newPassword: Yup.string()
    .min(5, "Too Short.")
    .max(128, "Too Long.")
    .required("Required."),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required."),
});
