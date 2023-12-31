import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async(req: Request,res:Response) =>{
    const usuarios = await Usuario.findAll();
    res.json({usuarios})
}

export const getUsuario = async(req: Request,res:Response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        res.status(404).json({
            msg: `No existe ese usuario`
        })
    }
    else{
        res.json({usuario})
    }
    
}

export const PostUsuario = async(req: Request,res:Response) =>{
    const {body} = req;

    try{

        const existeEmail = await Usuario.findOne({where:{email:body.email}});
        if(existeEmail){
            return res.status(400).json({
                msg: 'El Email: ' + body.email + ' ya esta en uso'
            });
        }
        const usuario = await Usuario.create(body);


        res.json({
            usuario
        })
    }catch(error){
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const PutUsuario = async(req: Request,res:Response) =>{
    const {id} = req.params;
    const {body} = req;
    try{

        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg: 'No se encontro al usuario'
            });
        }
        if(body.email){
            const existeEmail = await Usuario.findOne({where:{email:body.email}});
            if(existeEmail){
                return res.status(400).json({
                    msg: 'El Email: ' + body.email + ' ya esta en uso'
                });
            }
        }
        await usuario.update(body);
        res.json({
            usuario
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}
export const DeleteUsuario = async(req: Request,res:Response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(400).json({
            msg: 'No se encontro al usuario'
        });
    }

    //Eliminacion fisica
        //await usuario.destroy();
    //eliminacion logica
    await usuario.update({estado:false});
    res.json({
        msg:'getUsuario',
        id
    })
}



