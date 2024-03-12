import axios from "axios";

// export async function getList() {
//     const result = await axios.get("http://localhost:8080/api");
//     return result.data;
// }
export async function getList1(id) {
    const result = await axios.get(`http://localhost:8080/api/${id}`);
    return result.data;
}

export async function add(product) {
    await axios.post("http://localhost:8080/api/add", product);
}

export async function getListType() {
    const result = await axios.get("http://localhost:8080/type");
    return result.data;
}

export async function edit(product) {
    await axios.put("http://localhost:8080/api/edit/" + product.id, product);
}

export async function findById(id) {
    const result = await axios.get(`http://localhost:8080/api/find/${id}`);
    return result.data;
}

export async function deleteProduct(id) {
    await axios.delete(`http://localhost:8080/api/delete/${id}`)
}

export async function searchProductByTypeAndName(name, type) {
    const result = await axios.get(`http://localhost:8080/api/search/` + name + "/" + type);
    return result.data;
}


