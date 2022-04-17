# Разработка
```shell
npm run serve
```

# Сборка
```shell
# Сборка библиотеки
npm run build
git commit - m "commit"
git push

# Сборка демо проекта
npm run predeploy

# Публикация ветки gh-pages
npm run deploy
```


# Переустановка пакета
```shell
npm uninstall vue-form-element
npm install vue-form-element@1.0.0-beta.4
npm install vue-form-element@beta
```


# Npm репозиторий
```shell
# Задать версию пакета
npm version 2.0.0-beta.0
npm version 2.0.0-alpha.2

# Публикация пакета на npmjs (предварительно npm login)
# npm run build  - опционально
npm publish

# Публикация beta версий на npmjs
npm publish --tag beta

# Отмена публикации пакета на npmjs
npm unpublish vue-form-element@1.0.0-beta.0


# Установить пакеты устаревшими
npm deprecate vue-form-element@ "< 0.2.3" "critical bug fixed in v0.2.3"
npm deprecate vue-form-element@0.x "0.x is no longer supported"
```
