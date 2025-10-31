import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerDocument: SwaggerOptions = {
  openapi: '3.0.0',
  info: {
    title: 'Goomer Menu API',
    description: 'API to manage products, promotions and digital menu',
    version: '1.0.0',
    contact: {
      name: 'Flávia dos Reis',
      url: 'https://github.com/Flareis',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Development',
    },
    {
      url: 'http://${process.env.DATABASE_HOST}:3000/api',
      description: 'Docker Development',
    },
  ],
  paths: {
    '/menu': {
      get: {
        tags: ['Menu'],
        summary: 'Returns visible products with active promotions',
        responses: {
          '200': {
            description: 'List of products with promotions',
            content: {
              'application/json': {
                example: [
                  {
                    id: 1,
                    name: 'X-Burger',
                    price: 25.9,
                    category: 'Lanches',
                    promotion: {
                      description: 'Promoção de segunda!',
                      price: 19.9,
                      week_days: 'mon',
                      start_time: '10:00',
                      end_time: '22:00',
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
    '/products': {
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'price', 'category'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'X-Burger',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    example: 25.9,
                  },
                  category: {
                    type: 'string',
                    description: 'Product category (e.g., Lanches, Bebidas, Sobremesas)',
                    example: 'Lanches',
                  },
                  visibility: {
                    type: 'boolean',
                    default: true,
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Product created successfully',
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
      get: {
        tags: ['Products'],
        summary: 'List all products',
        responses: {
          '200': {
            description: 'List of products',
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Find product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Product found',
          },
          '404': {
            description: 'Product not found',
          },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update a product',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'X-Burger',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    example: 25.9,
                  },
                  category: {
                    type: 'string',
                    description: 'Product category (e.g., Lanches, Bebidas, Sobremesas)',
                    example: 'Lanches',
                  },
                  visibility: {
                    type: 'boolean',
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Product updated',
          },
          '404': {
            description: 'Product not found',
          },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Product deleted',
          },
          '404': {
            description: 'Product not found',
          },
        },
      },
    },
    '/promotions': {
      post: {
        tags: ['Promotions'],
        summary: 'Create a new promotion',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'product_id',
                  'description_promotion',
                  'price',
                  'week_days',
                  'start_time',
                  'end_time',
                ],
                properties: {
                  product_id: {
                    type: 'integer',
                    example: 1,
                  },
                  description_promotion: {
                    type: 'string',
                    example: 'Happy Hour - Double Beer',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    example: 19.9,
                  },
                  week_days: {
                    type: 'string',
                    description: 'Days of the week when promotion is active (comma separated)',
                    example: 'thu,fri,sat,sun',
                  },
                  start_time: {
                    type: 'string',
                    pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
                    example: '18:00',
                  },
                  end_time: {
                    type: 'string',
                    pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
                    example: '20:00',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Promotion created successfully',
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
      get: {
        tags: ['Promotions'],
        summary: 'List all promotions',
        responses: {
          '200': {
            description: 'List of promotions',
          },
        },
      },
    },
    '/promotions/activePromotions': {
      get: {
        tags: ['Promotions'],
        summary: 'List currently active promotions',
        responses: {
          '200': {
            description: 'List of active promotions',
          },
        },
      },
    },
    '/promotions/{id}': {
      get: {
        tags: ['Promotions'],
        summary: 'Find promotion by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Promotion found',
          },
          '404': {
            description: 'Promotion not found',
          },
        },
      },
      put: {
        tags: ['Promotions'],
        summary: 'Update a promotion',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  product_id: {
                    type: 'integer',
                    example: 1,
                  },
                  description_promotion: {
                    type: 'string',
                    example: 'Happy Hour - Double Beer',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    example: 25.9,
                  },
                  week_days: {
                    type: 'string',
                    description: 'Days of the week when promotion is active (comma separated)',
                    example: 'thu,fri,sat,sun',
                  },
                  start_time: {
                    type: 'string',
                    pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
                    example: '18:00',
                  },
                  end_time: {
                    type: 'string',
                    pattern: '^([01]\\d|2[0-3]):[0-5]\\d$',
                    example: '20:00',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Promotion updated',
          },
          '404': {
            description: 'Promotion not found',
          },
        },
      },
      delete: {
        tags: ['Promotions'],
        summary: 'Delete a promotion',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Promotion deleted',
          },
          '404': {
            description: 'Promotion not found',
          },
        },
      },
    },
  },
};
