import { updateUserAttribute, confirmUserAttribute, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateEmail() {
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'input' | 'confirm'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    checkAuthAndLoadEmail();
  }, []);

  const checkAuthAndLoadEmail = async () => {
    try {
      // 認証状態を確認
      const session = await fetchAuthSession();
      if (!session.tokens) {
        // 認証されていない場合はログインページへリダイレクト
        navigate('/login');
        return;
      }
      
      // 認証されている場合、メールアドレスを取得
      const attributes = await fetchUserAttributes();
      setCurrentEmail(attributes.email || '');
    } catch (err) {
      console.error('認証エラーまたはメールアドレス取得エラー:', err);
      navigate('/login');
    } finally {
      setInitializing(false);
    }
  };

  // Step 1: 新しいメールアドレスを送信
  const handleUpdateEmail = async () => {
    setError('');
    if (!newEmail || !newEmail.includes('@')) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    setLoading(true);
    try {
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'email',
          value: newEmail,
        },
      });
      setStep('confirm');
      setError('');
    } catch (err: any) {
      console.error('メールアドレス更新エラー:', err);
      setError(err.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: 確認コードで検証
  const handleConfirmEmail = async () => {
    setError('');
    if (!confirmationCode) {
      setError('確認コードを入力してください');
      return;
    }

    setLoading(true);
    try {
      await confirmUserAttribute({
        userAttributeKey: 'email',
        confirmationCode,
      });
      alert('メールアドレスが正常に更新されました');
      navigate('/');
    } catch (err: any) {
      console.error('確認エラー:', err);
      setError('確認コードが無効です。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (step === 'confirm') {
      setStep('input');
      setConfirmationCode('');
      setError('');
    } else {
      navigate('/');
    }
  };

  // 初期化中はローディング表示
  if (initializing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <p style={{ color: 'white', fontSize: '18px' }}>読み込み中...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          メールアドレス変更
        </h1>

        {step === 'input' ? (
          <>
            <p style={{ color: '#64748b', marginBottom: '24px', textAlign: 'center' }}>
              新しいメールアドレスに確認コードが送信されます
            </p>

            {currentEmail && (
              <div
                style={{
                  backgroundColor: '#f1f5f9',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 4px 0' }}>
                  現在のメールアドレス
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  {currentEmail}
                </p>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="newEmail"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '8px',
                }}
              >
                新しいメールアドレス
              </label>
              <input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new-email@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#e2e8f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
              >
                キャンセル
              </button>
              <button
                onClick={handleUpdateEmail}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) =>
                  !loading && (e.currentTarget.style.transform = 'translateY(-2px)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {loading ? '送信中...' : '確認コードを送信'}
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: '#64748b', marginBottom: '24px', textAlign: 'center' }}>
              <strong>{newEmail}</strong> に送信された確認コードを入力してください
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="confirmationCode"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '8px',
                }}
              >
                確認コード
              </label>
              <input
                id="confirmationCode"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="123456"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  letterSpacing: '0.1em',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#e2e8f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
              >
                戻る
              </button>
              <button
                onClick={handleConfirmEmail}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) =>
                  !loading && (e.currentTarget.style.transform = 'translateY(-2px)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {loading ? '確認中...' : '確認して変更'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
