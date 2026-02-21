import type { ImageUploadRes } from "@/entities/file/api/file.api.type"
import { ApiHelper, API_PATH } from "@/shared/api"

/** 파일 API */
export const fileApi = {
    /**
     * @description 이미지 업로드 API
     * @param {FormData} formData - 이미지 파일이 포함된 FormData
     */
    uploadImage: async (formData: FormData): Promise<ImageUploadRes> => {
        return ApiHelper.post<ImageUploadRes>(API_PATH.FILE.IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },
}
