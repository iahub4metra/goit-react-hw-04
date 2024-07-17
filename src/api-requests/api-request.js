import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchImages = async (nameOnRequest, npage, nlimit) => {
    const responce = await axios.get('search/photos/', {
        params: {
            client_id: "KJt-FM9JROgPKAbfC_GoPhwJkx8P9SUrh5LmAclfNRo",
            query: nameOnRequest,
            page: npage,
            per_page: nlimit,
            orientation: "landscape",
        }
    })
    return responce.data
}