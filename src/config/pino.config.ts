export const PinoDefaultConfig = {
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
    },
    level: 'debug',
    autoLogging: false,
    redact: {
      paths: ['req', 'context'],
      remove: true,
    },
  },
};
