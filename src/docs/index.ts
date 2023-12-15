const swaggerDocs = {
  openapi: "3.0.3",
  info: {
    title: "API de Alunos - Growdev",
    description: "Sistema de gerenciamento de alunos e suas avaliações",
    contact: {
      email: "growdev@growdev.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3333",
    },
    {
      url: "http://localhost:8080",
    },
  ],
  paths: {
    "/users": {
      get: {
        tags: ["users"],
        summary: "Listar usuários",
        description: "Essa rota faz a listagem de todos os usuários",
        response: {
          200: {

          },
          401: {

          },
        },
      },
      post: {},
    },
  },
};

export default swaggerDocs;
