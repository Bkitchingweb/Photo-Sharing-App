import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { supabase } from '@/utils/supabase';

import TextInputLiveFeedback from './TextInputLiveFeedback'
import { doesUsernameExist } from '../api/doesUsernameExist'

interface Values {
  fullname: string,
  username: string;
  email: string;
  password: string;
}


const schema = Yup.object().shape({

  fullname: Yup.string()
  .min(1, 'Too Short!')
  .max(70, 'Too Long!')
  .required('Required'),

  username: Yup.string()
    .test('checkDuplUsername', 'same name exists', async function (value) {
      if (!value) {
        const usernameExists = await doesUsernameExist(value);
      return !usernameExists;
      }
      return true;
    })
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Cannot contain special characters or spaces'
    )
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

  password: Yup.string()
    .min(6, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),

});

const RegisterForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          fullname: '',
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={schema}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            
            const { user, session, error } = await supabase.auth.signUp({
              email: values.email,
              password: values.password,
            })

            await supabase
              .from('profiles')
              .insert([
                { id: user.id, username: values.username, fullname: values.fullname },
            ])

          } catch(error) {
            console.log(error);
          }
        }}
      >
        <Form className="flex flex-col">
          <TextInputLiveFeedback
            label="Full Name"
            id="fullname"
            name="fullname"
            type="text"
          />

          <TextInputLiveFeedback
            label="Username"
            id="username"
            name="username"
            helpText="Must be 5-20 characters and cannot contain special characters or spaces."
            type="text"
          />

          <TextInputLiveFeedback
            label="Email"
            id="email"
            name="email"
            type="email"
          />

          <TextInputLiveFeedback
            label="Password"
            id="password"
            name="password"
            type="password"
          />

          <button type="submit" className="mt-8 p-4 rounded-md bg-black text-white">Submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default RegisterForm