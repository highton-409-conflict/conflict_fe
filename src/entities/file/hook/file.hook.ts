import { fileApi } from "@/entities/file/api/file.api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

/** 이미지 업로드 뮤테이션 */
export const useUploadImageMutation = () => {
    return useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData()
            formData.append("image", file)
            return fileApi.uploadImage(formData)
        },
        onSuccess: (_data) => {
            toast.success("이미지 업로드 성공")
        },
        onError: (error) => {
            const status = (error as any).response?.status
            if (status === 400) {
                toast.error("잘못된 파일 형식입니다")
            } else if (status === 401) {
                toast.error("인증이 필요합니다")
            } else if (status === 500) {
                toast.error("서버 오류가 발생했습니다")
            } else {
                toast.error("이미지 업로드에 실패했습니다")
            }
        },
    })
}
