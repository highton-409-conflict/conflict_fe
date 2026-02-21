/** 이미지 업로드 요청 타입 */
export interface ImageUploadReq {
    image: File
}

/** 이미지 업로드 응답 타입 */
export interface ImageUploadRes {
    url: string
}
