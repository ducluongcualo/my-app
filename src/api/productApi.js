// api/productApi.js
import axiosClient from "./axiosClient";
const productApi = {

    // lấy ra tất cả giá trị
    getAll: (params) => {
        const url = `/users?page=1`;
        return axiosClient.get(url, { params });
    },
    get: (page) => {
        const url = `/users?page=${page}`;
        return (
            axiosClient.get(url)

        );
    },

    // xóa một giá trị
    delete: (id) => {
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    },
    // chỉnh sửa dữ liệu
    put: (id, data) => {
        const url = `/users/${id}`;
        return (
            axiosClient.put(url, data));
    },
    // thêm một giá trị
    // 
    post: (data) => {
        const url = '/users';
        return axiosClient.post(url, data);
    },

    // search
    search: (name) => {
        const url = `/users?name=${name}`;
        return (
            axiosClient.get(url)

        );
    }
}


export default productApi;