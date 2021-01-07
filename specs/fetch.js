import { api } from "@/services.js";
import axios from "axios";

export const fetchProdutos = async () => {
    const {
        data: { results: movies},
    } = await api.get("/produtos")
        // .then(r => {
        //     console.log('foi', r.data)
        //     return r.data;
        // })
        // .catch(function (error) {
        //     console.log('request failed', error)
        // })
};

export const fetchProduto = async (id) => {
    const {
        data: { results: movies},
    } = await api.get(`/produtos/${id}`)
};
     