import { Request, Response } from "express";
import Usuario from "../models/usuarios";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  return res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }
  return res.json(usuario);
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el email ${body.email}`,
      });
    }

    const usuario = await Usuario.create(body);
    return res.json(usuario);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor, contacte al administrador.",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    if (body.email) {
      const existeEmail = await Usuario.findOne({
        where: {
          email: body.email,
        },
      });

      if (existeEmail) {
        return res.status(400).json({
          msg: `Ya existe un usuario con el email ${body.email}`,
        });
      }
    }

    await usuario.update(body);

    return res.json(usuario);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor, contacte al administrador.",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    // Eliminación física
    // await usuario.destroy();

    // Eliminación lógica
    await usuario.update({
      estado: false, // esto lo convierte automaticamente en 0
    });

    return res.json(usuario);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor, contacte al administrador.",
    });
  }
};
