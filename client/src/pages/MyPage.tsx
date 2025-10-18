import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star, TrendingUp, Settings } from "lucide-react";
import { Link } from "wouter";

export default function MyPage() {
  // モックユーザーデータ
  const user = {
    name: "山田太郎",
    email: "yamada@example.com",
    joinDate: "2024年10月1日",
  };

  // ローカルストレージからお気に入り数を取得
  const getFavoritesCount = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return favorites.length;
    } catch {
      return 0;
    }
  };

  const favoritesCount = getFavoritesCount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-foreground">
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/">
            <a className="flex items-center gap-2 text-xl font-bold">
              <TrendingUp className="w-6 h-6 text-yellow-500" />
              <span>J-Quants Chart Player</span>
            </a>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/player">
              <a className="text-sm hover:text-yellow-500 transition-colors">プレイヤー</a>
            </Link>
            <Link href="/favorites">
              <a className="text-sm hover:text-yellow-500 transition-colors">お気に入り</a>
            </Link>
            <Link href="/mypage">
              <a className="text-sm text-yellow-500 font-semibold">マイページ</a>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-4xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">マイページ</h1>
          <p className="text-muted-foreground">アカウント情報と統計を確認できます</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* ユーザー情報カード */}
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-500" />
                ユーザー情報
              </CardTitle>
              <CardDescription>アカウントの基本情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">名前</div>
                <div className="font-semibold">{user.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">メールアドレス</div>
                <div className="font-semibold">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">登録日</div>
                <div className="font-semibold">{user.joinDate}</div>
              </div>
            </CardContent>
          </Card>

          {/* 統計カード */}
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                統計情報
              </CardTitle>
              <CardDescription>あなたの利用状況</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">お気に入り銘柄数</div>
                <div className="text-3xl font-bold text-yellow-500">{favoritesCount}</div>
              </div>
              <Link href="/favorites">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Star className="w-4 h-4 mr-2" />
                  お気に入り一覧を見る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* クイックアクション */}
        <Card className="bg-card/50 backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-500" />
              クイックアクション
            </CardTitle>
            <CardDescription>よく使う機能へのショートカット</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Link href="/player">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                チャートプレイヤーを開く
              </Button>
            </Link>
            <Link href="/favorites">
              <Button variant="outline" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                お気に入り銘柄を見る
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* モックアップ注意書き */}
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-500">
            <strong>モックアップ版:</strong> このページはデモ用です。実際のアプリケーションでは、ユーザー認証とデータベース連携が必要です。
          </p>
        </div>
      </main>
    </div>
  );
}

