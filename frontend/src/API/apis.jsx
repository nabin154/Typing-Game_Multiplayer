import axiosInstance from "../utils/axiosInstance"


export const signUp = async (data) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', data);
       return response;
    } catch (error) {
        throw error;
    }
}
export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', data);
       return response;
    } catch (error) {
        throw error;
    }
}


export const uploadCloudinary = async (pics) => {
    if (!pics) {
        return ;
    }

    if (!pics.type.startsWith("image/")) {
        return ;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "portfolio");
    data.append("cloud_name", "dumxmt7sm");

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dumxmt7sm/image/upload", {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const responseData = await response.json();
        return responseData.url;
    } catch (error) {
        console.error(error);
        return Promise.reject(error.message);
    }
};
