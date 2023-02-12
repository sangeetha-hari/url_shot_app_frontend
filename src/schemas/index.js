import  * as yup from 'yup';

export const sigupSchema=yup.object({
    name:yup.string().min(3,"Name must be minimun of 3 character").max(30).required("Please Enter name:"),
    email:yup.string().email("Enter the correct email"),
    strseg:yup.string(),
    newpassword:yup.string(5).required("Enter Password"),
    confirmpassword:yup.string().required.oneOf([yup.ref("newpassword"),null],"Password must match")
})