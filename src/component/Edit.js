import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {edit, findById, getListType} from "./productService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import *  as Yup from 'yup';
import {date} from "yup";

export function Edit() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const back = useNavigate();
    const [type, setType] = useState([]);
    const date =  new Date();
    useEffect(() => {
        const getProduct = async () => {
            const findProductById = await findById(id);
            setProduct(findProductById);
            const getListType1 = await getListType();
            setType(getListType1);
        }
        getProduct()
    }, [id]);
    console.log(product)
    return (
        <>
            {product !== null &&
                <Formik initialValues={{
                    id: id,
                    name: product.name,
                    date: product.date,
                    count: product.count,
                    type: product.type
                }} validationSchema={Yup.object({
                    name: Yup.string().required("Vui long khong de trong").max(100, "Vui long nhap duoi 100 ki tu"),
                    date: Yup.date().required("Vui long khong de trong").max(date),
                    count: Yup.number().required("Vui long khong de trong").min(1, "Nhap lon hon 0")
                })}
                        onSubmit={values => {
                            edit(values).then(alert("sua thanh cong"),
                                back("/")
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
                        {/*<Field name='type' className="formInputNhap" />*/}
                        {/*<Field name='type' className="formInputNhap" />*/}
                        <Field as="select" name="type" className="formInputNhap">
                            {type.map((t) => (
                                <option value={t.name}>{t.name}</option>
                            ))}
                        </Field>
                        <br/>
                        <button type={"submit"}>Sua</button>
                    </Form>
                </Formik>}
        </>
    )
}