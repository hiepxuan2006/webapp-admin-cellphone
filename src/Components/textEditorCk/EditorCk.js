import React from "react"
import Editor from "ckeditor5-custom-build/build/ckeditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { uploadImage } from "../../services/api/createApiServices"
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document"
export const EditorCk = ({ setData, content = "" }) => {
  function uploadAdapter(loader) {
    return {
      upload: async () => {
        try {
          const file = await loader.file
          const dataForm = new FormData()
          dataForm.append("image", file)
          const { data } = await uploadImage(dataForm)
          return {
            default: data[0].secure_url,
          }
        } catch (error) {
          throw new Error("Upload failed")
        }
      },
    }
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }

  return (
    <>
      <CKEditor
        editor={Editor}
        config={{
          // @ts-ignore
          extraPlugins: [uploadPlugin],
        }}
        data={content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setData(data)
        }}
      />
    </>
  )
}
