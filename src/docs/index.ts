const swaggerDocs = {
  openapi: "3.0.3",
  info: {
    title: "API de Alunos - Growdev",
    description: "Sistema de gerenciamento de alunos e suas avaliações.",
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
  tags: [
    {
      name: "Usuários",
      description: "Usuários da aplicação",
    },
    {
      name: "Avaliações",
      description: "Avaliações dos usuários cadastrados na aplicação",
    },
  ],
  paths: {
    "/users": {
      get: {
        tags: ["Usuários"],
        summary: "Listar usuários",
        description:
          "Essa rota faz a listagem de todos os usuários da aplicação.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      summary: "Indica se a requisição deu certo ou não",
                      example: true,
                    },
                    message: {
                      type: "string",
                      summary: "Mensagem amigável para mostrar ao usuário",
                      example: "Listagem de usuários",
                    },
                    data: {
                      type: "array",
                      summary: "Lista de usuários cadastrados.",
                      items: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
      post: {
        tags: ["Usuários"],
        summary: "Cadastro de usuários",
        description: "Essa rota faz o cadastro de usuários da aplicação.",
        requestBody: {
          description: "Cadastro de um novo usuário da aplicação.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RequestUser",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      summary: "Indica se a requisição deu certo ou não",
                      example: true,
                    },
                    message: {
                      type: "string",
                      summary: "Mensagem amigável para mostrar ao usuário",
                      example: "Usuário criado com sucesso.",
                    },
                    data: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          400: {
            description: "Requisição Inválida",
          },
          404: {
            description: "Não Encontrado",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RequestUser: {
        type: "object",
        properties: {
          login: {
            type: "string",
            example: "joao",
          },
          password: {
            type: "string",
            example: "senha123",
          },
          type: {
            type: "string",
            description: "Tipo de usuário.",
            example: "F",
            enum: ["T", "F", "M"],
          },
        },
        required: ["login", "password", "type"],
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "fcf14690-9e08-407b-911c-12354409b9d7",
          },
          login: {
            type: "string",
            example: "joao",
          },
          password: {
            type: "string",
            example: "senha123",
          },
          type: {
            type: "string",
            description: "Tipo de usuário.",
            example: "F",
            enum: ["T", "F", "M"],
          },
          enable: {
            type: "boolean",
            example: true,
          },
        },
        required: ["login", "password", "type", "enable"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: {
    bearerAuth: [],
  },
};

export default swaggerDocs;
