import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


function Dropzone() {


  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents

        const binaryStr = reader.result
        let img = new Image()
        img.src = binaryStr;

      }
      reader.readAsDataURL(file)
    })

  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    onDrop
  })

  return (
    <div className="container">
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} name={"dropzone"} />
        {isDragAccept && (<p>All files will be accepted</p>)}
        {isDragReject && (<p>Some files will be rejected</p>)}
        {!isDragActive && (<p>Drop some files here ...</p>)}
      </div>
    </div>
  )
}

export default Dropzone;
