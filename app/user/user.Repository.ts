import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface FetchUserArgs {
  page?: number;
  page_size?: number;

  search?: string;
}

export const FetchUser = async ({
  page = 1,
  page_size = 10,

  search,
}: FetchUserArgs) => {
  const where: Prisma.tbm_userWhereInput = {
    is_deleted: false,

    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const total_data = await prisma.tbm_user.count({ where });
  const total_page = Math.ceil(total_data / page_size);

  const users = await prisma.tbm_user.findMany({
    where,
    take: page_size,
    skip: (page - 1) * page_size,
  });

  return {
    data: users,
    meta: {
      page,
      page_size,
      total_data,
      total_page,
    },
  };
};

export const FetchUserById = async (id: string) => {
  return await prisma.tbm_user.findUnique({
    where: {
      id,
    },
  });
};

export const FetchUserByUsername = async (username: string) => {
  return await prisma.tbm_user.findFirst({
    where: {
      username,
      is_deleted: false,
    },
  });
};

export const FetchUserByEmail = async (email: string) => {
  return await prisma.tbm_user.findFirst({
    where: {
      email,
      is_deleted: false,
    },
  });
};

export const FetchUserByUsernameOREmail = async (uid: string) => {
  return await prisma.tbm_user.findFirst({
    where: {
      OR: [{ email: uid }, { username: uid }],
      is_deleted: false,
    },
  });
};

export const StoreUser = async (data: any) => {
  return await prisma.tbm_user.create({
    data,
  });
};
