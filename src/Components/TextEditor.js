import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import React, { useEffect, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { uploadImage } from "../services/api/createApiServices"

export const TextEditor = ({ setDescription }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const htmlContent = draftToHtml(rawContentState)
    setDescription(htmlContent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState])

  const uploadCallback = async (file, callback) => {
    const form_data = new FormData()
    form_data.append("image", file)
    const { data } = await uploadImage(form_data)
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          link: `${data[0].secure_url}`,
        },
      })
    })
  }

  const config = {
    image: {
      uploadCallback: uploadCallback,
      previewImage: true,
      alt: { present: true, mandatory: false },
    },
  }
  return (
    <div>
      <Editor
        toolbar={config}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        defaultContentState={""}
      />
    </div>
  )
}
