const KEY_OBJECT_LIST: string[] = [];
const KEY_ARRAY_KEY: string[] = [];

const KEY_PATH_PUBLIC_LIST: string[] = ["photo", "filepath"];
const KEY_DELETE_LIST: string[] = ["password", "is_deleted"];

const GetSignedUrl = async (key: string) => {
  if (!key) return key;
  //   return `${ENV.AWS_BUCKET_URL}/${key}`;
  return `http://localhost:3000/${key}`;
};

const HandleResponseData = (params: { [key: string]: any }) => {
  if (!params) return params;

  const data = { ...params };

  for (const key of Object.keys(params)) {
    if (KEY_OBJECT_LIST.includes(key) && params[key]) {
      if (typeof params[key] == "string") continue;
      if (params[key] == undefined) continue;
      if (params[key] == null) continue;

      data[key] = HandleResponseData(params[key]);
    }

    if (KEY_ARRAY_KEY.includes(key) && params[key]) {
      data[key] = params[key].map((item: any) => HandleResponseData(item));
    }

    if (KEY_PATH_PUBLIC_LIST.includes(key) && params[key]) {
      data[key] = GetSignedUrl(params[key]);
    }

    if (KEY_DELETE_LIST.includes(key)) {
      delete data[key];
    }
  }

  return data;
};

export const ResponseData = (params: object[] | object) => {
  if (Array.isArray(params)) {
    if (typeof params[0] === "string") return params;

    return params.map((item: any) => HandleResponseData(item));
  }

  return HandleResponseData(params);
};
