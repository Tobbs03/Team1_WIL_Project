import axios from "axios";
// const BaseUrl = "https://socialapi.kushubmedia.com";
// export const BaseUrl = "http://137.184.199.153:8082";
export const BaseUrl = "https://socialapis.kushubmedia.com";

const APICall = async (endpoint, method, data, headers) => {
  const options = {
    method: method,
    url: endpoint,
    data: data ? data : {},
    headers: headers ? headers : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    const response = {
      success: false,
      message: err.message,
    };
    return response;
  }
};
export async function GetCauseAPI() {
  return await APICall(BaseUrl + "/getCause", "GET", {}, {});
}

export async function CreateCauseAPI(data, token) {
  return await APICall(BaseUrl + "/createCause", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}

export async function DeleteCauseAPI(id, token) {
  return await APICall(
    BaseUrl + "/deleteCause" + "/" + id,
    "DELETE",
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
}

export async function UpdateCauseAPI(id, data, token) {
  return await APICall(BaseUrl + "/updateCause" + "/" + id, "PUT", data, {
    Authorization: `Bearer ${token}`,
  });
}

// export async function GetCausesForUserAPI() {
//   return await APICall(BaseUrl + "/getCauseForUser", "GET", {}, {});
// }

export async function GetCategoryAPI() {
  return await APICall(BaseUrl + "/getCategory", "GET", {}, {});
}

export async function UserRegisterAPI(data) {
  return await APICall(BaseUrl + "/createUser", "POST", data, {});
}

export async function UserLoginAPI(data) {
  return await APICall(BaseUrl + "/loginUser", "POST", data, {});
}

export async function UpdateUserAPI(data, token) {
  return await APICall(BaseUrl + "/updateUser", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}
export async function GetUserAPI(token) {
  return await APICall(
    BaseUrl + "/getUser",
    "GET",
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
}

export async function CreateContactAPI(data, token) {
  return await APICall(BaseUrl + "/createContact", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}

// Admin
export async function GetContactAPI(token) {
  return await APICall(
    BaseUrl + "/getContact",
    "Get",
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
}
export async function GetDonationAPI(id, token) {
  let newId = id || null;

  return await APICall(
    BaseUrl + "/getDonation/" + newId,
    "GET",
    {},
    { Authorization: `Bearer ${token}` }
  );
}

export async function CreateDonationAPI(data, token) {
  return await APICall(BaseUrl + "/createDonation", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}
export async function GetAlignwithAPI(token) {
  return await APICall(
    BaseUrl + "/getAlignwith",
    "GET",
    {},
    { Authorization: `Bearer ${token}` }
  );
}

export async function CreateAlingnwithAPI(data, token) {
  return await APICall(BaseUrl + "/createAlignwith", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}
export async function CreateCategoryAPI(data, token) {
  return await APICall(BaseUrl + "/createCategory", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}

export async function CreateBusinessAPI(data, token) {
  return await APICall(BaseUrl + "/createBusiness", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}
export async function GetBusinessAPI() {
  return await APICall(BaseUrl + "/getBusiness", "GET", {}, {});
}

export async function GetPromotionAPI(token) {
  return await APICall(
    BaseUrl + "/getPromotion",
    "GET",
    {},
    { Authorization: `Bearer ${token}` }
  );
}
export async function CreatePromotionAPI(data, token) {
  return await APICall(BaseUrl + "/createPromotion", "POST", data, {
    Authorization: `Bearer ${token}`,
  });
}

export async function DeletePromotion(id, token) {
  // console.log(BaseUrl + "/deletePromotion" + "/", id);
  // console.log("<br>", token);
  return await APICall(
    BaseUrl + "/deletePromotion" + "/" + id,
    "DELETE",
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
}
