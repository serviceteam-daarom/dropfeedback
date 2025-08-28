const throwEnvError = (key: string) => {
  const variable = process.env[key];
  if (!variable) throw new Error(`Missing environment variable: ${key}`);

  return variable;
};

export const config = () => {
  return {
    port: parseInt(process.env.PORT || '8080', 10),
    APP_URL: throwEnvError('APP_URL'),
    WEB_URL: throwEnvError('WEB_URL'),
    DATABASE_URL: throwEnvError('DATABASE_URL'),
    SUPABASE_URL: throwEnvError('SUPABASE_URL'),
    SUPABASE_ANON_KEY: throwEnvError('SUPABASE_ANON_KEY'),
    GOOGLE_EMAIL_OAUTH_CLIENT_SECRET: throwEnvError(
      'GOOGLE_EMAIL_OAUTH_CLIENT_SECRET',
    ),
    GOOGLE_EMAIL_REFRESH_TOKEN: throwEnvError('GOOGLE_EMAIL_REFRESH_TOKEN'),
    GOOGLE_EMAIL: throwEnvError('GOOGLE_EMAIL'),
  } as const;
};
