import type { ResourcesConfig } from 'aws-amplify';

// 環境変数からCognito設定を取得
const userPoolId = import.meta.env.VITE_USER_POOL_ID as string;
const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID as string;
const region = import.meta.env.VITE_AWS_REGION as string;

// 必須環境変数のチェック
if (!userPoolId || !userPoolClientId || !region) {
  throw new Error(
    '環境変数が設定されていません。.env.example をコピーして .env を作成し、必要な値を設定してください。\n' +
    '必須: VITE_USER_POOL_ID, VITE_USER_POOL_CLIENT_ID, VITE_AWS_REGION'
  );
}

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      loginWith: {
        email: true,
      },
    },
  },
};
