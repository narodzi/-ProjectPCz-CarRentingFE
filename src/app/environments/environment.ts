
export const environment = {
  production: false,
  baseHref: "",
  defaultLang: "en",
  supportedLang: ["en", "pl"],
  authDebug: true,
  brand: {
    name: "renting",
    logoImage: "logo-main.svg",
  },

  apiUrl: "/",
  keyCloakConstructParams: {
    url: "http://localhost:8080/",
    realm: "CarRenting",
    clientId: "car-renting",
    "ssl-required": "external",
    "public-client": true,
    "auth-server-url": "http://localhost:8080/",
    "confidential-port": 0,
    resource: "car-renting",
    logoutUrl: "http://localhost:4200" ,
    redirect_uri:
      "http://localhost:4200",
  },
  keyCloakInitParams: {
    onLoad: "login-required",
    checkLoginIframe: false,
    promiseType: "native",
  },
  authConfig: {
    authRequired: true,
    authHttp: true,
    tokenValidUntilTime: 60,
    tokenAutoRefresh: true,
  },
};

