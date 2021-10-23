import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Box} from "@mui/material";
import {CloudDownload} from "@mui/icons-material";

function Dropzone(props) {

  const {setImg} = props

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        setImg({file: file, binaryStr: binaryStr})
      }
      reader.readAsDataURL(file)
    })

  }, [setImg])

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
    <Box sx={{ p: 2, border: '1px dashed grey', minHeight: '132px' }}>
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} name={"dropzone"}/>
        {isDragAccept && (<p>All files will be accepted</p>)}
        {isDragReject && (<p>Some files will be rejected</p>)}
        {!isDragActive && (
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <p>Click to choose avatar, or just drop image here...</p>
            <CloudDownload/>
          </Box>
        )}
      </div>
    </Box>
  )
}

export default Dropzone;
