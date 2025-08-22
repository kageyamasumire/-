# ラボ用 計算アプリ — PWA 完全版テンプレート（v0.22）
このZIPの中身を GitHub Pages の公開元（root か docs/）にそのまま置けば、PWA として動きます。

## ファイル構成
- index.html  … PWAタグ・タブUI・SW登録まで完備（中に既存シートを貼るだけ）
- manifest.webmanifest  … アプリ名・アイコン・ショートカットを定義
- sw.js  … オフライン対応（CACHE: labcalc-v0-22-3）
- /icons/icon-192.png, icon-512.png  … 青地「ラボ」アイコン

## 置き場所
- root 公開: すべてリポジトリ直下に配置
- docs/ 公開: すべて docs/ 内に配置

## 反映チェック
1) ページを開く → 一度リロード
2) DevTools → Network Offline → リロード → 画面が出ればOK
3) iPhone: Safari → 共有 → ホーム画面に追加（ラベル: ラボ用 計算アプリ）

## 更新のコツ
- 変更が反映されない場合は sw.js の CACHE 名を `labcalc-v0-22-4` のように増やす
- 既存アプリをタブの該当セクションに貼り付けて統合してください
