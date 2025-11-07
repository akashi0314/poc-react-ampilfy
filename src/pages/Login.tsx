import { Authenticator, ThemeProvider, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { I18n } from 'aws-amplify/utils';

// 日本語翻訳の設定
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

// カスタム日本語翻訳の追加
I18n.putVocabularies({
  ja: {
    'Sign In': 'サインイン',
    'Sign Up': '新規登録',
    'Sign Out': 'サインアウト',
    'Sign in to your account': 'アカウントにサインイン',
    'Username': 'ユーザー名',
    'Password': 'パスワード',
    'Email': 'メールアドレス',
    'Phone Number': '電話番号',
    'Confirm Password': 'パスワード（確認）',
    'Code': '確認コード',
    'New Password': '新しいパスワード',
    'Forgot your password?': 'パスワードをお忘れですか？',
    'Reset Password': 'パスワードリセット',
    'Send Code': 'コードを送信',
    'Back to Sign In': 'サインインに戻る',
    'Submit': '送信',
    'Confirm': '確認',
    'Resend Code': 'コードを再送信',
    'Create Account': 'アカウントを作成',
    'Creating Account': 'アカウント作成中',
    'Signing in': 'サインイン中',
    'Confirm Sign Up': 'サインアップを確認',
    'Incorrect username or password.': 'ユーザー名またはパスワードが正しくありません。',
    'User does not exist.': 'ユーザーが存在しません。',
    'User already exists': 'このユーザーは既に存在します。',
    'Invalid verification code provided, please try again.': '確認コードが無効です。もう一度お試しください。',
    'Invalid password format': 'パスワードの形式が無効です',
    'Account recovery requires verified contact information': 'アカウント復旧には確認済みの連絡先情報が必要です',
    'We Emailed You': 'メールを送信しました',
    'Your code is on the way. To log in, enter the code we emailed to': 'ログインするには、次のアドレスに送信されたコードを入力してください：',
    'It may take a minute to arrive.': '到着まで1分ほどかかる場合があります。',
    'We Texted You': 'SMSを送信しました',
    'Your code is on the way. To log in, enter the code we texted to': 'ログインするには、次の番号に送信されたコードを入力してください：',
    'Enter your Email': 'メールアドレスを入力',
    'Enter your Password': 'パスワードを入力',
    'Please confirm your Password': 'パスワードを確認してください',
    'Enter your code': '確認コードを入力',
  },
});

// カスタムテーマの定義
const customTheme = {
  name: 'modern-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f9ff',
          20: '#e0f2fe',
          40: '#7dd3fc',
          60: '#0ea5e9',
          80: '#0284c7',
          90: '#0c4a6e',
          100: '#082f49',
        },
      },
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: '0',
          backgroundColor: 'transparent',
        },
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.60}',
          _hover: {
            backgroundColor: '{colors.brand.primary.80}',
          },
          _active: {
            backgroundColor: '{colors.brand.primary.90}',
          },
          borderRadius: '12px',
        },
      },
      fieldcontrol: {
        borderRadius: '12px',
        borderColor: '#e2e8f0',
        _focus: {
          borderColor: '{colors.brand.primary.60}',
          boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
        },
      },
      tabs: {
        item: {
          color: '#64748b',
          _active: {
            color: '{colors.brand.primary.60}',
            borderColor: '{colors.brand.primary.60}',
          },
          _hover: {
            color: '{colors.brand.primary.80}',
          },
        },
      },
    },
  },
};

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 'max(16px, 4vw)',
        paddingTop: 'calc(max(16px, 4vw) + env(safe-area-inset-top))',
        paddingBottom: 'calc(max(16px, 4vw) + env(safe-area-inset-bottom))',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="main"
      aria-label="ログインページ"
    >
      {/* 背景アニメーション要素 */}
      <div
        className="bg-grid"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'moveBackground 24s linear infinite',
          pointerEvents: 'none',
        }}
      />

      <style>
        {`
          :root {
            --radius-lg: 24px;
            --radius-md: 16px;
            --shadow-card: 0 18px 40px -15px rgba(0, 0, 0, 0.35),
                            0 10px 20px -12px rgba(0, 0, 0, 0.12);
            --shadow-hover: 0 28px 56px -18px rgba(0, 0, 0, 0.4);
          }

          @keyframes moveBackground {
            0% { transform: translate(0, 0) }
            100% { transform: translate(48px, 48px) }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px) }
            to   { opacity: 1; transform: translateY(0) }
          }

          .login-container {
            animation: fadeIn 0.5s ease-out;
            width: 100%;
            max-width: clamp(320px, 92vw, 560px);
            position: relative;
            z-index: 1;
          }

          .login-card {
            background-color: white;
            border-radius: var(--radius-lg);
            padding: clamp(24px, 6vw, 40px);
            box-shadow: var(--shadow-card);
            transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
            backdrop-filter: saturate(120%) blur(0.5px);
          }

          @media (hover: hover) {
            .login-card:hover {
              transform: translateY(-4px);
              box-shadow: var(--shadow-hover);
            }
          }

          /* 文字サイズはclampで自動調整 */
          .title { font-size: clamp(24px, 6vw, 32px) }
          .subtitle { font-size: clamp(14px, 3.5vw, 16px) }
          .description { font-size: clamp(12px, 3vw, 14px) }
          .success-title { font-size: clamp(20px, 5vw, 24px) }
          .success-text { font-size: clamp(14px, 3.5vw, 16px) }

          /* Sign out ボタンをCSSでホバー/アクティブ制御 */
          .sign-out-button {
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            border: none;
            border-radius: 12px;
            box-shadow: 0 6px 16px -6px rgba(239, 68, 68, 0.45);
            transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
            width: 100%;
            max-width: 220px;
            outline: none;
          }

          @media (hover: hover) {
            .sign-out-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 14px 28px -10px rgba(239, 68, 68, 0.5);
              filter: brightness(1.02);
            }
          }

          .sign-out-button:active {
            transform: translateY(0);
            box-shadow: 0 8px 16px -8px rgba(239, 68, 68, 0.45);
          }

          .sign-out-button:focus-visible {
            box-shadow:
              0 0 0 4px rgba(255,255,255,0.9),
              0 0 0 8px rgba(239, 68, 68, 0.5);
          }

          /* ロゴサイズのレスポンシブ */
          .logo-container { width: 80px; height: 80px; margin-bottom: clamp(16px, 4vw, 24px) }
          .logo-svg { width: 40px; height: 40px }

          /* モバイル最適化 */
          @media (max-width: 640px) {
            .login-card {
              padding: clamp(20px, 6vw, 32px) !important;
              border-radius: 20px !important;
            }
            .logo-container { width: 64px !important; height: 64px !important }
            .logo-svg { width: 32px !important; height: 32px !important }
          }

          /* タブレット最適化 */
          @media (min-width: 641px) and (max-width: 1024px) {
            .login-card { padding: clamp(24px, 5vw, 36px) !important }
            .logo-container { width: 72px !important; height: 72px !important }
            .logo-svg { width: 36px !important; height: 36px !important }
          }

          /* アニメーション低減設定 */
          @media (prefers-reduced-motion: reduce) {
            .login-container { animation: none }
            .bg-grid { animation: none }
            .login-card { transition: none }
            .sign-out-button { transition: none }
          }
        `}
      </style>

      <div className="login-container">
        {/* ロゴ・タイトルエリア */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 5vw, 32px)' }}>
          <div
            className="logo-container"
            style={{
              margin: '0 auto',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 'clamp(16px, 4vw, 20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.45)',
            }}
            aria-hidden="true"
          >
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </div>
          <h1 className="title" style={{ fontWeight: 700, color: 'white', margin: '0 0 clamp(6px, 2vw, 8px) 0', textShadow: '0 2px 4px rgba(0,0,0,0.12)' }}>
            Welcome Back
          </h1>
          <p className="subtitle" style={{ color: 'rgba(255, 255, 255, 0.92)', margin: 0 }}>
            アカウントにサインインしてください
          </p>
        </div>

        {/* 認証カード */}
        <div className="login-card">
          <ThemeProvider theme={customTheme}>
            <Authenticator
              signUpAttributes={['email']}
              hideSignUp={false}
              components={{
                Header() {
                  return (
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(16px, 4vw, 24px)' }}>
                      <p className="description" style={{ color: '#64748b', margin: 0, lineHeight: 1.55 }}>
                        安全にログインするために認証情報を入力してください
                      </p>
                    </div>
                  );
                },
              }}
            >
              {({ signOut, user }) => {
                useEffect(() => {
                  if (user) {
                    navigate('/');
                  }
                }, [user]);
                return (
                  <div style={{ textAlign: 'center', padding: 'clamp(16px, 4vw, 20px)' }}>
                    <div
                      className="success-icon"
                      style={{
                        width: '64px',
                        height: '64px',
                        margin: '0 auto',
                        marginBottom: 'clamp(16px, 4vw, 20px)',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-hidden="true"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="success-title" style={{ fontWeight: 600, color: '#1e293b', margin: '0 0 clamp(6px, 2vw, 8px) 0' }}>
                      ログイン成功!
                    </h2>
                    <p className="success-text" style={{ color: '#64748b', marginBottom: 'clamp(20px, 5vw, 24px)', wordBreak: 'break-word' }}>
                      ようこそ、{user?.signInDetails?.loginId}さん
                    </p>
                    <button
                      className="sign-out-button"
                      onClick={signOut}
                      aria-label="サインアウト"
                    >
                      サインアウト
                    </button>
                  </div>
                );
              }}
            </Authenticator>
          </ThemeProvider>
        </div>

        {/* フッター */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 'clamp(16px, 4vw, 24px)',
            color: 'rgba(255, 255, 255, 0.86)',
            fontSize: 'clamp(12px, 3vw, 14px)',
          }}
        >
          <p style={{ margin: 0 }}>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
