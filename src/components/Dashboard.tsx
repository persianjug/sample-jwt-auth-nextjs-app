import useAuth from '@/hooks/useAuth';
import useFetchUserInfo from '@/hooks/useFetchUserInfo';

/**
 * @fileoverview 認証済みユーザー向けのダッシュボードコンテンツコンポーネント。
 * データ取得ロジックは useFetchUserInfo フックに委譲し、ここでは状態とUI表示に集中します。
 * @returns {JSX.Element} ダッシュボードのコンテンツ
 */
const Dashboard = () => {
  const { logout } = useAuth();
  const { data, error, loading } = useFetchUserInfo();

  if (loading) {
    return <div className="p-8">データロード中...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">データの取得に失敗しました。</div>;
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">ようこそ、{data?.username}さん！</h1>
      <p className="mb-6">メールアドレス: {data?.email}</p>

      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">
        ログアウト
      </button>
    </div>
  );
};

export default Dashboard;