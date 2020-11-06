import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useRef, useState } from "react"
import Layout from "../components/Layout"
import Lolly from "../components/Lolly"
import LollyColorBox from "../components/LollyColorBox"
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { navigate } from "gatsby"

const createLollyMutation = gql`
    mutation createLolly($name: String!, $email: String!, $phone: String!, $address: String!, $quantity: Int!, $price: Int!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
        createLolly(name: $name, email: $email, phone: $phone, address: $address, quantity: $quantity, price: $price, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
            path
        }
    }
`

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    email: Yup.string().email()
        .required('Required'),
    phone: Yup.number()
        .required('Required'),
    address: Yup.string()
      .required('Required'),
    quantity: Yup.number()
        .required('Required'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: '20px 0',
      color: 'white',
      display: 'block'
    }
  }),
);

export default function CreateNew() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    const classes = useStyles();
    const [createLolly] = useMutation(createLollyMutation);

  return (
    <Layout>

            <p>Customize and Order your Favourite Popsticle Sticks</p>
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
                </div>
                <LollyColorBox
                    color1={color1}
                    color2={color2}
                    color3={color3}
                    setColor1={setColor1}
                    setColor2={setColor2}
                    setColor3={setColor3}
                />
                <div>
                    <Formik 
                        initialValues={ {
                            name: "",
                            email: "",
                            phone: "",
                            address: "",
                            quantity: 1
                        }} 
                        validationSchema={formSchema}
                        onSubmit = { async (values, {resetForm}) => {
                            const result = await createLolly({
                                variables : {
                                    name: values.name,
                                    email: values.email,
                                    phone: values.phone,
                                    address: values.address,
                                    quantity: values.quantity,
                                    price: values.quantity * 10,
                                    flavourTop: color1,
                                    flavourMiddle: color2,
                                    flavourBottom: color3
                                }
                            })
                            resetForm({values: {
                                    name: "",
                                    email: "",
                                    phone: "",
                                    address: "",
                                    quantity: 1
                                }
                            });
                            navigate(`/invoices/${result.data.createLolly.path}`);
                        }}
                    >
                        {
                            (formik) => (
                                <Form onSubmit={formik.handleSubmit}>
                                    <div>
                                    <Field type="text" as={TextField} classes={{root: classes.textField}} variant="outlined" label="Name" name="name" id="name"/>
                                        <ErrorMessage name="name" render={(msg)=>(
                                            <span style={{color:"coral",display: 'block',width: '100px'}}>{msg}</span>
                                        )} />
                                    </div>
                                    <div>
                                    <Field type="email" as={TextField} classes={{root: classes.textField}} variant="outlined" label="Email" name="email" id="email"/>
                                        <ErrorMessage name="email" render={(msg)=>(
                                            <span style={{color:"coral",display: 'block',width: '100px'}}>{msg}</span>
                                        )} />
                                    </div>
                                    <div>
                                    <Field type="text" as={TextField} classes={{root: classes.textField}} variant="outlined" label="Phone" name="phone" id="phone"/>
                                        <ErrorMessage name="phone" render={(msg)=>(
                                            <span style={{color:"coral",display: 'block',width: '100px'}}>{msg}</span>
                                        )} />
                                    </div>
                                    <div>
                                    <Field type="text" as={TextField} multiline rows={3} variant="outlined" classes={{root: classes.textField}} label="Address" name="address" id="address"/>
                                        <ErrorMessage name="address" render={(msg)=>(
                                            <span style={{color:"coral",display: 'block',width: '100px'}}>{msg}</span>
                                        )} />
                                    </div>

                                    <div>
                                    <Field type="number" as={TextField} classes={{root: classes.textField}} variant="outlined" label="Quantity" name="quantity" id="quantity"/>
                                        <ErrorMessage name="quantity" render={(msg)=>(
                                            <span style={{color:"coral",display: 'block',width: '100px'}}>{msg}</span>
                                        )} />
                                    </div>
                                    <div>
                                        <button type="submit" className="button_order">Order Now</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
    </Layout>
  );
}