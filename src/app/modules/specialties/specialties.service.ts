import { Request } from "express";
import { Specialties, prisma } from "../../database";
import { IFile } from "../../interfaces/file.interface";
import { fileUploader } from "../../utils/fileUploader";

const inserIntoDB = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};

const deleteFromDB = async (id: string): Promise<Specialties> => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SpecialtiesServices = {
  inserIntoDB,
  getAllFromDB,
  deleteFromDB,
};
