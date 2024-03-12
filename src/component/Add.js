import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {add, edit, getListType} from "./productService";
import {useEffect, useState} from "react";

export function Add() {
    const back = useNavigate();
    const [type, setType] = useState([]);
    useEffect(() => {
        const getProduct = async () => {
            const getListType1 = await getListType();
            setType(getListType1);
        }

        getProduct()
    }, []);
    return (
        <>
            <Formik initialValues={{
                name: "",
                date: "",
                count: 0,
                type: "",
            }} validationSchema={Yup.object({
                name: Yup.string().required("Vui long khong de trong").max(100, "Vui long nhap duoi 100 ki tu"),
                date: Yup.date().required("Vui long khong de trong"),
                count: Yup.number().required("Vui long khong de trong").min(1, "Nhap lon hon 0")
            })}
                    onSubmit={values => {
                        add(values).then(alert("Them thanh cong"),
                            back("/"),
                            console.log(values)
                        )
                    }}>
                <Form className="formInput">
                    <h1>Sua san pham</h1>
                    <p>Nhap ten</p>
                    <Field className="formInputNhap" name='name'/>
                    <br/>
                    <ErrorMessage name='name'/>
                    <p>Nhap ngay</p>
                    <Field className="formInputNhap" name='date' type="date"/>
                    <br/>
                    <ErrorMessage name='date'/>
                    <p>Nhap so luong</p>
                    <Field className="formInputNhap" name='count'/>
                    <br/>
                    <ErrorMessage name='count'/>
                    <p>Nhap loai</p>
                    <Field as="select" name="type" className="formInputNhap">
                        {type.map((t) => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </Field>
                    <br/>
                    <button type={"submit"}>Add</button>
                </Form>
            </Formik>
        </>
    )
}