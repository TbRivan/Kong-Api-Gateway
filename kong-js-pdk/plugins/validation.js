class ValidationPlugin {
  constructor(config) {
    this.config = config;
  }

  async access(kong) {
    const accessToken = await kong.request.getHeader("Authorization");

    if (!accessToken) {
      return await kong.response.exit(200, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const response = await kong.get.http("/user/api/");

    if (response.status > 300) {
      return await kong.response.exit(200, {
        statusCode: 401,
        message: "Unauthorized",
      });
    } else {
      await kong.response.setHeader("Valid", "true");
    }
  }
}

module.exports = {
  Plugin: ValidationPlugin,
  Schema: [],
  Version: "0.1.0",
  Priority: 0,
};
