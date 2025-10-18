import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, Trash2, Play } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

// モック銘柄データ
const MOCK_STOCKS = [
  { code: "7203", name: "トヨタ自動車", sector: "輸送用機器", market: "東証プライム" },
  { code: "9984", name: "ソフトバンクグループ", sector: "情報・通信業", market: "東証プライム" },
  { code: "6758", name: "ソニーグループ", sector: "電気機器", market: "東証プライム" },
  { code: "8306", name: "三菱UFJフィナンシャル・グループ", sector: "銀行業", market: "東証プライム" },
  { code: "6861", name: "キーエンス", sector: "電気機器", market: "東証プライム" },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // ローカルストレージからお気に入りを読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }, []);

  // お気に入りから削除
  const removeFavorite = (code: string) => {
    const updated = favorites.filter((c) => c !== code);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // お気に入り銘柄の情報を取得
  const favoriteStocks = MOCK_STOCKS.filter((stock) =>
    favorites.includes(stock.code)
  );

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
              <a className="text-sm text-yellow-500 font-semibold">お気に入り</a>
            </Link>
            <Link href="/mypage">
              <a className="text-sm hover:text-yellow-500 transition-colors">マイページ</a>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-6xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Star className="w-10 h-10 text-yellow-500 fill-current" />
            お気に入り銘柄
          </h1>
          <p className="text-muted-foreground">
            お気に入りに追加した銘柄を管理できます（{favoriteStocks.length}件）
          </p>
        </div>

        {favoriteStocks.length === 0 ? (
          // 空の状態
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardContent className="py-16 text-center">
              <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">お気に入りがありません</h3>
              <p className="text-muted-foreground mb-6">
                チャートプレイヤーで銘柄をお気に入りに追加してみましょう
              </p>
              <Link href="/player">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Play className="w-4 h-4 mr-2" />
                  チャートプレイヤーを開く
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* お気に入り銘柄のみ再生ボタン */}
            <div className="mb-6">
              <Link href="/player?favorites=true">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Play className="w-5 h-5 mr-2" />
                  お気に入り銘柄のみ再生
                </Button>
              </Link>
            </div>

            {/* お気に入り銘柄リスト */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteStocks.map((stock) => (
                <Card
                  key={stock.code}
                  className="bg-card/50 backdrop-blur border-border hover:border-yellow-500/50 transition-all"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">
                        {stock.code} - {stock.name}
                      </span>
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </CardTitle>
                    <CardDescription>
                      {stock.market} / {stock.sector}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Link href={`/player?code=${stock.code}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        チャートを見る
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFavorite(stock.code)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* モックアップ注意書き */}
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-500">
            <strong>モックアップ版:</strong> お気に入りはローカルストレージに保存されます（ブラウザのキャッシュをクリアすると消えます）。実際のアプリケーションでは、データベースに保存されます。
          </p>
        </div>
      </main>
    </div>
  );
}

