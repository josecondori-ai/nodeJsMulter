// const express =require('express')
// const multer =require('multer')
// const { dirname } = require('path')
// const { fileURLToPath,URL } = require('url')

import express from 'express';
import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const port=3900
const direcActual=dirname(fileURLToPath(import.meta.url))
const tiposArchivos=['image/jpeg','image/png']
console.log(direcActual)

const multerSubir=multer({
    storage:multer.diskStorage({
        destination:join(direcActual,'../uploads') ,
        filename:(req,file,cb)=>{
            const fileExtension=extname(file.originalname)
            const fileName=file.originalname.split(fileExtension)[0]
            cb(null,`${fileName}-${Date.now()}${fileExtension}`)
                      //pepe20231004.png

            //pepe.jpg
            //fsdfsdf45sdf45sf.jpg
            //pepe.jpg

            //image/jpeg video/mp4 file/pdf
        }
                //c:imagenes/vaciones/uploads
    }),
    fileFilter:(req,file,cb)=>{
            if(tiposArchivos.includes(file.mimetype)) cb(null,true)
            else cb(new Error(`solo se aceptan archivos del tipo ${tiposArchivos} en el formulario`))
            
    },
    limits:{
        
        fileSize:10*1024*1024
    }
})

const appExpress =express()

appExpress.post('/upload',multerSubir.single('file'),(req,res)=>{
    console.log(req.file)
    res.sendStatus(200)
})

appExpress.use('/public',express.static(join(direcActual,'../uploads')))

appExpress.listen(port,()=>{
    console.log('servidor ejecutandose')
})