import {useEffect, useState} from "react";
import {
    deleteProduct,
    getList1,
    getListType, searchProductByTypeAndName
} from "./productService";
import {Link} from "react-router-dom";
import './cssFile.css';
import {Field, Form, Formik} from "formik";

export function Home() {
    const [products, setProduct] = useState([]);
    const [type, setType] = useState([]);
    const [modal, setModal] = useState(false);
    const [productDelete, setProductDelete] = useState({});
    const [page, setPage] = useState(0);
    const [showButton, setShowButtton] = useState(0)
    useEffect(() => {
        const getListProduct = async () => {
            const listProduct = await getList1(page);
            setProduct(listProduct);

            if (page === 0) {
                setShowButtton(1);
            }else {
                setShowButtton(3)
            }
            getList1(page + 3).then((list1) => {
                if (list1.length === 0) {
                    setShowButtton(2);
                }
            })
        }
        getListProduct()
        console.log(page
        )
    }, [modal, page]);
    console.log(products);
    return (
        <>
            <table id="customers">
                <tr>
                    <td>Tim kiem bang ten va loai san pham</td>
                    <td>
                        <Formik initialValues={{
                            name: "",
                            type: ""
                        }
                        } onSubmit={(values) => {
                            const result = searchProductByTypeAndName(values.name, values.type);
                            {
                                const b = async () => {
                                    await setProduct(await result)
                                }
                                b()
                            }
                        }}>
                            <Form className="formInput">
                                <p>Ten san pham</p>
                                <Field className="formInputNhap" name='name'/>
                                <p> Loai san pham
                                </p>
                                <Field as="select" name="type" className="formInputNhap">
                                    {type.map((t) => (
                                        <option value={t.name}>{t.name}</option>
                                    ))}
                                </Field>
                                <button className='button' type={"submit"}>Tim</button>
                            </Form>
                        </Formik>
                    </td>
                </tr>
            </table>
            <h1>Danh sach san pham</h1>
            {products.length !== 0 && <table id="customers">
                <tr>
                    <td>ID</td>
                    <td>Ten san pham</td>
                    <td>Ngay nhap</td>
                    <td>So luong</td>
                    <td>Loai san pham</td>
                    <td>Hanh dong</td>
                </tr>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.date}</td>
                        <td>{p.count}</td>
                        <td>{p.type}</td>
                        <td>
                            <Link className="button" to={`edit/${p.id}`}>Edit</Link>
                            <button className="button" onClick={() => {
                                setModal(true);
                                setProductDelete(p);
                            }}>Xoá
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
            }
            {products.length === 0 &&
                <p>Khong tim thay san pham</p>
            }

            {showButton === 1 && (
                <button className="active" onClick={() => setPage(page + 3)}>Next</button>
            )}
            {showButton === 2 && (
                <button className="active" onClick={() => setPage(page - 3)}>Back</button>
            )}
            {showButton === 3 && (
                <button className="active" onClick={() => setPage(page - 3)}>Back</button>
            )}
            {showButton === 3 && (
                <button  className="active" onClick={() => setPage(page + 3)}>Next</button>
            )}
            {modal &&
                <div>
                    <div className="custom-modal">
                        <p>Bạn có muốn xoá sản phẩm có tên là {productDelete.name} không ?</p>
                        <button className="button" onClick={() => {
                            setModal(false);
                            deleteProduct(productDelete.id);
                            alert("Xoa thanh cong san pham " + productDelete.name)
                        }}>Co
                        </button>
                        <button className="button" onClick={() => {
                            setModal(false)
                        }}>
                            Không
                        </button>
                    </div>
                </div>
            }
        </>
    )
}