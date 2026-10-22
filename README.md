# やることリスト

日々のタスクと進捗を管理するWebアプリ

## キャッチコピー

複雑な機能をそぎ落とし、本当に必要な機能だけを凝縮した直感型タスク管理ツール。

## アプリケーションの概要

本アプリケーションは、日常のタスクをシンプルかつ効率的に管理・確認できるWebアプリケーションです。

ユーザーが自身の「やるべきこと」を一覧で把握し、新規登録、詳細の確認、完了状態の更新・削除を行えるように設計しています。

ログインしたユーザーごとにToDoを管理し、データはPostgreSQLに保存します。

## 開発した背景や理由

日々の業務や学習において、やるべきことが頭の中で散らばってしまい、優先順位の整理やタスクの漏れに悩むことがありました。

世の中に多くのタスク管理ツールがある中で、「自分にとって本当に必要な機能だけに絞り込み、より直感的に素早く操作できるツールがあれば便利ではないか」と考え、本アプリの開発に至りました。

## 主な機能

- ユーザー登録API
- メールアドレスとパスワードによるログイン
- ToDoの登録・一覧表示
- 完了・未完了の切り替え
- ToDoの削除
- ユーザーごとのToDo管理

## アプリケーションのデモ画像

### ToDo画面

![ToDoのデモ画面](https://github.com/user-attachments/assets/6422cbdc-cba0-4af5-9069-addfd87a0a20)

### ログイン画面

![アプリケーションの画面](https://github.com/user-attachments/assets/eed40585-3345-4bbb-bff5-ec471252f7e5)

## ER図

![ER図](https://github.com/user-attachments/assets/5ef04a42-ab8f-4f4d-96a3-ac20e738cfaf)

### テーブル構成

| テーブル | 役割 |
| --- | --- |
| users | ユーザーのメールアドレスと、ハッシュ化したパスワードを保存 |
| todos | ToDoのタイトル・詳細・完了状態・ユーザーIDを保存 |

`todos.user_id`が`users.id`を参照し、1人のユーザーが複数のToDoを持つ構成です。

現在のDB定義では`user_id`はNULLを許可していますが、新しいToDoにはログイン中のユーザーIDを設定します。

## 主な使用技術

| 分類 | 使用技術 |
| --- | --- |
| フロントエンド | React / JavaScript / CSS / Vite |
| バックエンド | Java 21 / Spring Boot |
| 認証 | Spring Security |
| データアクセス | Spring Data JPA / Hibernate |
| データベース | PostgreSQL 18 |
| ビルド・パッケージ管理 | Gradle / npm |
| 開発環境・ツール | Git / GitHub / pgAdmin 4 |

## ローカル環境での起動方法

### 事前準備

- JDK 21をインストールする
- 使用するViteに対応したNode.jsとnpmをインストールする
- PostgreSQLをインストールして起動する
- PostgreSQLに`todo_db`というデータベースを作成する

### バックエンドの設定

`src/main/resources/application.properties`に、次の設定を記載します。

```properties
spring.application.name=demo

spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### バックエンドの起動

`build.gradle`があるフォルダーでPowerShellを開きます。

パスワード部分を、自分のPostgreSQLのパスワードに置き換えて実行します。

```powershell
$env:DB_PASSWORD = 'PostgreSQLで設定したパスワード'
.\gradlew.bat bootRun
```

バックエンドは`http://localhost:8080`で起動します。

### フロントエンドの起動

`package.json`があるフォルダーで、別のPowerShellを開いて実行します。

```powershell
npm install
npm run dev
```

フロントエンドは`http://localhost:5173`で利用します。

### アプリケーションの利用

1. 登録済みのユーザーを用意します。新規登録は`POST /api/users/register`を使用します。
2. ブラウザで`http://localhost:8080/login`を開きます。
3. Username欄にメールアドレス、Password欄にパスワードを入力してログインします。
4. 同じブラウザで`http://localhost:5173`を開きます。
5. ToDoを登録し、完了状態の切り替えや削除を行います。

