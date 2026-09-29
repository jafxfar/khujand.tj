-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "categoryKey" TEXT NOT NULL DEFAULT 'none',
    "categoryId" TEXT,
    "image" TEXT,
    "imageAlt" TEXT,
    "imageWidth" INTEGER,
    "imageHeight" INTEGER,
    "thumb" TEXT,
    "href" TEXT,
    "nameTg" TEXT,
    "nameRu" TEXT,
    "nameEn" TEXT,
    "roleTitleTg" TEXT,
    "roleTitleRu" TEXT,
    "roleTitleEn" TEXT,
    "showOnHome" BOOLEAN NOT NULL DEFAULT false,
    "isSlide" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "ratingVotes" INTEGER NOT NULL DEFAULT 0,
    "ratingAverage" REAL NOT NULL DEFAULT 0,
    "publishedAt" DATETIME,
    "legacyId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArticleTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "articleId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "menuTitle" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "dateLabel" TEXT NOT NULL DEFAULT '',
    "bodyHtml" TEXT NOT NULL DEFAULT '',
    "paragraphs" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parentId" TEXT,
    "href" TEXT NOT NULL,
    "labelTg" TEXT NOT NULL,
    "labelRu" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MenuItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UiString" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "valueTg" TEXT NOT NULL DEFAULT '',
    "valueRu" TEXT NOT NULL DEFAULT '',
    "valueEn" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Category_key_key" ON "Category"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Article_legacyId_key" ON "Article"("legacyId");

-- CreateIndex
CREATE INDEX "Article_type_categoryKey_published_idx" ON "Article"("type", "categoryKey", "published");

-- CreateIndex
CREATE INDEX "Article_showOnHome_isSlide_idx" ON "Article"("showOnHome", "isSlide");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_type_key" ON "Article"("slug", "type");

-- CreateIndex
CREATE INDEX "ArticleTranslation_locale_idx" ON "ArticleTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleTranslation_articleId_locale_key" ON "ArticleTranslation"("articleId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UiString_key_key" ON "UiString"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Media_path_key" ON "Media"("path");
