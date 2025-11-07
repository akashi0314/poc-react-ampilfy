import { updateUserAttribute, confirmUserAttribute } from 'aws-amplify/auth';
import { useState } from 'react';

export default function UpdateEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'input' | 'confirm'>('input');

  // Step 1: 新しいメールアドレスを送信
  const handleUpdateEmail = async () => {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey: 'email',
          value: newEmail,
        },
      });
      console.log('確認コード送信先:', output);
      setStep('confirm');
      alert('新しいメールアドレスに確認コードを送信しました');
    } catch (error) {
      console.error('メールアドレス更新エラー:', error);
      alert('エラーが発生しました');
    }
  };

  // Step 2: 確認コードで検証
  const handleConfirmEmail = async () => {
    try {
      await confirmUserAttribute({
        userAttributeKey: 'email',
        confirmationCode,
      });
      alert('メールアドレスが正常に更新されました');
      setStep('input');
      setNewEmail('');
      setConfirmationCode('');
    } catch (error) {
      console.error('確認エラー:', error);
      alert('確認コードが無効です');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {step === 'input' ? (
        <div>
          <h2>メールアドレスの変更</h2>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="新しいメールアドレス"
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button onClick={handleUpdateEmail}>変更する</button>
        </div>
      ) : (
        <div>
          <h2>確認コードを入力</h2>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="確認コード"
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button onClick={handleConfirmEmail}>確認</button>
        </div>
      )}
    </div>
  );
}